import fs from 'fs';
import path from 'path';

import { buildTemplate, EmailToParam, injectWebappBaseUrl, WebappBaseUrlParam } from '../../build-template';
import { sendEmail } from '../../../config/ses';
import { t } from 'i18next';

interface PartnerUserAddedAdminVariables {
  partnerName: string;
  userName: string;
}

interface IPartnerUserAddedAdminTemplate {
  partnerUserAddedAdminMessage1: string;
  partnerUserAddedAdminMessage2: string;
  reviewRequest: string;
}

const PARTNER_USER_ADDED_ADMIN_TEMPLATE = fs.readFileSync(path.join(__dirname, 'partner-user-added-admin.hbs'));

export const handleSendPartnerUserAddedAdmin = async (params: PartnerUserAddedAdminVariables & EmailToParam) => {
  const { to, ...rest } = params;
  const body = buildTemplate<IPartnerUserAddedAdminTemplate & WebappBaseUrlParam>(
    PARTNER_USER_ADDED_ADMIN_TEMPLATE,
    injectWebappBaseUrl<IPartnerUserAddedAdminTemplate>({
      partnerUserAddedAdminMessage1: t('mail.partner-user-added-admin-message1', {
        partnerName: rest.partnerName,
        userName: rest.userName,
      }),
      partnerUserAddedAdminMessage2: t('mail.partner-user-added-admin-message2'),
      reviewRequest: t('mail.review-request'),
    }),
  );

  try {
    await sendEmail(to, t('mail.partner-user-added-admin-subject'), body);
  } catch (e) {
    console.error(e);
    // TODO: Handle failed emails gracefully
  }
};
