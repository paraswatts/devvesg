import fs from 'fs';
import path from 'path';

import { buildTemplate, EmailToParam, injectWebappBaseUrl, WebappBaseUrlParam } from '../../build-template';
import { sendEmail } from '../../../config/ses';
import { t } from 'i18next';

interface PartnerUserApprovedPartnerVariables {
  userName: string;
}

interface IPartnerUserApprovedPartnerTemplate {
  partnerUserApprovedPartnerMessage: string;
  login: string;
}

const PARTNER_USER_APPROVED_PARTNER_TEMPLATE = fs.readFileSync(
  path.join(__dirname, 'partner-user-approved-partner.hbs'),
);

export const handleSendPartnerUserApprovedPartner = async (
  params: PartnerUserApprovedPartnerVariables & EmailToParam,
) => {
  const { to, userName } = params;
  const body = buildTemplate<WebappBaseUrlParam>(
    PARTNER_USER_APPROVED_PARTNER_TEMPLATE,
    injectWebappBaseUrl<IPartnerUserApprovedPartnerTemplate>({
      partnerUserApprovedPartnerMessage: t('mail.partner-user-approved-partner-message'),
      login: t('mail.login'),
    }),
  );

  try {
    await sendEmail(to, t('mail.partner-user-approved-partner-subject', { userName }), body);
  } catch (e) {
    console.error(e);
    // TODO: Handle failed emails gracefully
  }
};
