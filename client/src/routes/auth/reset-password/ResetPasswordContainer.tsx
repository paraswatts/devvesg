import React from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Api, useLazyQuery } from 'src/api';
import { FormField, FormFieldGroup, TextHookInput } from 'src/common/forms';
import { extractHookError } from 'src/common/forms/error';
import { Validators } from 'src/common/forms/validators';
import { useParams } from 'src/common/hooks';
import { Button } from 'src/common/interactions/Button';
import { AuthCard, AuthScreen } from 'src/routes/auth/common';
import { AuthRoutes } from 'src/routes/auth/index';

interface ResetPasswordFormValues {
  newPassword: string;
  newPasswordConfirm: string;
}

export const ResetPasswordContainer = React.memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resetPasswordToken } = useParams<{ resetPasswordToken: string }>();
  const [resetPasswordQuery, { status }] = useLazyQuery(Api.auth.updateForgottenPassword, {
    disableErrorToast: true,
    onSuccess: () => {
      toast.success(t('authentication.password-updated'));
      navigate(generatePath(AuthRoutes.LOGIN));
    },
    onError: () => {
      toast.error(t('authentication.password-not-matching'));
    },
  });

  const { formState, handleSubmit, watch, control } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      newPassword: '',
      newPasswordConfirm: '',
    },
  });
  const password = watch('newPassword');

  const handleValidSubmit = (values: ResetPasswordFormValues) => {
    resetPasswordQuery({ ...values, passwordToken: resetPasswordToken });
  };

  const disabled = status === 'loading' || (formState.isSubmitted && !formState.isValid);

  return (
    <AuthScreen>
      <AuthCard>
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <FormFieldGroup>
            <FormField
              id="user-new-password"
              name="newPassword"
              label={t('profile.new-password')}
              required
              error={extractHookError(formState, 'newPassword')}
            >
              <TextHookInput type="password" control={control} rules={Validators.password(t)} />
            </FormField>

            <FormField
              id="user-new-password-confirm"
              name="newPasswordConfirm"
              label={t('profile.confirm-new-password')}
              required
              error={extractHookError(formState, 'newPasswordConfirm')}
            >
              <TextHookInput type="password" control={control} rules={Validators.passwordMatch(password, t)} />
            </FormField>

            <div className="w-3/4 m-auto">
              <Button.Primary type="submit" className="w-full" disabled={disabled}>
                {t('authentication.submit')}
              </Button.Primary>
            </div>
          </FormFieldGroup>
        </form>
      </AuthCard>
    </AuthScreen>
  );
});
