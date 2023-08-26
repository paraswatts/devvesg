import React from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Api, ResetPasswordRequestParams, useLazyQuery } from 'src/api';
import { FormField, FormFieldGroup, TextHookInput } from 'src/common/forms';
import { extractHookError } from 'src/common/forms/error';
import { Validators } from 'src/common/forms/validators';
import { Button } from 'src/common/interactions/Button';
import { AuthCard, AuthScreen } from 'src/routes/auth/common';
import { AuthRoutes } from 'src/routes/auth/routes';

export const ForgotPasswordContainer = React.memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [requestResetQuery, { status }] = useLazyQuery(Api.auth.requestResetPasswordLink, {
    onSuccess: () => {
      toast.success(t('authentication.password-reset-email-sent'));
      navigate(generatePath(AuthRoutes.LOGIN));
    },
  });

  const { control, handleSubmit, formState } = useForm<ResetPasswordRequestParams>({
    defaultValues: { email: '' },
  });

  const handleValidSubmit = (values: ResetPasswordRequestParams) => {
    requestResetQuery(values);
  };

  const disabled = status === 'loading' || (formState.isSubmitted && !formState.isValid);

  return (
    <AuthScreen>
      <AuthCard>
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <FormFieldGroup>
            <FormField id="email" name="email" label={t('authentication.email')} required error={extractHookError(formState, 'email')}>
              <TextHookInput control={control} rules={Validators.required(t)} />
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
