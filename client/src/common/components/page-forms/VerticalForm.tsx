import React from 'react';

import { useTranslation } from 'react-i18next';

import { VerticalNewParams } from 'src/api';
import { FormGroup } from 'src/common/forms/FormGroup';
import { Input } from 'src/common/forms/Input';
import { Label } from 'src/common/forms/Label';
import { Button } from 'src/common/interactions/Button';
import { Vertical } from 'src/interfaces';

interface VerticalFormProps {
  vertical?: Vertical;
  onSubmit: (vertical: VerticalNewParams) => void;
}

export const VerticalForm = React.memo((props: VerticalFormProps) => {
  const { vertical, onSubmit } = props;
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
        <Label htmlFor="vertical-name">{t('profile.name')}*</Label>
        <Input id="vertical-name" type="text" name="name" required defaultValue={vertical?.name} />
      </FormGroup>

      <Button.Primary type="submit" className="uppercase">
        {t('buttons.save')}
      </Button.Primary>
    </form>
  );
});
