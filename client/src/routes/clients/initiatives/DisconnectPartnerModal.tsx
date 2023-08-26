import React from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormField, FormFieldGroup, TextAreaHookInput } from 'src/common/forms';
import { extractHookError } from 'src/common/forms/error';
import { Validators } from 'src/common/forms/validators';
import { Button } from 'src/common/interactions/Button';

interface DisconnectPartnerModalProps {
  onCancel: () => void;
  onConfirm: (reason: string) => void;
  loading: boolean;
}

interface DisconnectPartnerFormValues {
  reason: string;
}

export const DisconnectPartnerModal = React.memo((props: DisconnectPartnerModalProps) => {
  const { t } = useTranslation();

  const { loading, onCancel, onConfirm } = props;

  const handleValidSubmit = (value: DisconnectPartnerFormValues) => {
    const { reason } = value;
    onConfirm(reason);
  };

  const { control, formState, handleSubmit } = useForm<DisconnectPartnerFormValues>({
    defaultValues: {
      reason: '',
    },
  });

  const disabled = loading || (formState.isSubmitted && !formState.isValid);

  return (
    <div className="grid grid-cols-1">
      <form onSubmit={handleSubmit(handleValidSubmit)}>
        <div className="mb-4">{t('project.disconnect-partner')}.</div>
        <FormFieldGroup>
          <FormField
            id="reason"
            name="reason"
            label={t('project.reason')}
            required
            error={extractHookError(formState, 'reason')}
            description={t('project.please-describe-reason')}
          >
            <TextAreaHookInput
              control={control}
              rules={{ ...Validators.maxLength(360, t('warnings.must-be-360-characters')), ...Validators.required(t) }}
            />
          </FormField>
        </FormFieldGroup>
        <div className="flex justify-center mt-2">
          <Button.Primary type="button" className="mr-4" onClick={() => onCancel()}>
            {t('buttons.nevermind')}
          </Button.Primary>
          <Button.Warning type="submit" disabled={disabled}>
            {t('buttons.confirm')}
          </Button.Warning>
        </div>
      </form>
    </div>
  );
});
