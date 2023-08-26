import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { InitiativeNewParams } from 'src/api';
import { FormGroup } from 'src/common/forms/FormGroup';
import { Input } from 'src/common/forms/Input';
import { Label } from 'src/common/forms/Label';
import { Textarea } from 'src/common/forms/Textarea';
import { Button } from 'src/common/interactions/Button';
import { Show } from 'src/common/layout';

import fileInputStyles from 'src/common/styles/FileInput.module.scss';

import FileIcon from 'src/assets/images/file-icon.svg';

interface InitiativeFormProps {
  initiative?: InitiativeNewParams;
  onSubmit: (initiative: InitiativeNewParams) => void;
}

export const InitiativeForm = React.memo((props: InitiativeFormProps) => {
  const { t } = useTranslation();
  const [fileName, setFileName] = useState('');

  const { initiative, onSubmit } = props;

  const prepareSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const payload = {
      name: '' + data.get('name'),
      objective: '' + data.get('objective'),
      logo: data.get('logo'),
    };
    if (!(payload.logo as File)?.size && !initiative?.logo) {
      toast.error(t('admin.please-upload-logo'));
    } else {
      onSubmit(payload);
    }
  };

  return (
    <form onSubmit={prepareSubmit}>
      <FormGroup>
        <Label htmlFor="initiative-name">{t('profile.name')}*</Label>
        <Input id="initiative-name" type="text" name="name" required defaultValue={initiative?.name} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="initiative-objective">{t('project.objective')}*</Label>
        <Textarea id="initiative-objective" name="objective" required defaultValue={initiative?.objective} rows={4} />
      </FormGroup>
      <div className="flex align-center justify-between relative w-100">
        <FormGroup>
          <Label htmlFor="initiative-logo">{t('profile.logo')}</Label>
          <div className={fileInputStyles.file_input_label} style={{ border: 'none' }}>
            <img src={FileIcon} style={{ height: 20 }} alt="file icon" />
            <Label htmlFor="logo" className={`${fileInputStyles.truncate_text} text-base normal-case	font-medium ml-1`}>
              {fileName ? fileName : t('buttons.choose-a-file')}
            </Label>
          </div>
          <Input
            className={fileInputStyles.file_input}
            id="initiative-logo"
            type="file"
            name="logo"
            accept=".jpg,.png,.jpeg,.gif"
            onChange={(event) => {
              setFileName(event.target?.files?.[0].name || '');
            }}
          />
        </FormGroup>
        <Show show={Boolean(initiative?.logo)}>
          <div>
            <p>{t('profile.current-logo')}</p>
            <img className="max-h-40 max-w-40" src={(initiative?.logo as string) || ''} alt="Logo" />
          </div>
        </Show>
      </div>

      <Button.Primary type="submit" className="uppercase">
        {t('buttons.save')}
      </Button.Primary>
    </form>
  );
});
