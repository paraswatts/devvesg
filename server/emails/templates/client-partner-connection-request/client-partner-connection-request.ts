import fs from 'fs';
import path from 'path';

import { buildTemplate, EmailToParam, injectWebappBaseUrl, WebappBaseUrlParam } from '../../build-template';
import { sendEmail } from '../../../config/ses';
import { t } from 'i18next';

interface ClientPartnerConnectionRequestVariables {
  clientUuid: string;
  partnerName: string;
}

interface IClientPartnerAcceptConnectionRequestTemplate {
  sentPartnerRequestMessage1: string;
  sentPartnerRequestMessage2: string;
  clientUuid: string;
  viewProjects: string;
}

const CLIENT_PARTNER_CONNECTION_REQUEST_TEMPLATE = fs.readFileSync(
  path.join(__dirname, 'client-partner-connection-request.hbs'),
);

export const handleSendClientPartnerConnectionRequest = async (
  params: ClientPartnerConnectionRequestVariables & EmailToParam,
) => {
  const { to, ...rest } = params;
  const body = buildTemplate<IClientPartnerAcceptConnectionRequestTemplate & WebappBaseUrlParam>(
    CLIENT_PARTNER_CONNECTION_REQUEST_TEMPLATE,
    injectWebappBaseUrl<IClientPartnerAcceptConnectionRequestTemplate>({
      sentPartnerRequestMessage1: t('mail.sent-partner-request-message1', { partnerName: rest.partnerName }),
      sentPartnerRequestMessage2: t('mail.sent-partner-request-message2'),
      clientUuid: rest.clientUuid,
      viewProjects: t('mail.view-projects'),
    }),
  );

  try {
    await sendEmail(to, t('mail.sent-partner-request-subject', { partnerName: rest.partnerName }), body);
  } catch (e) {
    console.error(e);
    // TODO: Handle failed emails gracefully
  }
};
