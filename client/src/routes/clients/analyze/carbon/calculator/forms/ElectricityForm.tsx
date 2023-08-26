import { memo, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useNumberFmt } from 'src/common/formatters';
import { FormField, FormFieldGroup, TextInput } from 'src/common/forms';
import { noop } from 'src/common/util';
import { filterInvalidNumbers, numberValidator } from 'src/routes/clients/analyze/carbon/calculator/utils';

interface ElectricityFormValues {
  annualEnergyUsage?: number;
}

interface ElectricityFormProps {
  onChange: (total: number) => void;
}
export const ElectricityForm = memo(({ onChange }: ElectricityFormProps) => {
  const { t } = useTranslation();

  const [total, setTotal] = useState(0);
  const numberFmt = useNumberFmt({ maximumFractionDigits: 1 });
  const { register, handleSubmit, watch } = useForm<ElectricityFormValues>({
    mode: 'onChange',
  });

  const formValues = watch();

  useEffect(() => {
    const values = filterInvalidNumbers(formValues);
    const total = electricityTotals(values);
    onChange(total);
    setTotal(total);
  }, [formValues, onChange]);

  return (
    <form onSubmit={handleSubmit(noop)}>
      <FormFieldGroup>
        <FormField
          id="electricity-annual-energy-usage"
          name="annualEnergyUsage"
          label={t('analyse.electricity-form-label')}
          description={t('analyse.electricity-form-desc')}
        >
          <TextInput {...register('annualEnergyUsage', numberValidator)} />
        </FormField>

        <FormField id="electricity-total" name="total" label={t('analyse.electricity-form-total-label')}>
          <TextInput value={numberFmt(total)} disabled />
        </FormField>
      </FormFieldGroup>
    </form>
  );
});

const KWH_TO_TCO2 = 0.0004011;
export const electricityTotals = (values: ElectricityFormValues) => {
  return (values.annualEnergyUsage || 0) * KWH_TO_TCO2;
};
