import { NextFunction, Request, Response, Router } from 'express';
import MessageValidator from 'sns-validator';
import https from 'https';

import { DI } from '../index';
import { EmailEvent, EmailEventType } from '../entities';

// This is a partial interface of the payload
// from SES contained with the SNS notification
interface SnsDecodedMessage {
  notificationType: EmailEventType;
  complaint: {
    complaintSubType: string;
    complainedRecipients: {
      emailAddress: string;
    }[];
    timestamp: string;
    feedbackId: string;
    userAgent?: string;
    complaintFeedbackType?: string;
    arrivalDate?: string;
  };
  bounce: {
    bounceType: string;
    bounceSubType: string;
    bouncedRecipients: {
      emailAddress: string;
    }[];
    timestamp: string;
    feedbackId: string;
    reportingMTA?: string;
    remoteMtaIp?: string;
  };
}

const router = Router();

router.post(
  '/unsubscribe/partner',
  async (req: Request<{}, {}, { partnerId: string }>, res: Response<{ data: null }>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    try {
      const partner = await DI.partnerRepo.findOneOrFail({ uuid: req.body.partnerId });
      partner.marketingDisabledAt = new Date();
      em.persistAndFlush(partner);
      return res.json({ data: null });
    } catch (e) {
      return next(e);
    }
  },
);

router.post('/sns-event', async (req: Request, res: Response, next: NextFunction) => {
  const em = DI.orm.em.fork(false);
  const validator = new MessageValidator();

  // Validate the signature of the payload being sent by SNS
  let message: any = req.body;
  try {
    message = await new Promise((resolve, reject) => {
      validator.validate(req.body, (err, message) => (err ? reject(err) : resolve(message)));
    });
  } catch (e) {
    console.error('Invalid SNS Notification', e);
    return res.status(400).send();
  }

  if (['SubscriptionConfirmation', 'UnsubscribeConfirmation'].includes(message.Type as string)) {
    // If we are getting a subscribe / unsubscribe call, attempt to fetch the URL being sent
    // to confirm subscription with AWS
    try {
      await new Promise((resolve, reject) => {
        const req = https.get(message.SubscribeURL, (res) => {
          res.on('data', resolve);
        });
        req.on('error', reject);
        req.end();
      });
    } catch (e) {
      console.error('Could not subscribe / unsubscribe to SNS subscription', e);
    }
  } else if (message.Type === 'Notification') {
    let decoded: SnsDecodedMessage;

    // Decode the message from SES out of the SNS payload
    try {
      decoded = JSON.parse(message.Message as string);
    } catch (e) {
      console.error(e);
      return res.status(400).send();
    }

    // Handle bounces / complaints depending on message type
    let users: { emailAddress: string }[];
    let timestamp: Date;
    let type = decoded.notificationType;
    let meta = '';

    if (type === EmailEventType.BOUNCE) {
      try {
        users = decoded.bounce.bouncedRecipients;
        timestamp = new Date(decoded.bounce.timestamp);
        meta = JSON.stringify({
          bounceType: decoded.bounce.bounceType,
          bounceSubType: decoded.bounce.bounceSubType,
          feedbackId: decoded.bounce.feedbackId,
          reportingMTA: decoded.bounce.reportingMTA,
          remoteMtaIp: decoded.bounce.remoteMtaIp,
        });
      } catch (e) {
        console.error(e);
        return res.status(400).send();
      }
    } else if (type === EmailEventType.COMPLAINT) {
      try {
        users = decoded.complaint.complainedRecipients;
        timestamp = new Date(decoded.complaint.timestamp);
        meta = JSON.stringify({
          complaintSubType: decoded.complaint.complaintSubType,
          feedbackId: decoded.complaint.feedbackId,
          userAgent: decoded.complaint.userAgent,
          complaintFeedbackType: decoded.complaint.complaintFeedbackType,
          arrivalDate: decoded.complaint.arrivalDate,
        });
      } catch (e) {
        console.error(e);
        return res.status(400).send();
      }
    }

    // If we have valid data from parsing the SES event, make new entries
    // in the events table
    if (timestamp && Array.isArray(users) && users.length > 0) {
      users.forEach(({ emailAddress }) => {
        const event = new EmailEvent().assign({
          email: emailAddress,
          type,
          meta,
          receivedAt: timestamp,
        });
        em.persist(event);
      });
      await em.flush();
    }
  }

  return res.status(200).send();
});

export const EmailController = router;

/* SNS sends their JSON messages as content-type text\plain, which body-parser will fail
 * to convert to JSON. Manually convert over when an SNS message is detected.
 */
export const snsContentTypeConverter = (req: Request, res: Response, next: NextFunction) => {
  if (req.get('x-amz-sns-message-type')) {
    req.headers['content-type'] = 'application/json';
  }
  next();
};
