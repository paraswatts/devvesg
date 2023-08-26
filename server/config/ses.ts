import SES from 'aws-sdk/clients/ses';

const region = process.env.S3_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const AWS_SES = new SES();

export function sendEmail(recipientEmails: string[], subject: string, body: string, from?: string) {
  const sendTo = process.env.EMAIL_TRAP_TO ? [process.env.EMAIL_TRAP_TO] : recipientEmails;
  const params: SES.SendEmailRequest = {
    Source: from || 'no-reply@devvesg.com',
    Destination: {
      ToAddresses: sendTo,
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: body,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
  };
  return AWS_SES.sendEmail(params).promise();
}
