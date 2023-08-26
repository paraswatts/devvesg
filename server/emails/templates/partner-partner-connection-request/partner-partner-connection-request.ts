import fs from 'fs';
import path from 'path';

import { buildTemplate, EmailToParam, injectWebappBaseUrl, WebappBaseUrlParam } from '../../build-template';
import { sendEmail } from '../../../config/ses';
import { t } from 'i18next';
import { string } from 'zod';

interface PartnerPartnerConnectionRequestVariables {
  clientName: string;
  partnerUuid: string;
  requirementUuid: string;
}

interface IPartnerPartnerConnectionRequestTemplate {
  receivedPartnerRequestMessage1: string;
  receivedPartnerRequestMessage2: string;
  partnerUuid: string;
  requirementUuid: string;
  reviewPartnerConnectionRequest: string;
}

const PARTNER_PARTNER_CONNECTION_REQUEST_TEMPLATE = fs.readFileSync(
  path.join(__dirname, 'partner-partner-connection-request.hbs'),
);

export const handleSendPartnerPartnerConnectionRequest = async (
  params: PartnerPartnerConnectionRequestVariables & EmailToParam,
) => {
  const { to, ...rest } = params;
  const body = buildTemplate<IPartnerPartnerConnectionRequestTemplate & WebappBaseUrlParam>(
    PARTNER_PARTNER_CONNECTION_REQUEST_TEMPLATE,
    injectWebappBaseUrl<IPartnerPartnerConnectionRequestTemplate>({
      receivedPartnerRequestMessage1: t('mail.received-partner-request-message1', { clientName: rest.clientName }),
      receivedPartnerRequestMessage2: t('mail.received-partner-request-message2'),
      partnerUuid: rest.partnerUuid,
      requirementUuid: rest.requirementUuid,
      reviewPartnerConnectionRequest: t('mail.review-partner-connection-request'),
    }),
  );

  try {
    await sendEmail(to, t('mail.received-partner-request-subject', { clientName: rest.clientName }), body);
  } catch (e) {
    console.error(e);
    // TODO: Handle failed emails gracefully
  }
};
