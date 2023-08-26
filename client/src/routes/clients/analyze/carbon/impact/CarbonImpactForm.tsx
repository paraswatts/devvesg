import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, generatePath } from 'react-router-dom';

import { FormField, FormFieldGroup, TextInput } from 'src/common/forms';
import { extractHookError } from 'src/common/forms/error';
import { Validators } from 'src/common/forms/validators';
import { Button } from 'src/common/interactions/Button';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

export interface CarbonImpactFormValues {
  total: number;
}

interface CarbonImpactFormProps {
  loading?: boolean;
  resetTrigger?: Date;
  onSubmit: (values: CarbonImpactFormValues) => void;
}
export const CarbonImpactForm = ({ loading, resetTrigger, onSubmit }: CarbonImpactFormProps) => {
  const { client } = useClient();
  const { t } = useTranslation();
  const { formState, reset, register, handleSubmit, trigger } = useForm<CarbonImpactFormValues>();

  useEffect(() => {
    if (resetTrigger) {
      reset(undefined);
    }
  }, [reset, resetTrigger]);

  useEffect(() => {
    trigger();
  }, [t, trigger]);

  const disabled = loading || (formState.isSubmitted && !formState.isValid);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldGroup>
        <FormField
          id="carbon-impact-total"
          name="total"
          label={t('analyse.emissions-known-label')}
          description={t('analyse.emissions-known-desc')}
          error={extractHookError(formState, 'total')}
        >
          <TextInput
            {...register('total', {
              ...Validators.required(t),
              validate: (value) => {
                if (isNaN(value) || value <= 0) {
                  return t('warnings.greater-than-0');
                }
              },
              valueAsNumber: true,
            })}
          />
        </FormField>

        <div className="flex items-center gap-6">
          <Button.Primary type="submit" disabled={disabled}>
            {t('global.save-result')}
          </Button.Primary>
          <Link to={generatePath(ClientAbsoluteRoutes.REDUCE_IMPACT, { clientUuid: client.uuid })}>
            {t('launchpad.reduce-impact')}
          </Link>
        </div>
      </FormFieldGroup>
    </form>
  );
};
