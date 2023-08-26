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

interface ShippingFormValues {
  airShipments?: number;
  airAverageWeight?: number;
  airAverageDistance?: number;

  groundShipments?: number;
  groundAverageWeight?: number;
  groundAverageDistance?: number;

  oceanShipments?: number;
  oceanAverageWeight?: number;
  oceanAverageDistance?: number;
}

interface ShippingFormProps {
  onChange: (total: number) => void;
}
export const ShippingForm = memo(({ onChange }: ShippingFormProps) => {
  const { t } = useTranslation();

  const [total, setTotal] = useState(0);
  const numberFmt = useNumberFmt({ maximumFractionDigits: 1 });
  const { register, handleSubmit, watch, formState, trigger } = useForm<ShippingFormValues>({
    mode: 'all',
  });

  const myFormState: FormState<ShippingFormValues> = {
    errors: formState.errors,
    isSubmitted: true,
  } as FormState<ShippingFormValues>;

  const formValues = watch();

  useEffect(() => {
    const values = filterInvalidNumbers(formValues);
    const total = shippingTotals(values);
    onChange(total);
    setTotal(total);
  }, [formValues, onChange]);

  const AIR_ERROR = t('analyse.shipping-form-air-error');
  const GROUND_ERROR = t('analyse.shipping-form-ground-error');
  const OCEAN_ERROR = t('analyse.shipping-form-ocean-error');

  useEffect(() => {
    //trigger form rerender on language change for errors
    trigger();
  }, [t, trigger]);

  return (
    <form onSubmit={handleSubmit(noop)}>
      <FormFieldGroup>
        <FormField
          id="air-shipments"
          name="airShipments"
          label={t('analyse.shipping-form-air-number-label')}
          description={t('analyse.shipping-form-number-of-shipments')}
          error={extractHookError(myFormState, 'airShipments')}
        >
          <TextInput
            {...register('airShipments', {
              ...numberValidator,
              ...validateDependentField([formValues.airAverageWeight, formValues.airAverageDistance], AIR_ERROR),
              deps: ['airAverageWeight', 'airAverageDistance'],
            })}
          />
        </FormField>

        <FormField
          id="air-shipment-average-weight"
          name="airAverageWeight"
          label={t('analyse.shipping-form-air-weight-label')}
          description={t('analyse.shipping-form-weight-desc')}
          error={extractHookError(myFormState, 'airAverageWeight')}
        >
          <TextInput
            {...register('airAverageWeight', {
              ...numberValidator,
              ...validateDependentField([formValues.airShipments, formValues.airAverageDistance], AIR_ERROR),
              deps: ['airShipments', 'airAverageDistance'],
            })}
          />
        </FormField>

        <FormField
          id="air-shipment-average-distance"
          name="airAverageDistance"
          label={t('analyse.shipping-form-air-distance-label')}
          description={t('analyse.shipping-form-distance-desc')}
          error={extractHookError(myFormState, 'airAverageDistance')}
        >
          <TextInput
            {...register('airAverageDistance', {
              ...numberValidator,
              ...validateDependentField([formValues.airShipments, formValues.airAverageWeight], AIR_ERROR),
              deps: ['airShipments', 'airAverageWeight'],
            })}
          />
        </FormField>

        <div className="my-2" />

        <FormField
          id="ground-shipments"
          name="groundShipments"
          label={t('analyse.shipping-form-ground-number-label')}
          description={t('analyse.shipping-form-number-of-shipments')}
          error={extractHookError(myFormState, 'groundShipments')}
        >
          <TextInput
            {...register('groundShipments', {
              ...numberValidator,
              ...validateDependentField(
                [formValues.groundAverageWeight, formValues.groundAverageDistance],
                GROUND_ERROR,
              ),
              deps: ['groundAverageWeight', 'groundAverageDistance'],
            })}
          />
        </FormField>

        <FormField
          id="ground-shipment-average-weight"
          name="groundAverageWeight"
          label={t('analyse.shipping-form-ground-weight-label')}
          description={t('analyse.shipping-form-weight-desc')}
          error={extractHookError(myFormState, 'groundAverageWeight')}
        >
          <TextInput
            {...register('groundAverageWeight', {
              ...numberValidator,
              ...validateDependentField([formValues.groundShipments, formValues.groundAverageDistance], GROUND_ERROR),
              deps: ['groundShipments', 'groundAverageDistance'],
            })}
          />
        </FormField>

        <FormField
          id="ground-shipment-average-distance"
          name="groundAverageDistance"
          label={t('analyse.shipping-form-ground-distance-label')}
          description={t('analyse.shipping-form-distance-desc')}
          error={extractHookError(myFormState, 'groundAverageDistance')}
        >
          <TextInput
            {...register('groundAverageDistance', {
              ...numberValidator,
              ...validateDependentField([formValues.groundShipments, formValues.groundAverageWeight], GROUND_ERROR),
              deps: ['groundShipments', 'groundAverageWeight'],
            })}
          />
        </FormField>

        <div className="my-2" />

        <FormField
          id="ocean-shipments"
          name="oceanShipments"
          label={t('analyse.shipping-form-ocean-number-label')}
          description={t('analyse.shipping-form-number-of-shipments')}
          error={extractHookError(myFormState, 'oceanShipments')}
        >
          <TextInput
            {...register('oceanShipments', {
              ...numberValidator,
              ...validateDependentField([formValues.oceanAverageWeight, formValues.oceanAverageDistance], OCEAN_ERROR),
              deps: ['oceanAverageWeight', 'oceanAverageDistance'],
            })}
          />
        </FormField>

        <FormField
          id="ocean-shipment-average-weight"
          name="oceanAverageWeight"
          label={t('analyse.shipping-form-ocean-weight-label')}
          description={t('analyse.shipping-form-weight-desc')}
          error={extractHookError(myFormState, 'oceanAverageWeight')}
        >
          <TextInput
            {...register('oceanAverageWeight', {
              ...numberValidator,
              ...validateDependentField([formValues.oceanShipments, formValues.oceanAverageDistance], OCEAN_ERROR),
              deps: ['oceanShipments', 'oceanAverageDistance'],
            })}
          />
        </FormField>

        <FormField
          id="ocean-shipment-average-distance"
          name="oceanAverageDistance"
          label={t('analyse.shipping-form-ocean-distance-label')}
          description={t('analyse.shipping-form-distance-desc')}
          error={extractHookError(myFormState, 'oceanAverageDistance')}
        >
          <TextInput
            {...register('oceanAverageDistance', {
              ...numberValidator,
              ...validateDependentField([formValues.oceanShipments, formValues.oceanAverageWeight], OCEAN_ERROR),
              deps: ['oceanShipments', 'oceanAverageWeight'],
            })}
          />
        </FormField>

        <FormField id="shipping-total" name="total" label={t('analyse.shipping-form-total-label')}>
          <TextInput value={numberFmt(total)} disabled />
        </FormField>
      </FormFieldGroup>
    </form>
  );
});

