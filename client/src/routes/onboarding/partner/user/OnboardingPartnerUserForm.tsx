import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { UserNewParams } from 'src/api';
import { CheckboxHookInput, FormField, FormFieldGroup, TextHookInput } from 'src/common/forms';
import { extractHookError } from 'src/common/forms/error';
import { Validators } from 'src/common/forms/validators';
import { Button } from 'src/common/interactions/Button';
import { UserTypes } from 'src/interfaces';

interface OnboardingPartnerUserFormProps {
  loading?: boolean;
  customErrors?: { USER_EXISTS: string };
  onSubmit: (user: UserNewParams) => void;
}

interface PartnerUserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  agreed: boolean;
}

export const OnboardingPartnerUserForm = React.memo((props: OnboardingPartnerUserFormProps) => {
  const { loading, customErrors, onSubmit } = props;
  const { t } = useTranslation();
  const { control, formState, handleSubmit, watch, setError } = useForm<PartnerUserFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      agreed: false,
    },
  });
  const password = watch('password');

  useEffect(() => {
    if (customErrors?.USER_EXISTS) {
      setError('email', { message: customErrors.USER_EXISTS });
    }
  }, [setError, customErrors]);

  const handleValidSubmit = ({ agreed, ...rest }: PartnerUserFormValues) => {
    onSubmit({ ...rest, type: UserTypes.PARTNER });
  };

  const disabled = loading || (formState.isSubmitted && !formState.isValid);

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)}>
      <FormFieldGroup>
        <FormField
          id="user-first-name"
          name="firstName"
          label={t('onboarding.first-name')}
          required
          error={extractHookError(formState, 'firstName')}
        >
          <TextHookInput control={control} rules={Validators.required(t)} />
        </FormField>

        <FormField
          id="user-last-name"
          name="lastName"
          label={t('onboarding.last-name')}
          required
          error={extractHookError(formState, 'lastName')}
        >
          <TextHookInput control={control} rules={Validators.required(t)} />
        </FormField>

        <FormField
          id="user-email"
          name="email"
          label={t('profile.email')}
          required
          error={extractHookError(formState, 'email')}
        >
          <TextHookInput type="email" control={control} rules={Validators.required(t)} />
        </FormField>

        <FormField
          id="user-password"
          name="password"
          label={t('authentication.password')}
          required
          error={extractHookError(formState, 'password')}
        >
          <TextHookInput type="password" control={control} rules={Validators.password(t)} />
        </FormField>

        <FormField
          id="user-password-confirm"
          name="passwordConfirm"
          label={t('profile.confirm-password')}
          required
          error={extractHookError(formState, 'passwordConfirm')}
        >
          <TextHookInput type="password" control={control} rules={Validators.passwordMatch(password, t)} />
        </FormField>

        <FormField
          id="user-agreement"
          name="agreed"
          label={t('onboarding.user-agreement')}
          required
          postFieldContent={
            <Link to="/terms" target="_blank">
              {t('onboarding.read-user-agreement')}
            </Link>
          }
          error={extractHookError(formState, 'agreed')}
        >
          <CheckboxHookInput
            control={control}
            rules={Validators.required(t)}
            label={t('onboarding.user-agreement-desc')}
          />
        </FormField>

        <div className="w-full text-right">
          <Button.Primary type="submit" className="w-full md:w-80" disabled={disabled}>
            {t('buttons.next')}
          </Button.Primary>
        </div>
      </FormFieldGroup>
    </form>
  );
});
