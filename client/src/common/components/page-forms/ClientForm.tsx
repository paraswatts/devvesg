import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Api, ClientNewParams, useLazyQuery } from 'src/api';
import {
  FormField,
  FormFieldGroup,
  LocationSelect,
  SingleSelectHookInput,
  TextAreaHookInput,
  TextHookInput,
  TextInput,
} from 'src/common/forms';
import { extractHookError } from 'src/common/forms/error';
import { Label } from 'src/common/forms/Label';
import { Validators } from 'src/common/forms/validators';
import { Button } from 'src/common/interactions/Button';
import { ClientPartnerLocation, ClientType, Vertical } from 'src/interfaces';

import fileInputStyles from 'src/common/styles/FileInput.module.scss';

import FileIcon from 'src/assets/images/file-icon.svg';

interface ClientFormProps {
  defaultValue?: ClientFormInputValues;
  existingLogo?: string;
  onboarding?: boolean;
  loading?: boolean;
  onSubmit: (client: ClientNewParams) => void;
}

export interface ClientFormValues {
  name: string;
  description: string;
  verticalId?: string;
  clientTypeId?: string;
  logo?: string | FileList;
  contactEmail: string;
  websiteUrl: string;
  contactPhoneNumber: string;
  twitterUrl: string;
  linkedInUrl: string;
  clientLocations: ClientPartnerLocation[];
}

export interface ClientFormInputValues {
  name: string;
  description: string;
  contactEmail: string;
  websiteUrl: string;
  contactPhoneNumber?: string;
  twitterUrl?: string;
  linkedInUrl?: string;
  clientType?: {
    uuid: string;
    name: string;
  };
  vertical?: {
    uuid: string;
    name: string;
  };
  clientLocations: ClientPartnerLocation[];
}

