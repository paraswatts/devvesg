import { memo, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useNumberFmt } from 'src/common/formatters';
import { FormField, FormFieldGroup, TextInput } from 'src/common/forms';
import { noop } from 'src/common/util';
import { filterInvalidNumbers, numberValidator } from 'src/routes/clients/analyze/carbon/calculator/utils';

interface RailFormValues {
  travelMiles?: number;
}

interface RailFormProps {
  onChange: (total: number) => void;
}
export const RailForm = memo(({ onChange }: RailFormProps) => {
  const { t } = useTranslation();
  const [total, setTotal] = useState(0);
  const numberFmt = useNumberFmt({ maximumFractionDigits: 1 });
  const { register, handleSubmit, watch } = useForm<RailFormValues>({
    mode: 'onChange',
  });

  const formValues = watch();

  useEffect(() => {
    const values = filterInvalidNumbers(formValues);
    const total = railTotals(values);
    onChange(total);
    setTotal(total);
  }, [formValues, onChange]);

  return (
    <form onSubmit={handleSubmit(noop)}>
      <FormFieldGroup>
        <FormField
          id="rail-travel-miles"
          name="travelMiles"
          label={t('analyse.rail-form-travel-label')}
          description={t('analyse.miles-traveled-desc')}
        >
          <TextInput {...register('travelMiles', numberValidator)} />
        </FormField>

        <FormField id="rail-total" name="total" label={t('analyse.rail-form-travel-usage-label')}>
          <TextInput value={numberFmt(total)} disabled />
        </FormField>
      </FormFieldGroup>
    </form>
  );
});

const RAIL_TRAVEL_MILES_TO_TCO2 = 0.000114;
export const railTotals = (values: RailFormValues) => {
  return (values.travelMiles || 0) * RAIL_TRAVEL_MILES_TO_TCO2;
};
