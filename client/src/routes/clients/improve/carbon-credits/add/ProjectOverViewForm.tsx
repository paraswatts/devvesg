import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { NftFormValues } from 'src/api';
import { DatePickerHookInput, FormField, FormFieldGroup, TextAreaHookInput, TextHookInput } from 'src/common/forms';
import { extractStepFormError } from 'src/common/forms/error';
import { Validators } from 'src/common/forms/validators';

import FormButtons from './FormButtons';

export interface ProjectOverviewValues {
  projectFromDate?: Date;
  projectToDate?: Date;
  projectName?: string;
  projectDescription?: string;
  projectActivity?: string;
}

interface FormProps {
  handleBack: () => void;
  handleNext: (values: NftFormValues) => void;
  loading: boolean | undefined;
  defaultValues: ProjectOverviewValues;
}
export const ProjectOverViewForm = ({ handleBack, handleNext, loading, defaultValues }: FormProps) => {
  const { t } = useTranslation();

  const { control, formState, handleSubmit, watch, trigger, setFocus } = useForm<ProjectOverviewValues>({
    shouldFocusError: true,
    mode: 'onChange',
    defaultValues: defaultValues,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setFocus("projectName");
  }, [setFocus]);

  const toDate = watch('projectToDate');

  const handleValidSubmit = async (values: ProjectOverviewValues) => {
    const isStepValid = await trigger();
    if (isStepValid) {
      handleNext(values);
    }
  };

  const projectDescLength = watch('projectDescription')?.length || 0;
  const projectActLength = watch('projectActivity')?.length || 0;

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)}>
      <FormFieldGroup>
        <FormField
          description={t('improve.project-name-desc')}
          id="nft-project-name"
          name="projectName"
          label={t('project.project-name')}
          error={extractStepFormError(formState, 'projectName')}
          required
        >
          <TextHookInput
            type="text"
            placeholder={t('placeholder.energy-efficiency')}
            control={control}
            rules={Validators.required(t)}
          />
        </FormField>

        <FormField
          description={t('improve.project-description-desc')}
          rightText={`${projectDescLength}/200`}
          id="nft-project-description"
          name="projectDescription"
          label={t('improve.project-description')}
          error={extractStepFormError(formState, 'projectDescription')}
          required
        >
          <TextAreaHookInput
            placeholder={t('placeholder.project-area-has')}
            control={control}
            rules={Validators.required(t)}
            maxLength={200}
            minLength={10}
          />
        </FormField>

        <FormField
          description={t('improve.project-activity-desc')}
          rightText={`${projectActLength}/200`}
          id="nft-project-activity"
          name="projectActivity"
          label={t('improve.project-activity')}
          error={extractStepFormError(formState, 'projectActivity')}
          required
        >
          <TextAreaHookInput
            placeholder={t('placeholder.project-will')}
            control={control}
            rules={Validators.required(t)}
            maxLength={200}
            minLength={10}
          />
        </FormField>

        <FormField
          description={t('improve.project-start-date-desc')}
          label={t('improve.project-start-date')}
          id="nft-project-from-date"
          name="projectFromDate"
          error={extractStepFormError(formState, 'projectFromDate')}
        >
          <DatePickerHookInput
            autoComplete='off'
            placeholderText="MM-DD-YYYY"
            control={control}
            isClearable
            rules={Validators.compareDates(t, toDate)}
          />
        </FormField>

        <FormField
          description={t('improve.project-end-date-desc')}
          label={t('improve.project-end-date')}
          id="nft-project-to-date"
          name="projectToDate"
          error={extractStepFormError(formState, 'projectToDate')}
        >
          <DatePickerHookInput
            autoComplete='off'
            placeholderText="MM-DD-YYYY"
            control={control}
            isClearable
            rules={Validators.required(t)}
          />
        </FormField>
      </FormFieldGroup>
      <FormButtons handleBack={handleBack} disabled={loading} />
    </form>
  );
};
