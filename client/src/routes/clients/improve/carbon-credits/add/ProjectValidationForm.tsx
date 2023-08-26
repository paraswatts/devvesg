import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { NftFormValues } from 'src/api';
import { FormField, FormFieldGroup, TextHookInput, TextInput } from 'src/common/forms';
import { extractStepFormError } from 'src/common/forms/error';
import { Label } from 'src/common/forms/Label';
import { Validators } from 'src/common/forms/validators';

import FileIcon from 'src/assets/images/file-icon.svg';

import styles from './CarbonCreditsAddContainer.module.scss';
import FormButtons from './FormButtons';
export interface CreditInformationValues {
  methodology?: string;
  projectType?: string;
  projectStandard?: string;
  projectVerifier?: string;
  projectValidator?: string;
  publicRegistry?: string;
  publicRegistryLink?: string;
  asset?: FormDataEntryValue | File | null;
}
interface FormProps {
  handleBack: () => void;
  handleNext: (values: NftFormValues) => void;
  loading: boolean | undefined;
  defaultValues: CreditInformationValues;
}

export const ProjectValidationForm = ({ handleBack, handleNext, loading, defaultValues }: FormProps) => {
  const { t } = useTranslation();
  const [fileName, setFileName] = useState('');
  const { control, formState, handleSubmit, trigger, register, setFocus } = useForm<CreditInformationValues>({
    shouldFocusError: true,
    mode: 'onChange',
    defaultValues: defaultValues,
  });

  const handleValidSubmit = async (values: CreditInformationValues) => {
    const isStepValid = await trigger();
    const payload: NftFormValues = {
      ...values,
    };

    if (isStepValid) {
      handleNext(payload);
    }
  };

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    setFocus("projectValidator");
  }, [setFocus]);


  return (
    <form onSubmit={handleSubmit(handleValidSubmit)}>
      <FormFieldGroup>
        <FormField
          description={t('improve.validator-desc')}
          id="nft-project-validator"
          name="projectValidator"
          label={t('improve.validator-label')}
          error={extractStepFormError(formState, 'projectValidator')}
          required
        >
          <TextHookInput
            placeholder={t('placeholder.project-validator')}
            control={control}
            rules={Validators.required(t)}
          />
        </FormField>

        <FormField
          description={t('improve.verifier-desc')}
          id="nft-project-verifier"
          name="projectVerifier"
          label={t('improve.verifier-label')}
          error={extractStepFormError(formState, 'projectVerifier')}
          required
        >
          <TextHookInput
            placeholder={t('placeholder.project-verifier')}
            control={control}
            rules={Validators.required(t)}
          />
        </FormField>

        <FormField
          description={t('improve.standard-desc')}
          id="nft-project-standard"
          name="projectStandard"
          label={t('improve.standard-label')}
          error={extractStepFormError(formState, 'projectStandard')}
          required
        >
          <TextHookInput
            placeholder={t('placeholder.project-standard')}
            control={control}
            rules={Validators.required(t)}
          />
        </FormField>

        <FormField
          description={t('improve.methodology-desc')}
          id="nft-methodology"
          name="methodology"
          label={t('improve.methodology-label')}
          error={extractStepFormError(formState, 'methodology')}
          required
        >
          <TextHookInput
            placeholder={t('placeholder.project-methodology')}
            control={control}
            rules={Validators.required(t)}
          />
        </FormField>

        <FormField
          description={t('improve.project-type-desc')}
          id="nft-project-type"
          name="projectType"
          label={t('improve.project-type-label')}
          error={extractStepFormError(formState, 'projectType')}
          required
        >
          <TextHookInput
            placeholder={t('placeholder.project-methodology')}
            control={control}
            rules={Validators.required(t)}
          />
        </FormField>

        <FormField
          description={t('improve.registry-desc')}
          id="nft-public-registry"
          name="publicRegistry"
          label={t('improve.registry-label')}
          error={extractStepFormError(formState, 'publicRegistry')}
          required
        >
          <TextHookInput
            placeholder={t('placeholder.project-verifier')}
            control={control}
            rules={Validators.required(t)}
          />
        </FormField>

        <FormField
          description={t('improve.registry-link-desc')}
          id="nft-public-registry-link"
          name="publicRegistryLink"
          label={t('improve.registry-link-label')}
          error={extractStepFormError(formState, 'publicRegistryLink')}
          required
        >
          <TextHookInput
            placeholder="https://registry.verra.org/app/projectDetail/VCS/929"
            control={control}
            type="url"
            rules={Validators.url(t)}
          />
        </FormField>

        <div className="gap-2">
          <FormField
            description={t('improve.report-link-desc')}
            id="nft-asset"
            name="asset"
            label={t('improve.report-link-label')}
            error={extractStepFormError(formState, 'asset')}
          >
            <div className={styles.file_input_label}>
              <img src={FileIcon} style={{ height: 20 }} alt="file icon" />
              <Label
                htmlFor="carbon-report"
                className={`${styles.truncate_text} text-base normal-case	font-medium ml-1`}
              >
                {fileName ? fileName : t('buttons.choose-a-file')}
              </Label>
            </div>
            <TextInput
              className={styles.file_input}
              {...register('asset', Validators.documentFileSize(10, t))}
              type="file"
              accept=".pdf"
              onChange={(event) => {
                setFileName(event.target?.files?.[0].name || '');
              }}
            />
          </FormField>
        </div>
      </FormFieldGroup>
      <FormButtons handleBack={handleBack} disabled={loading} />
    </form>
  );
};
