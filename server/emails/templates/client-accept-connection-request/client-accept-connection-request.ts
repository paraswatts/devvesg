import fs from 'fs';
import path from 'path';

import { buildTemplate, EmailToParam, injectWebappBaseUrl, WebappBaseUrlParam } from '../../build-template';
import { sendEmail } from '../../../config/ses';
import { t } from 'i18next';

interface ClientAcceptConnectionRequestVariables {
  partnerName: string;
  clientUuid: string;
}

interface IClientAcceptConnectionRequestTemplate {
  acceptedPartnerRequestMessage: string;
  clientUuid: string;
  viewRequirements: string;
}

const CLIENT_ACCEPT_CONNECTION_REQUEST_TEMPLATE = fs.readFileSync(
  path.join(__dirname, 'client-accept-connection-request.hbs'),
);

export const handleSendClientAcceptConnectionRequest = async (
  params: ClientAcceptConnectionRequestVariables & EmailToParam,
) => {
  const { to, ...rest } = params;
  const body = buildTemplate<IClientAcceptConnectionRequestTemplate & WebappBaseUrlParam>(
    CLIENT_ACCEPT_CONNECTION_REQUEST_TEMPLATE,
    injectWebappBaseUrl<IClientAcceptConnectionRequestTemplate>({
      acceptedPartnerRequestMessage: t('mail.accepted-partner-request-message', { partnerName: rest.partnerName }),
      clientUuid: rest.clientUuid,
      viewRequirements: t('mail.view-requirements'),
    }),
  );

  try {
    await sendEmail(to, t('mail.accepted-partner-request-subject', { partnerName: rest.partnerName }), body);
  } catch (e) {
    console.error(e);
    // TODO: Handle failed emails gracefully
  }
};
