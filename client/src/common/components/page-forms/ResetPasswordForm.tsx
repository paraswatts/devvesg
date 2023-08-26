import React, { useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { ForgotPasswordUpdateParams } from 'src/api';
import { FormGroup } from 'src/common/forms/FormGroup';
import { Input } from 'src/common/forms/Input';
import { Label } from 'src/common/forms/Label';
import { Show } from 'src/common/layout';
import { passwordMeetsRequirements, passwordsMatch } from 'src/common/util';

import styles from 'src/routes/auth/Auth.module.scss';

interface ResetPasswordFormProps {
  formChanged: (state: Omit<ForgotPasswordUpdateParams, 'passwordToken'>) => void;
  validateForm: (valid: boolean) => void;
  onboarding?: boolean;
}

export const ResetPasswordForm = React.memo((props: ResetPasswordFormProps) => {
  const { formChanged, validateForm, onboarding } = props;
  const { t } = useTranslation();
  const [formState, setFormState] = useState<Omit<ForgotPasswordUpdateParams, 'passwordToken'>>({
    newPassword: '',
    newPasswordConfirm: '',
  });

  const localPasswordsMatch = useCallback(() => {
    return (
      !formState.newPassword ||
      !formState.newPasswordConfirm ||
      passwordsMatch(formState.newPassword, formState.newPasswordConfirm)
    );
  }, [formState]);

  const localPasswordsRequirements = useCallback(() => {
    return !formState.newPassword || passwordMeetsRequirements(formState.newPassword);
  }, [formState]);

  const valueChanged = (key: string, value: string) => {
    const state: Omit<ForgotPasswordUpdateParams, 'passwordToken'> = { ...formState };
    state[key as keyof Omit<ForgotPasswordUpdateParams, 'passwordToken'>] = value;
    setFormState(state);
    formChanged(state);
    const passwordsDoMatch = passwordsMatch(state.newPassword, state.newPasswordConfirm);
    const passwordDoesMeetRequirements = passwordMeetsRequirements(state.newPassword);
    validateForm(passwordsDoMatch && passwordDoesMeetRequirements);
  };

  return (
    <>
      <FormGroup>
        <Label htmlFor="new-password" className={onboarding ? '' : styles.authLabel}>
          {t('profile.new-password')}:
        </Label>
        <Input
          id="new-password"
          type="password"
          name="newPassword"
          data-testid="PasswordFormPassword"
          className={`${styles.authInput} ${localPasswordsRequirements() ? '' : styles.inputInvalid}`}
          required
          placeholder={t('profile.new-password')}
          value={formState.newPassword}
          onChange={(event) => valueChanged('newPassword', event.target.value)}
        />
        <Show show={!localPasswordsRequirements()}>
          <div className="text-red-500 text-xs">{t('warnings.password-pattern')}</div>
        </Show>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password-confirmation" className={onboarding ? '' : styles.authLabel}>
          {t('profile.confirm-new-password')}:
        </Label>
        <Input
          id="new-password-confirm"
          type="password"
          name="newPasswordConfirm"
          className={`${styles.authInput} ${localPasswordsMatch() ? '' : styles.inputInvalid}`}
          required
          placeholder={t('profile.confirm-new-password')}
          value={formState.newPasswordConfirm}
          data-testid="PasswordFormPasswordConfirm"
          onChange={(event) => valueChanged('newPasswordConfirm', event.target.value)}
        />
        <Show show={!localPasswordsMatch()}>
          <div className="text-red-500 text-xs">{t('warnings.password-must-match')}</div>
        </Show>
      </FormGroup>
    </>
  );
});
