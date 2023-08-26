import React from 'react';

import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Api, useLazyQuery } from 'src/api';
import { UserDeactivate, UserDeactivateVariables } from 'src/common/components/modals/__gql__/UserDeactivate';
import { USER_DEACTIVATE } from 'src/common/components/modals/UserProfileModal.query';
import { FormField, FormFieldGroup, TextHookInput } from 'src/common/forms';
import { extractHookError } from 'src/common/forms/error';
import { Validators } from 'src/common/forms/validators';
import { Button } from 'src/common/interactions/Button';
import { useAuthentication } from 'src/common/providers/AuthenticationProvider';
import { useUser } from 'src/common/providers/UserProvider';

interface ProfileFormValues {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

interface UserProfileModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

export const UserProfileModal = React.memo((props: UserProfileModalProps) => {
  const { t } = useTranslation();
  const { onCloseModal } = props;
  const { user } = useUser();
  const { signOut } = useAuthentication();
  const [updatePasswordQuery, { status }] = useLazyQuery(Api.auth.updatePassword, {
    onSuccess: () => onCloseModal(),
  });
  const { control, formState, watch, handleSubmit } = useForm<ProfileFormValues>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });
  const password = watch('newPassword');

  const [deactivateModalOpen, setDeactivateModalOpen] = React.useState(false);
  const [userDeactivate, { loading }] = useMutation<UserDeactivate, UserDeactivateVariables>(USER_DEACTIVATE, {
    onCompleted: () => {
      signOut();
    },
  });

  const handleValidSubmit = (value: ProfileFormValues) => updatePasswordQuery({ ...value });
  const handleOpenCancelModal = () => setDeactivateModalOpen(true);
  const handleCloseCancelModal = () => setDeactivateModalOpen(false);
  const handleDeleteAccount = () => userDeactivate({ variables: { id: user.uuid } });

  const disabled = status === 'loading' || (formState.isSubmitted && !formState.isValid);

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <FormField id="user-display-name" name="displayName" label={t('profile.name')} disableHelpTextAllocation>
          {user.firstName || ''} {user.lastName || ''}
        </FormField>

        <FormField id="user-email" name="email" label={t('profile.email')} disableHelpTextAllocation>
          {user.email}
        </FormField>
      </div>

      <h2 className="mt-5">{t('profile.change-password')}</h2>

      <div>
        <FormFieldGroup>
          <FormField
            id="user-current-password"
            name="currentPassword"
            label={t('profile.current-password')}
            required
            error={extractHookError(formState, 'currentPassword')}
          >
            <TextHookInput type="password" control={control} rules={Validators.required(t)} />
          </FormField>

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
            <TextHookInput type="password" control={control} rules={Validators.passwordMatch(password,t)} />
          </FormField>

          <div className="text-right">
            <Button.Primary type="submit" disabled={disabled}>
              {t('buttons.save')}
            </Button.Primary>
          </div>
        </FormFieldGroup>

        <div className="flex flex-row gap-3 mt-10">
          <div onClick={handleOpenCancelModal} className="bg-transparent text-blue-600 underline cursor-pointer">
            {t('profile.delete-account')}
          </div>
        </div>

        <div
          className={`border-8 border-red-500 bg-white p-8 rounded shadow-xl inset-36 flex flex-col justify-center items-center ${
            deactivateModalOpen ? 'absolute' : 'hidden'
          }`}
        >
          <div className="flex-1 flex items-center text-center">
            {t('profile.confirm-delete-warning1')} <br />
            {t('profile.confirm-delete-warning2')}
          </div>
          <div className="flex w-full flex-row justify-between items-center">
            <Button.Primary onClick={handleCloseCancelModal} disabled={loading} type="button">
              {t('profile.cancel-delete-account')}
            </Button.Primary>

            <Button.Warning onClick={handleDeleteAccount} disabled={loading} type="button">
              {t('profile.confirm-delete-account')}
            </Button.Warning>
          </div>
        </div>
      </div>
    </form>
  );
});
