import { memo, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useNumberFmt } from 'src/common/formatters';
import { FormField, FormFieldGroup, TextInput } from 'src/common/forms';
import { noop } from 'src/common/util';
import { filterInvalidNumbers, numberValidator } from 'src/routes/clients/analyze/carbon/calculator/utils';

interface HeatFormValues {
  oilGallons?: number;
  propaneGallons?: number;
  naturalGasCcf?: number;
}

interface HeatFormProps {
  onChange: (total: number) => void;
}
export const HeatForm = memo(({ onChange }: HeatFormProps) => {
  const { t } = useTranslation();
  const [total, setTotal] = useState(0);
  const numberFmt = useNumberFmt({ maximumFractionDigits: 1 });
  const { register, handleSubmit, watch } = useForm<HeatFormValues>({
    mode: 'onChange',
  });

  const formValues = watch();

  useEffect(() => {
    const values = filterInvalidNumbers(formValues);
    const total = heatTotals(values);
    onChange(total);
    setTotal(total);
  }, [formValues, onChange]);

  return (
    <form onSubmit={handleSubmit(noop)}>
      <FormFieldGroup>
        <FormField
          id="heat-oil-gallons"
          name="oilGallons"
          label={t('analyse.heat-form-oil-used-label')}
          description={t('analyse.heat-form-oil-used-desc')}
        >
          <TextInput {...register('oilGallons', numberValidator)} />
        </FormField>

        <FormField
          id="heat-propane-gallons"
          name="propaneGallons"
          label={t('analyse.heat-form-propane-used-label')}
          description={t('analyse.heat-form-propane-used-desc')}
        >
          <TextInput {...register('propaneGallons', numberValidator)} />
        </FormField>

        <FormField
          id="heat-natural-gas-ccf"
          name="naturalGasCcf"
          label={t('analyse.heat-form-natural-gas-used-label')}
          description={t('analyse.heat-form-natural-gas-used-desc')}
        >
          <TextInput {...register('naturalGasCcf', numberValidator)} />
        </FormField>

        <FormField id="heat-total" name="total" label={t('analyse.heat-form-heating-usage-label')}>
          <TextInput value={numberFmt(total)} disabled />
        </FormField>
      </FormFieldGroup>
    </form>
  );
});

const OIL_GALLONS_TO_TCO2 = 0.01016;
const PROPANE_GALLONS_TO_TCO2 = 0.00576;
const NATURAL_GAS_CCF_TO_TCO2 = 0.00531;
export const heatTotals = (values: HeatFormValues) => {
  return (
    (values.oilGallons || 0) * OIL_GALLONS_TO_TCO2 +
    (values.propaneGallons || 0) * PROPANE_GALLONS_TO_TCO2 +
    (values.naturalGasCcf || 0) * NATURAL_GAS_CCF_TO_TCO2
  );
};
