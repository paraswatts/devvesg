import fs from 'fs';
import path from 'path';

import { buildTemplate, EmailToParam } from '../../build-template';
import { sendEmail } from '../../../config/ses';
import { t } from 'i18next';

interface PartnerDisconnectByClientVariables {
  clientName: string;
  initiativeName: string;
  projectName: string;
  requirementName: string;
  reason: string;
}

interface IPartnerDisconnectByClientTemplate {
  partnerDisconnectClientMessage: string;
  reason: string;
  thankyou: string;
}

const PARTNER_DISCONNECT_BY_CLIENT_TEMPLATE = fs.readFileSync(path.join(__dirname, 'partner-disconnect-by-client.hbs'));

export const handleSendPartnerDisconnectByClient = async (
  params: PartnerDisconnectByClientVariables & EmailToParam,
) => {
  const { to, ...rest } = params;
  const body = buildTemplate<IPartnerDisconnectByClientTemplate>(PARTNER_DISCONNECT_BY_CLIENT_TEMPLATE, {
    partnerDisconnectClientMessage: t('mail.partner-disconnect-client-message', {
      clientName: rest.clientName,
      initiativeName: rest.initiativeName,
      projectName: rest.projectName,
      requirementName: rest.requirementName,
    }),
    reason: rest.reason,
    thankyou: t('mail.thankyou'),
  });

  try {
    await sendEmail(to, t('mail.partner-disconnect-client-subject'), body);
  } catch (e) {
    console.error(e);
    // TODO: Handle failed emails gracefully
  }
};
