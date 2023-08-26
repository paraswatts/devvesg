import fs from 'fs';
import path from 'path';

import { buildTemplate, EmailToParam, injectWebappBaseUrl, WebappBaseUrlParam } from '../../build-template';
import { sendEmail } from '../../../config/ses';
import { t } from 'i18next';

interface PartnerDeclineConnectionRequestVariables {
  clientName: string;
  partnerUuid: string;
}

interface IPartnerDeclineConnectionRequestTemplate {
  declinedPartnerRequestFromMessage: string;
  partnerUuid: string;
  viewConnectionRequests: string;
}

const PARTNER_DECLINE_CONNECTION_REQUEST_TEMPLATE = fs.readFileSync(
  path.join(__dirname, 'partner-decline-connection-request.hbs'),
);

export const handleSendPartnerDeclineConnectionRequest = async (
  params: PartnerDeclineConnectionRequestVariables & EmailToParam,
) => {
  const { to, ...rest } = params;
  const body = buildTemplate<IPartnerDeclineConnectionRequestTemplate & WebappBaseUrlParam>(
    PARTNER_DECLINE_CONNECTION_REQUEST_TEMPLATE,
    injectWebappBaseUrl<IPartnerDeclineConnectionRequestTemplate>({
      declinedPartnerRequestFromMessage: t('mail.declined-partner-request-from-message', {
        clientName: rest.clientName,
      }),
      partnerUuid: rest.partnerUuid,
      viewConnectionRequests: t('mail.view-connection-requests'),
    }),
  );

  try {
    await sendEmail(to, t('mail.declined-partner-request-from-subject', { clientName: rest.clientName }), body);
  } catch (e) {
    console.error(e);
    // TODO: Handle failed emails gracefully
  }
};