const AIR_PER_TON_MILE_TCO2 = 0.000000531611;
const GROUND_PER_TON_MILE_TCO2 = 0.000000096615;
const OCEAN_PER_TON_MILE_TCO2 = 0.000000016692;
export const shippingTotals = (values: ShippingFormValues) => {
  let air = 0;
  const { airShipments, airAverageWeight, airAverageDistance } = values;
  if (canCalculateGroup(airShipments, airAverageWeight, airAverageDistance)) {
    air = airShipments! * airAverageWeight! * airAverageDistance! * AIR_PER_TON_MILE_TCO2;
  }

  let ground = 0;
  const { groundShipments, groundAverageWeight, groundAverageDistance } = values;
  if (canCalculateGroup(groundShipments, groundAverageWeight, groundAverageDistance)) {
    ground = groundShipments! * groundAverageWeight! * groundAverageDistance! * GROUND_PER_TON_MILE_TCO2;
  }

  let ocean = 0;
  const { oceanShipments, oceanAverageWeight, oceanAverageDistance } = values;
  if (canCalculateGroup(oceanShipments, oceanAverageWeight, oceanAverageDistance)) {
    ocean = oceanShipments! * oceanAverageWeight! * oceanAverageDistance! * OCEAN_PER_TON_MILE_TCO2;
  }

  return air + ground + ocean;
};
