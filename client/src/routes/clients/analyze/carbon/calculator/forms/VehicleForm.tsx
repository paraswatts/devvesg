import { memo, useEffect, useState } from 'react';

import { FormState, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useNumberFmt } from 'src/common/formatters';
import { FormField, FormFieldGroup, TextInput } from 'src/common/forms';
import { extractHookError } from 'src/common/forms/error';
import { noop } from 'src/common/util';
import {
  canCalculateGroup,
  filterInvalidNumbers,
  numberValidator,
  validateDependentField,
} from 'src/routes/clients/analyze/carbon/calculator/utils';

interface VehicleFormValues {
  dieselMilesPerGallon?: number;
  dieselMiles?: number;
  gasolineMilesPerGallon?: number;
  gasolineMiles?: number;
}

interface VehicleFormProps {
  onChange: (total: number) => void;
}
export const VehicleForm = memo(({ onChange }: VehicleFormProps) => {
  const { t } = useTranslation();

  const [total, setTotal] = useState(0);
  const numberFmt = useNumberFmt({ maximumFractionDigits: 1 });
  const { register, handleSubmit, watch, formState, trigger } = useForm<VehicleFormValues>({
    mode: 'all',
  });

  const DIESEL_ERROR = t('analyse.vehicle-form-diesel-error');
  const GASOLINE_ERROR = t('analyse.vehicle-form-gasoline-error');

  const myFormState: FormState<VehicleFormValues> = {
    errors: formState.errors,
    isSubmitted: true,
  } as FormState<VehicleFormValues>;

  const formValues = watch();

  useEffect(() => {
    const values = filterInvalidNumbers(formValues);
    const total = vehicleTotals(values);
    onChange(total);
    setTotal(total);
  }, [formValues, onChange]);

  useEffect(() => {
    //trigger form rerender on language change for errors
    trigger();
  }, [t, trigger]);

  return (
    <form onSubmit={handleSubmit(noop)}>
      <FormFieldGroup>
        <FormField
          id="vehicle-diesel-miles-per-gallon"
          name="dieselMilesPerGallon"
          label={t('analyse.vehicle-form-diesel-used-label')}
          description={t('analyse.vehicle-form-diesel-used-desc')}
          error={extractHookError(myFormState, 'dieselMilesPerGallon')}
        >
          <TextInput
            {...register('dieselMilesPerGallon', {
              ...numberValidator,
              ...validateDependentField([formValues.dieselMiles], DIESEL_ERROR),
              deps: ['dieselMiles'],
            })}
          />
        </FormField>

        <FormField
          id="vehicle-diesel-miles"
          name="dieselMiles"
          label={t('analyse.vehicle-form-diesel-driven-label')}
          description={t('analyse.vehicle-form-driven-desc')}
          error={extractHookError(myFormState, 'dieselMiles')}
        >
          <TextInput
            {...register('dieselMiles', {
              ...numberValidator,
              ...validateDependentField([formValues.dieselMilesPerGallon], DIESEL_ERROR),
              deps: ['dieselMilesPerGallon'],
            })}
          />
        </FormField>

        <div className="my-2" />

        <FormField
          id="vehicle-gasoline-miles-per-gallon"
          name="gasolineMilesPerGallon"
          label={t('analyse.vehicle-form-gasoline-used-label')}
          description={t('analyse.vehicle-form-gasoline-used-desc')}
          error={extractHookError(myFormState, 'gasolineMilesPerGallon')}
        >
          <TextInput
            {...register('gasolineMilesPerGallon', {
              ...numberValidator,
              ...validateDependentField([formValues.gasolineMiles], GASOLINE_ERROR),
              deps: ['gasolineMiles'],
            })}
          />
        </FormField>

        <FormField
          id="vehicle-gasoline-miles"
          name="gasolineMiles"
          label={t('analyse.vehicle-form-gasoline-driven-label')}
          description={t('analyse.vehicle-form-driven-desc')}
          error={extractHookError(myFormState, 'gasolineMiles')}
        >
          <TextInput
            {...register('gasolineMiles', {
              ...numberValidator,
              ...validateDependentField([formValues.gasolineMilesPerGallon], GASOLINE_ERROR),
              deps: ['gasolineMilesPerGallon'],
            })}
          />
        </FormField>

        <FormField id="vehicle-total" name="total" label={t('analyse.vehicle-form-heating-usage-label')}>
          <TextInput value={numberFmt(total)} disabled />
        </FormField>
      </FormFieldGroup>
    </form>
  );
});

const DIESEL_GALLON_TO_TCO2 = 0.01021;
const GASOLINE_GALLON_TO_TCO2 = 0.00878;
export const vehicleTotals = (values: VehicleFormValues) => {
  let diesel = 0;
  if (canCalculateGroup(values.dieselMiles, values.dieselMilesPerGallon)) {
    diesel = (values.dieselMiles! / values.dieselMilesPerGallon!) * DIESEL_GALLON_TO_TCO2;
  }

  let gasoline = 0;
  if (canCalculateGroup(values.gasolineMiles, values.gasolineMilesPerGallon)) {
    gasoline = (values.gasolineMiles! / values.gasolineMilesPerGallon!) * GASOLINE_GALLON_TO_TCO2;
  }

  return diesel + gasoline;
};
