import React from 'react';

import { useTranslation } from 'react-i18next';

import { ServiceNewParams } from 'src/api';
import { FormGroup } from 'src/common/forms/FormGroup';
import { Input } from 'src/common/forms/Input';
import { Label } from 'src/common/forms/Label';
import { Button } from 'src/common/interactions/Button';
import { Service } from 'src/interfaces';

interface ServiceFormProps {
  service?: Service;
  onSubmit: (service: ServiceNewParams) => void;
}

export const ServiceForm = React.memo((props: ServiceFormProps) => {
  const { service, onSubmit } = props;
  const { t } = useTranslation();

  const prepareSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const payload = {
      name: '' + data.get('name'),
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={prepareSubmit}>
      <FormGroup>
        <Label htmlFor="service-name">{t('profile.name')}*</Label>
        <Input id="service-name" type="text" name="name" required defaultValue={service?.name} />
      </FormGroup>

      <Button.Primary type="submit" className="uppercase">
        {t('buttons.save')}
      </Button.Primary>
    </form>
  );
});