export const ClientForm = ({ defaultValue, existingLogo, onboarding, loading, onSubmit }: ClientFormProps) => {
  const { t } = useTranslation();
  const [fileName, setFileName] = useState('');

  const { control, formState, register, handleSubmit, trigger } = useForm<ClientFormValues>({
    shouldFocusError: true,
    defaultValues: {
      name: defaultValue?.name || '',
      description: defaultValue?.description || '',
      logo: undefined,
      contactEmail: defaultValue?.contactEmail || '',
      contactPhoneNumber: defaultValue?.contactPhoneNumber || '',
      websiteUrl: defaultValue?.websiteUrl || '',
      twitterUrl: defaultValue?.twitterUrl || '',
      linkedInUrl: defaultValue?.linkedInUrl || '',
      verticalId: defaultValue?.vertical?.uuid,
      clientTypeId: defaultValue?.clientType?.uuid,
      clientLocations: defaultValue?.clientLocations || [],
    },
  });

  const [verticals, setVerticals] = useState<{ label: string; value: string }[]>([]);
  const [verticalsQuery, verticalsResponse] = useLazyQuery<null, { data: Vertical[] }>(Api.vertical.list, {
    onSuccess: (response) =>
      setVerticals(response.data.map((vertical) => ({ value: vertical.uuid, label: vertical.name }))),
  });

  const [clientTypes, setClientTypes] = useState<{ label: string; value: string }[]>([]);
  const [clientTypesQuery, clientTypesResponse] = useLazyQuery<null, { data: ClientType[] }>(Api.clientType.list, {
    onSuccess: (response) =>
      setClientTypes(response.data.map((clientType) => ({ value: clientType.uuid, label: clientType.name }))),
  });

  useEffect(() => {
    verticalsQuery(null);
    clientTypesQuery(null);
  }, [verticalsQuery, clientTypesQuery]);

  useEffect(() => {
    trigger();
  }, [t, trigger]);

  const handleValidSubmit = (values: ClientFormValues) => {
    const { clientTypeId, verticalId, logo, ...rest } = values;

    let logoFile = undefined;
    if (logo && logo instanceof FileList) {
      if (logo.length > 0) {
        logoFile = logo[0];
      }
    }

    const payload: ClientNewParams = {
      clientType: clientTypeId,
      vertical: verticalId,
      logo: logoFile,
      ...rest,
    };
    onSubmit(payload);
  };

  const disabled = loading || (formState.isSubmitted && !formState.isValid);

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)}>
      <FormFieldGroup>
        <FormField
          id="client-vertical"
          name="verticalId"
          label={t('profile.vertical')}
          error={extractHookError(formState, 'verticalId')}
          required
        >
          <SingleSelectHookInput
            control={control}
            rules={Validators.required(t)}
            loading={verticalsResponse.status === 'loading'}
            placeholder={`${t('placeholder.search')}...`}
            options={verticals}
            showSearch
            optionFilterProp="label"
          />
        </FormField>

        <FormField id="client-locations" name="locations" error={extractHookError(formState, 'clientLocations')}>
          <Controller
            name="clientLocations"
            control={control}
            rules={Validators.locations(t)}
            render={({ field }) => <LocationSelect {...field} />}
          />
        </FormField>

        {onboarding && <h1 className="text-gray-500 font-light">{t('profile.company-details')}</h1>}

        <FormField
          id="client-name"
          name="name"
          label={t('profile.name')}
          error={extractHookError(formState, 'name')}
          required
        >
          <TextHookInput control={control} rules={Validators.required(t)} />
        </FormField>

        <FormField id="client-description" name="description" label={t('profile.description')}>
          <TextAreaHookInput control={control} />
        </FormField>

        <FormField
          id="client-client-type"
          name="clientTypeId"
          label={t('profile.organisation-category-label')}
          error={extractHookError(formState, 'clientTypeId')}
          required
        >
          <SingleSelectHookInput
            control={control}
            rules={Validators.required(t)}
            loading={clientTypesResponse.status === 'loading'}
            options={clientTypes}
            placeholder={t('placeholder.select')}
          />
        </FormField>

        {existingLogo && existingLogo.length > 0 && (
          <FormField id="client-logo-current" name="logoCurrent" label={t('profile.current-logo')}>
            <img className="max-h-40 max-w-40" src={existingLogo} alt="Logo" />
          </FormField>
        )}

        <div className="flex flex-col gap-2 relative">
          <FormField id="client-logo" name="logo" label={t('profile.logo')} error={extractHookError(formState, 'logo')}>
            <div className={fileInputStyles.file_input_label}>
              <img src={FileIcon} style={{ height: 20 }} alt="file icon" />
              <Label htmlFor="client-logo" className={`${fileInputStyles.truncate_text} text-base normal-case	font-medium ml-1`}>
                {fileName ? fileName : t('buttons.choose-a-file')}
              </Label>
            </div>
            <TextInput
              className={fileInputStyles.file_input}
              {...register('logo', Validators.imageFileSize(1, t))}
              type="file"
              accept=".jpg,.png,.jpeg,.gif"
              onChange={(event) => {
                setFileName(event.target?.files?.[0].name || '');
              }}
            />
          </FormField>
        </div>

        <FormField
          id="client-email"
          name="contactEmail"
          label={t('profile.email')}
          error={extractHookError(formState, 'contactEmail')}
          required
        >
          <TextHookInput control={control} rules={Validators.required(t)} />
        </FormField>

        <FormField
          id="client-website"
          name="websiteUrl"
          label={t('profile.website-url')}
          error={extractHookError(formState, 'websiteUrl')}
          required
        >
          <TextHookInput control={control} rules={Validators.required(t)} />
        </FormField>

        <FormField id="client-phone-number" name="contactPhoneNumber" label={t('profile.phone-number')}>
          <TextHookInput control={control} />
        </FormField>

        <FormField id="client-twitter" name="twitterUrl" label={t('profile.twitter-url')}>
          <TextHookInput control={control} />
        </FormField>

        <FormField id="client-linkedin" name="linkedInUrl" label={t('profile.linkedin-url')}>
          <TextHookInput control={control} />
        </FormField>
      </FormFieldGroup>

      <div className="w-full text-right">
        <Button.Primary type="submit" className="w-full md:w-80" disabled={disabled}>
          {onboarding ? t('buttons.next') : t('buttons.save')}
        </Button.Primary>
      </div>
    </form>
  );
};
