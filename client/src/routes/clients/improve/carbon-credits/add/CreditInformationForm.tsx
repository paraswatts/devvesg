import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Api, NftFormValues, useLazyQuery } from 'src/api';
import { FormField, FormFieldGroup, SingleSelectHookInput, TextHookInput } from 'src/common/forms';
import { extractStepFormError } from 'src/common/forms/error';
import { Validators } from 'src/common/forms/validators';
import { CreditType } from 'src/interfaces';

import FormButtons from './FormButtons';
export interface CreditInformationValues {
  creditType?: { uuid: string; type?: string };
  projectVintage?: string;
  creditCount?: string;
  creditTypeUuid?: string;
}
interface FormProps {
  handleBack: () => void;
  handleNext: (values: NftFormValues) => void;
  loading: boolean | undefined;
  defaultValues: CreditInformationValues;
}

export const CreditInformationForm = ({ handleBack, handleNext, loading, defaultValues }: FormProps) => {
  const { t } = useTranslation();
  const { control, formState, handleSubmit, trigger } = useForm<CreditInformationValues>({
    shouldFocusError: true,
    mode: 'onChange',
    shouldUnregister: false,
    defaultValues: defaultValues,
  });

  const [creditTypes, setCreditTypes] = useState<{ label: string; value: string }[]>([]);
  const [creditTypesQuery, creditTypesResponse] = useLazyQuery<null, { data: CreditType[] }>(Api.creditType.list, {
    onSuccess: (response) =>
      setCreditTypes(response.data.map((creditType) => ({ value: creditType.uuid, label: creditType.name }))),
  });

  useEffect(() => {
    creditTypesQuery(null);
  }, [creditTypesQuery]);

  const handleValidSubmit = async (values: CreditInformationValues) => {
    const isStepValid = await trigger();
    if (isStepValid) {
      values = { ...values, creditType: { uuid: values.creditTypeUuid || '' } };
      handleNext(values);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)}>
      <FormFieldGroup>
        <FormField
          id="nft-credit-type"
          name="creditTypeUuid"
          label={t('improve.type-label')}
          error={extractStepFormError(formState, 'creditTypeUuid')}
          description={t('improve.type-desc')}
          required
        >
          <SingleSelectHookInput
            control={control}
            rules={Validators.required(t)}
            loading={creditTypesResponse.status === 'loading'}
            options={creditTypes}
            placeholder={t('placeholder.select')}
          />
        </FormField>

        <FormField
          description={t('improve.vintage-desc')}
          id="nft-project-vintage"
          name="projectVintage"
          label={t('improve.vintage-label')}
          error={extractStepFormError(formState, 'projectVintage')}
          required
        >
          <TextHookInput type={'number'} placeholder="2014" min="1900" control={control} rules={Validators.required(t)} />
        </FormField>

        <FormField
          description={t('improve.credit-count-desc')}
          id="nft-credit-count"
          name="creditCount"
          label={t('improve.carbon-credit-count-label')}
          error={extractStepFormError(formState, 'creditCount')}
          required
        >
          <TextHookInput type={'number'} placeholder="12,000" min="1" control={control} rules={Validators.required(t)} />
        </FormField>
      </FormFieldGroup>
      <FormButtons handleBack={handleBack} disabled={loading} />
    </form>
  );
};
