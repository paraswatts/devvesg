import fs from 'fs';
import path from 'path';

import {
  buildTemplate,
  EmailSubjectParam,
  EmailToParam,
  injectWebappBaseUrl,
  WebappBaseUrlParam,
} from '../../build-template';
import { sendEmail } from '../../../config/ses';
import { t } from 'i18next';

interface PasswordResetVariables {
  includeDisclaimer: boolean;
  resetPasswordToken: string;
}

interface IPasswordResetTemplate {
  passwordResetMessage1: string;
  passwordResetMessage2: string;
  resetPasswordToken: string;
  includeDisclaimer: boolean;
}

const PASSWORD_RESET_TEMPLATE = fs.readFileSync(path.join(__dirname, 'password-reset.hbs'));

export const handleSendPasswordReset = async (params: PasswordResetVariables & EmailToParam & EmailSubjectParam) => {
  const { to, subject, ...rest } = params;
  const body = buildTemplate<IPasswordResetTemplate & WebappBaseUrlParam>(
    PASSWORD_RESET_TEMPLATE,
    injectWebappBaseUrl<IPasswordResetTemplate>({
      passwordResetMessage1: t('mail.password-reset-message1'),
      passwordResetMessage2: t('mail.password-reset-message2'),
      resetPasswordToken: rest.resetPasswordToken,
      includeDisclaimer: rest.includeDisclaimer,
    }),
  );

  try {
    await sendEmail(to, t(subject), body);
  } catch (e) {
    console.error(e);
    // TODO: Handle failed emails gracefully
  }
};
