import fs from 'fs';
import path from 'path';

import { buildTemplate } from '../../build-template';
import { sendEmail } from '../../../config/ses';
import { t } from 'i18next';

interface PartnerConnectionLogVariables {
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  partner: string;
  partnerEmail: string;
}

interface IPartnerConnectionLogTemplate {
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  partner: string;
  partnerEmail: string;
}

const PARTNER_CONNECTION_LOG_TEMPLATE = fs.readFileSync(path.join(__dirname, 'partner-connection-log.hbs'));

export const handleSendPartnerConnectionLog = async (params: PartnerConnectionLogVariables) => {
  const body = buildTemplate<IPartnerConnectionLogTemplate>(PARTNER_CONNECTION_LOG_TEMPLATE, {
    clientName: t('mail.client-name', { clientName: params.clientName }),
    clientEmail: t('mail.client-email', { clientEmail: params.clientEmail }),
    clientCompany: t('mail.client-company', { clientCompany: params.clientCompany }),
    partner: t('mail.partner-name', { partnerName: params.partner }),
    partnerEmail: t('mail.partner-email', { partnerEmail: params.partnerEmail }),
  });

  try {
    await sendEmail(['jbssvumy@mailparser.io'], t('mail.partner-connection'), body, 'no-reply@devvesg.com');
  } catch (e) {
    console.error(e);
    // TODO: Handle failed emails gracefully
  }
};
