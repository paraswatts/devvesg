import fs from 'fs';
import path from 'path';

import { buildTemplate, EmailToParam, injectWebappBaseUrl, WebappBaseUrlParam } from '../../build-template';
import { sendEmail } from '../../../config/ses';
import { t } from 'i18next';

interface ClientDeclineConnectionRequestVariables {
  partnerName: string;
  clientUuid: string;
}

interface IClientDeclineConnectionRequestTemplate {
  declinedPartnerRequestMessage: string;
  clientUuid: string;
  viewProjects: string;
}

const CLIENT_DECLINE_CONNECTION_REQUEST_TEMPLATE = fs.readFileSync(
  path.join(__dirname, 'client-decline-connection-request.hbs'),
);

export const handleSendClientDeclineConnectionRequest = async (
  params: ClientDeclineConnectionRequestVariables & EmailToParam,
) => {
  const { to, ...rest } = params;
  const body = buildTemplate<IClientDeclineConnectionRequestTemplate & WebappBaseUrlParam>(
    CLIENT_DECLINE_CONNECTION_REQUEST_TEMPLATE,
    injectWebappBaseUrl<IClientDeclineConnectionRequestTemplate>({
      declinedPartnerRequestMessage: t('mail.declined-partner-request-message', { partnerName: rest.partnerName }),
      clientUuid: rest.clientUuid,
      viewProjects: t('mail.view-projects'),
    }),
  );

  try {
    await sendEmail(to, t('mail.accepted-partner-request-subject', { partnerName: rest.partnerName }), body);
  } catch (e) {
    console.error(e);
    // TODO: Handle failed emails gracefully
  }
};
