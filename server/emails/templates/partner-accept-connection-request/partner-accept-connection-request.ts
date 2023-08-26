import fs from 'fs';
import path from 'path';

import { buildTemplate, EmailToParam, injectWebappBaseUrl, WebappBaseUrlParam } from '../../build-template';
import { sendEmail } from '../../../config/ses';
import { t } from 'i18next';

interface PartnerAcceptConnectionRequestVariables {
  clientName: string;
  partnerUuid: string;
}

interface IPartnerAcceptConnectionRequestTemplate {
  acceptedPartnerRequestFromMessage: string;
  viewRequirements: string;
  partnerUuid: string;
}

const PARTNER_ACCEPT_CONNECTION_REQUEST_TEMPLATE = fs.readFileSync(
  path.join(__dirname, 'partner-accept-connection-request.hbs'),
);

export const handleSendPartnerAcceptConnectionRequest = async (
  params: PartnerAcceptConnectionRequestVariables & EmailToParam,
) => {
  const { to, ...rest } = params;
  const body = buildTemplate<IPartnerAcceptConnectionRequestTemplate & WebappBaseUrlParam>(
    PARTNER_ACCEPT_CONNECTION_REQUEST_TEMPLATE,
    injectWebappBaseUrl<IPartnerAcceptConnectionRequestTemplate>({
      acceptedPartnerRequestFromMessage: t('mail.accepted-partner-request-from-message', {
        clientName: rest.clientName,
      }),
      viewRequirements: t('mail.view-requirements'),
      partnerUuid: rest.partnerUuid,
    }),
  );

  try {
    await sendEmail(to, t('mail.accepted-partner-request-from-subject', { clientName: rest.clientName }), body);
  } catch (e) {
    console.error(e);
    // TODO: Handle failed emails gracefully
  }
};
