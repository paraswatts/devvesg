import fs from 'fs';
import path from 'path';

import { buildTemplate, EmailToParam, injectWebappBaseUrl, WebappBaseUrlParam } from '../../build-template';
import { sendEmail } from '../../../config/ses';
import { t } from 'i18next';

interface PartnerUserApprovedAdminVariables {
  partnerName: string;
  userName: string;
}

interface IPartnerUserApprovedAdminTemplate {
  partnerUserApprovedAdminMessage: string;
  viewDevvesgUsers: string;
}

const PARTNER_USER_APPROVED_ADMIN_TEMPLATE = fs.readFileSync(path.join(__dirname, 'partner-user-approved-admin.hbs'));

export const handleSendPartnerUserApprovedAdmin = async (params: PartnerUserApprovedAdminVariables & EmailToParam) => {
  const { to, ...rest } = params;
  const body = buildTemplate<IPartnerUserApprovedAdminTemplate & WebappBaseUrlParam>(
    PARTNER_USER_APPROVED_ADMIN_TEMPLATE,
    injectWebappBaseUrl<IPartnerUserApprovedAdminTemplate>({
      partnerUserApprovedAdminMessage: t('mail.partner-user-approved-admin-message', {
        userName: rest.userName,
        partnerName: rest.partnerName,
      }),
      viewDevvesgUsers: t('mail.view-devvesg-users'),
    }),
  );

  try {
    await sendEmail(to, t('mail.partner-user-approved-admin-subject'), body);
  } catch (e) {
    console.error(e);
    // TODO: Handle failed emails gracefully
  }
};
