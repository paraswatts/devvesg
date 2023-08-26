import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { NftFormValues } from 'src/api';
import { GMapContent } from 'src/common/components/google-map/GMapContent';
import { FormField, FormFieldGroup, TextHookInput } from 'src/common/forms';
import { extractStepFormError } from 'src/common/forms/error';
import { Validators } from 'src/common/forms/validators';

import FormButtons from './FormButtons';

export interface ProjectDetailsValues {
  projectCode?: string;
  projectId?: string;
  projectBatchId?: string;
  projectTicker?: string;
  geography?: string;
  locationCoordinates?: string;
}
interface FormProps {
  handleBack: () => void;
  handleNext: (values: NftFormValues) => void;
  loading: boolean | undefined;
  defaultValues: ProjectDetailsValues;
}

export const ProjectDetailsForm = ({ handleBack, handleNext, loading, defaultValues }: FormProps) => {
  const { t } = useTranslation();

  const [modalVisiblity, setModalVisiblity] = React.useState(false);

  const { control, formState, handleSubmit, trigger, setValue, setFocus } = useForm<ProjectDetailsValues>({
    shouldFocusError: true,
    mode: 'onChange',
    defaultValues: defaultValues,
  });


  const handleValidSubmit = async (values: ProjectDetailsValues) => {
    const isStepValid = await trigger();
    if (isStepValid) {
      handleNext(values);
    }
  };

  const captureLocation = (visible: boolean, coordinates?: google.maps.LatLngLiteral) => {
    if (visible) {
      setValue('locationCoordinates', `${coordinates?.lat}, ${coordinates?.lng}`, { shouldDirty: true });
      setModalVisiblity(!visible);
    } else {
      setModalVisiblity(visible);
    }
  }
  const openModal = (e: any) => {
    setModalVisiblity(true);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setFocus("geography");
  }, [setFocus]);

  return (
    <>
      <form onSubmit={handleSubmit(handleValidSubmit)}>
        <FormFieldGroup>
          <FormField
            description={t('improve.geography-desc')}
            id="nft-project-geography"
            name="geography"
            label={t('improve.geography-label')}
            error={extractStepFormError(formState, 'geography')}
            required
          >
            <TextHookInput
              placeholder={t('placeholder.inner-mongolia')}
              control={control}
              rules={Validators.required(t)}
            />
          </FormField>

          <FormField
            description={t('improve.location-desc')}
            id="nft-project-location-coordinates"
            name="locationCoordinates"
            label={t('improve.location-label')}
            error={extractStepFormError(formState, 'locationCoordinates')}
            required
          >
            <TextHookInput
              placeholder="120°17’52’’~121°37’50’’E and 47°35’21’’~48 10’13’’N"
              control={control}
              rules={Validators.required(t)}
              onClick={openModal}
              autoComplete='off'
              readOnly
            />
          </FormField>

          <FormField
            description={t('improve.project-id-desc')}
            id="nft-project-id"
            name="projectId"
            label={t('improve.project-id-label')}
            error={extractStepFormError(formState, 'projectId')}
            required
          >
            <TextHookInput placeholder="VCS 1529" control={control} rules={Validators.required(t)} />
          </FormField>

          <FormField
            description={t('improve.project-batch-id-desc')}
            id="nft-project-batch-id"
            name="projectBatchId"
            label={t('improve.project-batch-id-label')}
            error={extractStepFormError(formState, 'projectBatchId')}
            required
          >
            <TextHookInput placeholder="Batch ID 0001" control={control} rules={Validators.required(t)} />
          </FormField>

          <FormField
            description={t('improve.project-code-desc')}
            id="nft-project-code"
            name="projectCode"
            label={t('improve.project-code-label')}
            error={extractStepFormError(formState, 'projectCode')}
            required
          >
            <TextHookInput placeholder="LCO2-VCS-1529-2014" control={control} rules={Validators.required(t)} />
          </FormField>

          <FormField
            description={t('improve.project-ticker-desc')}
            id="nft-project-ticker"
            name="projectTicker"
            label={t('improve.project-ticker-label')}
            error={extractStepFormError(formState, 'projectTicker')}
            required
          >
            <TextHookInput placeholder="LCO2-MONG" control={control} rules={Validators.required(t)} />
          </FormField>
        </FormFieldGroup>
        <FormButtons handleBack={handleBack} disabled={loading} />
      </form>
      <GMapContent captureLocation={captureLocation} modalVisiblity={modalVisiblity}></GMapContent>
    </>
  );
};
