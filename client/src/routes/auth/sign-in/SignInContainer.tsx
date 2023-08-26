import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, generatePath, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Api, LoginParams, LoginResponse, useLazyQuery } from 'src/api';
import { FormField, FormFieldGroup, TextHookInput } from 'src/common/forms';
import { extractHookError } from 'src/common/forms/error';
import { Validators } from 'src/common/forms/validators';
import { Button, LinkButton } from 'src/common/interactions/Button';
import { Show } from 'src/common/layout';
import { useAuthentication } from 'src/common/providers/AuthenticationProvider';
import { UserTypes } from 'src/interfaces';
import { AuthCard, AuthScreen } from 'src/routes/auth/common';
import { AuthRoutes } from 'src/routes/auth/index';
import { OnboardingRoutes } from 'src/routes/onboarding';

export const SignInContainer = React.memo(() => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { setToken } = useAuthentication();
  const location = useLocation();
  const navigate = useNavigate();

  const isPartner = searchParams.has('partner');
  const isClient = !isPartner;

  const [loginQuery, loginResponse] = useLazyQuery<LoginParams, { data: LoginResponse }>(Api.auth.login, {
    onSuccess: (response) => {
      setToken(response.data.token);
      if (response.data.type !== UserTypes.ADMIN) {
        if (!response.data.onboardingComplete)
          toast.success(t('onboarding.account-creation-notification'));
        if (!response.data.userWallet?.isWalletSessionActive)
          toast.error(t('onboarding.warn-wallet-session-in-active'));
        if (response.data.userWallet?.message)
          toast.warning(response.data.userWallet?.message);
      }

      if (location.state && (location.state as { redirectTo: string }).redirectTo) {
        navigate((location.state as { redirectTo: string }).redirectTo);
      } else {
        navigate('/');
      }
    },
    onError: (errors) => {
      setErrorMessage(errors.message);
    },
    disableErrorToast: true,
  });

  const { control, handleSubmit, formState } = useForm<LoginParams>({
    defaultValues: { email: '', password: '' },
  });
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (value: LoginParams) => {
    setErrorMessage('');
    loginQuery(value);
  };

  const disabled = loginResponse.status === 'loading';

  return (
    <AuthScreen>
      <div className="flex flex-col gap-6">
        <AuthCard>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormFieldGroup>
              <FormField
                id="email"
                name="email"
                label={t('authentication.username')}
                required
                error={extractHookError(formState, 'email')}
              >
                <TextHookInput control={control} rules={Validators.required(t)} />
              </FormField>

              <FormField
                id="password"
                name="password"
                label={t('authentication.password')}
                required
                error={extractHookError(formState, 'password')}
                postFieldContent={
                  <Link to={generatePath(AuthRoutes.FORGOT_PASSWORD)} className="text-xs">
                    {t('authentication.forgot-password')}
                  </Link>
                }
              >
                <TextHookInput type="password" control={control} rules={Validators.required(t)} />
              </FormField>

              <Show show={Boolean(errorMessage)}>
                <div className="w-full lg:w-3/4 m-auto mb-2 text-center text-red-500 font-semibold">
                  {t(`${errorMessage}`)}
                </div>
              </Show>

              <div className="text-center">
                <Button.Primary type="submit" className="w-3/4" disabled={disabled}>
                  {t('authentication.signin')}
                </Button.Primary>
              </div>
            </FormFieldGroup>
          </form>
        </AuthCard>

        <div className="px-6">
          <Show show={isPartner}>
            <div className="text-center">
              <LinkButton.Secondary className="w-3/4" to={generatePath(OnboardingRoutes.PARTNER_USER)}>
                {t('authentication.signup')}
              </LinkButton.Secondary>
            </div>
          </Show>

          <Show show={isClient}>
            <div className="text-center mb-6">
              <LinkButton.Secondary className="w-3/4" to={generatePath(OnboardingRoutes.CLIENT_USER, { code: 'None' })}>
                {t('authentication.create-account')}
              </LinkButton.Secondary>
            </div>

            <div className="text-center">
              <Link to={generatePath(OnboardingRoutes.CLIENT_CODE)} className="text-white">
                {t('authentication.have-passcode')}
              </Link>
            </div>
          </Show>
        </div>
      </div>
    </AuthScreen>
  );
});
