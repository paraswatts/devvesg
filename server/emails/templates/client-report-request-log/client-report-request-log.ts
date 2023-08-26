import fs from 'fs';
import path from 'path';

import { buildTemplate } from '../../build-template';
import { sendEmail } from '../../../config/ses';
import { t } from 'i18next';

interface ClientReportRequestLogVariables {
  name: string;
  companyName: string;
  email: string;
}

const CLIENT_REPORT_REQUEST_LOG_TEMPLATE = fs.readFileSync(path.join(__dirname, 'client-report-request-log.hbs'));

export const handleSendClientReportRequestLog = async (params: ClientReportRequestLogVariables) => {
  const body = buildTemplate<ClientReportRequestLogVariables>(CLIENT_REPORT_REQUEST_LOG_TEMPLATE, {
    name: t('mail.client-report-request-name', { name: params.name }),
    companyName: t('mail.client-report-request-company-name', { companyName: params.companyName }),
    email: t('mail.client-report-request-email', { email: params.email }),
  });

  try {
    await sendEmail(['kzthnuve@mailparser.io'], t('mail.client-report-request-subject'), body, 'no-reply@devvesg.com');
  } catch (e) {
    console.error(e);
    // TODO: Handle failed emails gracefully
  }
};
