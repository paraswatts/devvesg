import fs from 'fs';
import path from 'path';

import { buildTemplate, EmailToParam, injectWebappBaseUrl, WebappBaseUrlParam } from '../../build-template';
import { sendEmail } from '../../../config/ses';
import { t } from 'i18next';

interface PartnerUserDeniedAdminVariables {
  partnerName: string;
  userName: string;
}

interface IPartnerUserDeniedAdminTemplate {
  partnerUserDeniedAdminMessage: string;
  viewDevvesgUsers: string;
}

const PARTNER_USER_DENIED_ADMIN_TEMPLATE = fs.readFileSync(path.join(__dirname, 'partner-user-denied-admin.hbs'));

export const handleSendPartnerUserDeniedAdmin = async (params: PartnerUserDeniedAdminVariables & EmailToParam) => {
  const { to, ...rest } = params;
  const body = buildTemplate<IPartnerUserDeniedAdminTemplate & WebappBaseUrlParam>(
    PARTNER_USER_DENIED_ADMIN_TEMPLATE,
    injectWebappBaseUrl<IPartnerUserDeniedAdminTemplate>({
      partnerUserDeniedAdminMessage: t('mail.partner-user-denied-admin-message', {
        userName: rest.userName,
        partnerName: rest.partnerName,
      }),
      viewDevvesgUsers: t('mail.view-devvesg-users'),
    }),
  );

  try {
    await sendEmail(to, t('mail.partner-user-denied-admin-subject'), body);
  } catch (e) {
    console.error(e);
    // TODO: Handle failed emails gracefully
  }
};
