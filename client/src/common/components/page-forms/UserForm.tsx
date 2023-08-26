import React, { useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select/async';
import { SingleValue } from 'react-select/dist/declarations/src';
import { useDebouncedCallback } from 'use-debounce';

import { Api, ForgotPasswordUpdateParams, UserNewParams, useLazyQuery } from 'src/api';
import { InfoTooltip } from 'src/common/components/info-tooltip/InfoTooltip';
import { NoOptionsMessage } from 'src/common/components/page-forms/NoOptionsMessage';
import { ResetPasswordForm } from 'src/common/components/page-forms/ResetPasswordForm';
import { Checkbox } from 'src/common/forms/Checkbox';
import { FormGroup } from 'src/common/forms/FormGroup';
import { Input } from 'src/common/forms/Input';
import { CheckboxLabel, Label } from 'src/common/forms/Label';
import { REACT_SELECT_STYLES } from 'src/common/forms/ReactSelect';
import { Select } from 'src/common/forms/Select';
import { Button } from 'src/common/interactions/Button';
import { Show } from 'src/common/layout';
import { Partner, User, UserTypes } from 'src/interfaces';

interface UserFormProps {
  user?: User;
  userType?: UserTypes;
  onboarding?: boolean;
  customErrors?: { USER_EXISTS: string };
  onSubmit: (user: UserNewParams) => void;
}

export const UserForm = React.memo((props: UserFormProps) => {
  const { user, customErrors, userType, onboarding, onSubmit } = props;
  const [partnersQuery, partnersResponse] = useLazyQuery<null, { data: Partner[] }>(Api.partner.list);
  const [selectedUserType, setSelectedUserType] = useState<UserTypes>(UserTypes.ADMIN);
  const passwordFormState = useRef<Omit<ForgotPasswordUpdateParams, 'passwordToken'>>();
  const [passwordFormValid, setPasswordFormValid] = useState(false);
  const [noOrgChecked, setNoOrgChecked] = useState(false);
  const [selectedClient, setSelectedClient] = useState<{ label: string; value: string } | null>();
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    if (!onboarding) {
      partnersQuery(null);
    }
    if (userType) {
      setSelectedUserType(userType);
    }
    if (user?.client) {
      setSelectedClient({ label: user.client.name, value: user.client.uuid });
    }
  }, [userType, partnersQuery, onboarding, user]);

  const _handleSearch = (query: string, callback: (options: { value: string; label: string }[]) => void) => {
    Api.client.query({ query }).then((data) => {
      callback(
        data.data.map((val) => {
          return {
            value: val.uuid,
            label: val.name,
          };
        }),
      );
    });
  };

  const handleSearch = useDebouncedCallback(_handleSearch, 250);

  const prepareSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const payload: UserNewParams = {
      firstName: '' + data.get('firstName'),
      lastName: '' + data.get('lastName'),
      type: ('' + data.get('type')) as UserTypes,
      email: '' + data.get('email'),
    };
    if (selectedUserType === UserTypes.CLIENT) {
      if (selectedClient) {
        payload.clientUuid = selectedClient.value;
      }
    } else if (selectedUserType === UserTypes.PARTNER) {
      payload.partnerUuid = '' + data.get('partnerUuid');
    }

    if (passwordFormState.current?.newPassword) {
      payload.password = passwordFormState.current.newPassword;
      payload.passwordConfirm = passwordFormState.current.newPasswordConfirm;
    }

    onSubmit(payload);
  };

  const onSelectUserType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserType(event.target.value as UserTypes);
  };

  const passwordFormChanged = (state: Omit<ForgotPasswordUpdateParams, 'passwordToken'>) => {
    passwordFormState.current = state;
  };

  const validatePasswordForm = (valid: boolean) => {
    setPasswordFormValid(valid);
  };

  const checkboxChecked = (value: boolean) => {
    setAgreementChecked(value);
  };

  const noOrgChanged = (value: boolean) => {
    setNoOrgChecked(value);
    setSelectedClient(null);
  };

  const onSelectClient = (event: SingleValue<{ label: string; value: string }>) => {
    if (event?.value) {
      setNoOrgChecked(false);
      setSelectedClient(event);
    } else {
      setSelectedClient(null);
    }
  };

  useEffect(() => {
    const disabled =
      (passwordFormState.current && !passwordFormValid) ||
      (onboarding && (!agreementChecked || (userType === UserTypes.CLIENT && !noOrgChecked && !selectedClient)));
    setSaveDisabled(Boolean(disabled));
  }, [passwordFormState, onboarding, passwordFormValid, agreementChecked, noOrgChecked, selectedClient, userType]);

  if (!onboarding && !partnersResponse.response?.data) {
    return null;
  }

  return (
    <form onSubmit={prepareSubmit}>
      <Show show={onboarding && userType === UserTypes.CLIENT}>
        <FormGroup className="mb-4">
          <Label htmlFor="user-client">{t('onboarding.your-organization')}</Label>
          <div className="react-select-container">
            <ReactSelect
              value={selectedClient}
              components={{ NoOptionsMessage }}
              styles={REACT_SELECT_STYLES}
              loadOptions={handleSearch}
              onChange={onSelectClient}
              placeholder={t('placeholder.select')}
            />
          </div>
          <CheckboxLabel htmlFor="org-not-listed">
            <div className="flex items-center">
              <Checkbox
                id="org-not-listed"
                checked={noOrgChecked || false}
                onChange={(event) => noOrgChanged(event.target.checked)}
              />{' '}
              {t('onboarding.organization-not-listed')}
              <InfoTooltip className="ml-2" content={t('onboarding.organization-not-listed-tip')} />
            </div>
          </CheckboxLabel>
        </FormGroup>
      </Show>
      <FormGroup>
        <Label htmlFor="user-first-name">{t('onboarding.first-name')}*</Label>
        <Input id="user-first-name" type="text" name="firstName" required defaultValue={user?.firstName} />
      </FormGroup>
      <FormGroup className="mb-4">
        <Label htmlFor="user-last-name">{t('onboarding.last-name')}*</Label>
        <Input id="user-last-name" type="text" name="lastName" required defaultValue={user?.lastName} />
      </FormGroup>
      <FormGroup className="mb-4">
        <Label htmlFor="user-email">{t('profile.email')}*</Label>
        <Input id="user-email" type="email" name="email" required defaultValue={user?.email} />
        <Show show={Boolean(customErrors?.USER_EXISTS)}>
          <div className="text-red-500">{t(`${customErrors?.USER_EXISTS}`)}</div>
        </Show>
      </FormGroup>
      <Show show={!Boolean(onboarding)}>
        <FormGroup className="mb-4">
          <Label htmlFor="user-type">{t('improve.type-label')}*</Label>
          <Select id="user-type" name="type" required onChange={onSelectUserType} defaultValue={user?.type}>
            <option value={UserTypes.ADMIN}>{UserTypes.ADMIN}</option>
            <option value={UserTypes.CLIENT}>{UserTypes.CLIENT}</option>
            <option value={UserTypes.PARTNER}>{UserTypes.PARTNER}</option>
          </Select>
        </FormGroup>
      </Show>
      <Show show={selectedUserType === UserTypes.CLIENT && !onboarding}>
        <FormGroup className="mb-4">
          <Label htmlFor="user-client">{t('onboarding.client')}*</Label>
          <div className="react-select-container">
            <ReactSelect
              value={selectedClient}
              components={{ NoOptionsMessage }}
              styles={REACT_SELECT_STYLES}
              loadOptions={handleSearch}
              onChange={onSelectClient}
            />
          </div>
        </FormGroup>
      </Show>
      <Show show={!onboarding && selectedUserType === UserTypes.PARTNER}>
        <FormGroup>
          <Label htmlFor="user-partner">{t('project.partner')}*</Label>
          <Select
            id="user-partner"
            name="partnerUuid"
            required={selectedUserType === UserTypes.PARTNER}
            defaultValue={user?.partner?.uuid}
          >
            {partnersResponse.response?.data.map((p) => {
              return (
                <option key={`partner-${p.uuid}`} value={p.uuid}>
                  {p.name}
                </option>
              );
            })}
          </Select>
        </FormGroup>
      </Show>
      <Show show={Boolean(onboarding)}>
        <ResetPasswordForm
          onboarding={onboarding}
          formChanged={passwordFormChanged}
          validateForm={validatePasswordForm}
        />
        <FormGroup>
          <CheckboxLabel htmlFor="agreement">
            <Checkbox
              id="agreement"
              aria-label={t('onboarding.user-agreement')}
              data-testid="UserFormAgreement"
              checked={agreementChecked || false}
              onChange={(event) => checkboxChecked(event.target.checked)}
            />{' '}
            {t('onboarding.user-agreement-desc')}
            <br />
            {!agreementChecked && <span className="text-red-500">* {t('warnings.required')}</span>}
          </CheckboxLabel>
          <Link to="/terms" target="_blank">
            {t('onboarding.read-user-agreement')}
          </Link>
        </FormGroup>
      </Show>
      <div className="w-full text-right">
        <Button.Primary type="submit" className="w-full md:w-80" disabled={saveDisabled}>
          {onboarding ? t('buttons.next') : t('buttons.save')}
        </Button.Primary>
      </div>
    </form>
  );
});
