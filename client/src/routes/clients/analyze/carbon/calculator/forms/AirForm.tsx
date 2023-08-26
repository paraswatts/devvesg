import { memo, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useNumberFmt } from 'src/common/formatters';
import { FormField, FormFieldGroup, TextInput } from 'src/common/forms';
import { noop } from 'src/common/util';
import { filterInvalidNumbers, numberValidator } from 'src/routes/clients/analyze/carbon/calculator/utils';

interface AirFormValues {
  travelMiles?: number;
}

interface AirFormProps {
  onChange: (total: number) => void;
}
export const AirForm = memo(({ onChange }: AirFormProps) => {
  const { t } = useTranslation();

  const [total, setTotal] = useState(0);
  const numberFmt = useNumberFmt({ maximumFractionDigits: 1 });
  const { register, handleSubmit, watch } = useForm<AirFormValues>({
    mode: 'onChange',
  });

  const formValues = watch();

  useEffect(() => {
    const values = filterInvalidNumbers(formValues);
    const total = airTotals(values);
    onChange(total);
    setTotal(total);
  }, [formValues, onChange]);

  return (
    <form onSubmit={handleSubmit(noop)}>
      <FormFieldGroup>
        <FormField
          id="air-travel-miles"
          name="travelMiles"
          label={t('analyse.air-form-travel-label')}
          description={t('analyse.miles-traveled-desc')}
        >
          <TextInput {...register('travelMiles', numberValidator)} />
        </FormField>

        <FormField id="air-total" name="total" label={t('analyse.air-form-travel-usage-label')}>
          <TextInput value={numberFmt(total)} disabled />
        </FormField>
      </FormFieldGroup>
    </form>
  );
});

const AIR_TRAVEL_MILES_TO_TCO2 = 0.0002;
export const airTotals = (values: AirFormValues) => {
  return (values.travelMiles || 0) * AIR_TRAVEL_MILES_TO_TCO2;
};
