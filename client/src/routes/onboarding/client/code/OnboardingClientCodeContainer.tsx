import React, { useEffect, useRef } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, generatePath, useNavigate } from 'react-router-dom';

import { Api, useLazyQuery } from 'src/api';
import { FormField, FormFieldGroup, TextHookInput } from 'src/common/forms';
import { extractHookError } from 'src/common/forms/error';
import { Validators } from 'src/common/forms/validators';
import { Button } from 'src/common/interactions/Button';
import { AuthCard, AuthScreen } from 'src/routes/auth/common';
import { OnboardingRoutes } from 'src/routes/onboarding';

export const OnboardingClientCodeContainer = React.memo(() => {
  const { t } = useTranslation();
  const codeRef = useRef<string>();
  const navigate = useNavigate();

  const { control, formState, handleSubmit, setError } = useForm<{ code: string }>({
    defaultValues: {
      code: '',
    },
  });

  const [codeQuery, codeResponse] = useLazyQuery(Api.client.verifyCode, {
    disableErrorToast: true,
    onSuccess: (response) => {
      if (response.data === true) {
        navigate(generatePath(OnboardingRoutes.CLIENT_USER, { code: codeRef.current }));
      } else {
        setError('code', { message: t('onboarding.invalid-code') });
      }
    },
    onError: () => {
      setError('code', { message: t('onboarding.invalid-code') });
    },
  });

  const handleValidSubmit = (values: { code: string }) => {
    codeRef.current = values.code;
    codeQuery({ code: values.code });
  };

  const disabled = (formState.isSubmitted && !formState.isValid) || codeResponse.status === 'loading';

  useEffect(() => {
    //reset error on language change
    if (formState.errors.code) {
      setError('code', { message: t('onboarding.invalid-code') });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  return (
    <AuthScreen>
      <div className="flex flex-col gap-6">
        <AuthCard>
          <form onSubmit={handleSubmit(handleValidSubmit)}>
            <FormFieldGroup>
              <FormField
                id="client-code"
                name="code"
                label={t('onboarding.passcode')}
                required
                error={extractHookError(formState, 'code')}
              >
                <TextHookInput control={control} rules={Validators.required(t)} />
              </FormField>

              <div className="text-center">
                <Button.Primary type="submit" className="w-3/4" disabled={disabled}>
                  {t('onboarding.redeem-passcode')}
                </Button.Primary>
              </div>
            </FormFieldGroup>
          </form>
        </AuthCard>

        <div className="text-center">
          <Link className="text-white" to={generatePath(OnboardingRoutes.CLIENT_USER, { code: 'None' })}>
            {t('onboarding.no-passcode')}
          </Link>
        </div>
      </div>
    </AuthScreen>
  );
});
