import React, { useEffect, useRef, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Api, PartnerNewParams, useLazyQuery } from 'src/api';
import {
  CountrySelectHookInput,
  FormField,
  FormFieldGroup,
  MultiSelectHookInput,
  ProvinceSelectHookInput,
  SelectOption,
  SingleSelectHookInput,
  TextAreaHookInput,
  TextHookInput,
  TextInput,
} from 'src/common/forms';
import { extractHookError } from 'src/common/forms/error';
import { Label } from 'src/common/forms/Label';
import { Validators } from 'src/common/forms/validators';
import { Button } from 'src/common/interactions/Button';
import { Show } from 'src/common/layout';
import { useUser } from 'src/common/providers/UserProvider';
import { Partner, Service, UserTypes, Vertical } from 'src/interfaces';

import fileInputStyles from 'src/common/styles/FileInput.module.scss';

import FileIcon from 'src/assets/images/file-icon.svg';

interface PartnersFormProps {
  onSubmit: (newValue: PartnerNewParams) => void;
  currentValues?: Partner;
  onboarding?: boolean;
}

export const PartnersForm = React.memo((props: PartnersFormProps) => {
  const { t } = useTranslation();
  const [fileName, setFileName] = useState('');
  const { onSubmit, currentValues, onboarding } = props;
  const { user } = useUser();
  const [serviceOptions, setServiceOptions] = useState<{ label: string; value: string }[]>([]);
  const [verticalOptions, setVerticalOptions] = useState<{ label: string; value: string }[]>([]);
  const hasInitiatedCountry = useRef(false);
  const [servicesQuery] = useLazyQuery<null, { data: Service[] }>(Api.service.list, {
    onSuccess: (response) => {
      const mappedServices = response.data.map((s) => {
        return { value: s.uuid, label: s.name };
      });
      setServiceOptions(mappedServices);
    },
  });
  const [verticalsQuery] = useLazyQuery<null, { data: Vertical[] }>(Api.vertical.list, {
    onSuccess: (response) => {
      const mappedVerticals = response.data.map((s) => {
        return { value: s.uuid, label: s.name };
      });
      setVerticalOptions(mappedVerticals);
    },
  });

  const { register, handleSubmit, formState, control, watch, setValue, trigger } = useForm<PartnerNewParams>({
    defaultValues: {
      name: currentValues?.name || '',
      description: currentValues?.description || '',
      logo: currentValues?.logo,
      contactEmail: currentValues?.contactEmail || '',
      websiteUrl: currentValues?.websiteUrl || '',
      facebookUrl: currentValues?.facebookUrl || '',
      contactPhoneNumber: currentValues?.contactPhoneNumber || '',
      twitterUrl: currentValues?.twitterUrl || '',
      linkedInUrl: currentValues?.linkedInUrl || '',
      serviceIds: currentValues?.services?.map((s) => s.uuid) || [],
      verticalId: currentValues?.vertical?.uuid,
      country: currentValues?.country,
      province: currentValues?.province,
      hubspotId: currentValues?.hubspotId,
    },
    mode: 'onChange',
  });

  const country = watch('country');
  useEffect(() => {
    // Only do this if the country has been set initially. Otherwise, this will clear out the provided province and make the form invalid
    if (hasInitiatedCountry.current) {
      setValue('province', null, { shouldValidate: true });
    } else {
      hasInitiatedCountry.current = true;
    }
  }, [country, setValue]);

  useEffect(() => {
    if (!onboarding) {
      servicesQuery(null);
    }
    verticalsQuery(null);
  }, [onboarding, servicesQuery, verticalsQuery]);

  useEffect(() => {
    trigger();
  }, [t, trigger]);

  const prepareSubmit = (values: PartnerNewParams) => {
    const payload = { ...values };

    // When using React Hook Form, the logo seems to being made into a Filelist instead of a File,
    // so this will move the logo file up to the expected File level
    if (values.logo instanceof FileList && values.logo.length >= 1) {
      payload.logo = values.logo[0];
    }

    onSubmit(payload);
  };

  const saveDisabled = formState.isSubmitted && !formState.isValid;

  return (
    <>
      <form onSubmit={handleSubmit(prepareSubmit)}>
        <h2>{t('improve.location-label')}</h2>

        <FormFieldGroup>
          <FormField
            id="partner-country"
            name="country"
            label={t('profile.country')}
            required
            error={extractHookError(formState, 'country')}
          >
            <CountrySelectHookInput control={control} rules={Validators.required(t)} />
          </FormField>

          <FormField
            id="partner-province"
            name="province"
            label={t('profile.state-or-province')}
            required
            error={extractHookError(formState, 'province')}
          >
            <ProvinceSelectHookInput control={control} rules={Validators.required(t)} country={country} />
          </FormField>
        </FormFieldGroup>

        <h2 className="mt-6">{t('profile.company-details')}</h2>

        <FormFieldGroup>
          <FormField
            id="partner-name"
            name="name"
            label={t('profile.name')}
            required
            error={extractHookError(formState, 'name')}
          >
            <TextHookInput control={control} rules={Validators.required(t)} />
          </FormField>

          <FormField
            id="partner-description"
            name="description"
            label={t('profile.company-description')}
            required
            error={extractHookError(formState, 'description')}
          >
            <TextAreaHookInput rows={4} control={control} rules={Validators.required(t)} />
          </FormField>

          {currentValues?.logo && currentValues.logo.length > 0 && (
            <FormField id="client-logo-current" name="logoCurrent" label={t('profile.current-logo')}>
              <img className="max-h-40 max-w-40" src={currentValues.logo} alt="Logo" />
            </FormField>
          )}

          <div className="relative">
            <FormField
              id="partner-logo"
              name="logo"
              label={t('profile.logo')}
              error={extractHookError(formState, 'logo')}
            >
              <div className={fileInputStyles.file_input_label}>
                <img src={FileIcon} style={{ height: 20 }} alt="file icon" />
                <Label
                  htmlFor="logo"
                  className={`${fileInputStyles.truncate_text} text-base normal-case	font-medium ml-1`}
                >
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
            id="partner-vertical"
            name="verticalId"
            label={t('profile.vertical')}
            required
            error={extractHookError(formState, 'verticalId')}
          >
            <SingleSelectHookInput control={control} rules={Validators.required(t)} showSearch optionFilterProp="label">
              {verticalOptions.map((option) => (
                <SelectOption key={option.value} value={option.value} label={option.label}>
                  {option.label}
                </SelectOption>
              ))}
            </SingleSelectHookInput>
          </FormField>

          <FormField
            id="partner-contact-email"
            name="contactEmail"
            label={t('contact-email')}
            required
            error={extractHookError(formState, 'contactEmail')}
          >
            <TextHookInput type="email" control={control} rules={Validators.required(t)} />
          </FormField>

          <FormField
            id="partner-website-url"
            name="websiteUrl"
            label={t('profile.website-url')}
            required
            error={extractHookError(formState, 'websiteUrl')}
          >
            <TextHookInput control={control} rules={Validators.required(t)} />
          </FormField>

          <FormField
            id="partner-phone-number"
            name="contactPhoneNumber"
            label={t('profile.phone-number')}
            required
            error={extractHookError(formState, 'contactPhoneNumber')}
          >
            <TextHookInput control={control} rules={Validators.required(t)} />
          </FormField>

          <FormField id="partner-facebook-url" name="facebookUrl" label={t('profile.facebook-url')}>
            <TextHookInput control={control} />
          </FormField>

          <FormField id="partner-twitter-url" name="twitterUrl" label={t('profile.twitter-url')}>
            <TextHookInput control={control} />
          </FormField>

          <FormField id="partner-linkedin-url" name="linkedInUrl" label={t('profile.linkedin-url')}>
            <TextHookInput control={control} />
          </FormField>

          <Show show={!Boolean(onboarding)}>
            <FormField id="partner-services" name="serviceIds" label={t('profile.services')}>
              <MultiSelectHookInput
                control={control}
                placeholder={t('placeholder.select')}
                filterOption
                optionFilterProp="label"
              >
                {serviceOptions.map((option) => (
                  <SelectOption key={option.value} value={option.value} label={option.label}>
                    {option.label}
                  </SelectOption>
                ))}
              </MultiSelectHookInput>
            </FormField>
          </Show>

          {user.type === UserTypes.ADMIN && (
            <FormField id="partner-hubspot-id" name="hubspotId" label={t('profile.hubspot-id')}>
              <TextHookInput control={control} />
            </FormField>
          )}

          <div className="w-full text-right">
            <Button.Primary type="submit" className="w-full md:w-80" disabled={saveDisabled}>
              {onboarding ? t('buttons.next') : t('buttons.save')}
            </Button.Primary>
          </div>
        </FormFieldGroup>
      </form>
    </>
  );
});
