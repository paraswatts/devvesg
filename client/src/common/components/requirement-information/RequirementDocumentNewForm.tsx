import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { RequirementDocumentNewParams } from 'src/api';
import { FormField, FormFieldGroup, SelectHookInput, TextHookInput, TextInput } from 'src/common/forms';
import { extractHookError } from 'src/common/forms/error';
import { Label } from 'src/common/forms/Label';
import { Validators } from 'src/common/forms/validators';
import { Button } from 'src/common/interactions/Button';
import { RequirementDocumentTypes } from 'src/interfaces';

import fileInputStyles from 'src/common/styles/FileInput.module.scss';

import FileIcon from 'src/assets/images/file-icon.svg';

interface RequirementDocumentNewFormProps {
  onSubmit: (payload: Omit<RequirementDocumentNewParams, 'partnerUuid' | 'requirementUuid'>) => void;
  loading?: boolean;
}

interface RequirementDocumentNewFormValues {
  name: string;
  type: RequirementDocumentTypes;
  file?: FileList;
  url: string;
}

export const RequirementDocumentNewForm = React.memo((props: RequirementDocumentNewFormProps) => {
  const { loading, onSubmit } = props;
  const { t } = useTranslation();
  const [fileName, setFileName] = useState('');
  const { control, handleSubmit, formState, register, setValue, trigger, watch } =
    useForm<RequirementDocumentNewFormValues>({
      defaultValues: { name: '', type: RequirementDocumentTypes.FILE, file: undefined, url: '' },
    });

  const type = watch('type');

  useEffect(() => {
    setValue('file', undefined);
    setValue('url', '');
    trigger(['url', 'file']);
  }, [type, setValue, trigger]);

  const handleValidSubmit = (values: RequirementDocumentNewFormValues) => {
    const { file, type, url, ...rest } = values;
    let fileToSave = undefined;
    if (type === RequirementDocumentTypes.FILE && file instanceof FileList) {
      if (file.length > 0) {
        fileToSave = file[0];
      }
    }

    const payload = {
      name: rest.name,
      type,
      file: fileToSave || url,
    };

    onSubmit(payload as Omit<RequirementDocumentNewParams, 'clientUuid' | 'projectUuid' | 'requirementUuid'>);
  };

  const disabled = loading || (formState.isSubmitted && !formState.isValid);

  return (
    <div>
      <h2 className="font-bold">{t('project.new-document')}</h2>
      <form onSubmit={handleSubmit(handleValidSubmit)}>
        <FormFieldGroup>
          <FormField
            id="name"
            name="name"
            label={t('profile.name')}
            required
            error={extractHookError(formState, 'name')}
          >
            <TextHookInput control={control} rules={Validators.required(t)} />
          </FormField>
          <FormField id="type" name="type" label={t('improve.type-label')}>
            <SelectHookInput control={control}>
              <option value={RequirementDocumentTypes.FILE}>{t('project.file')}</option>
              <option value={RequirementDocumentTypes.URL}>URL</option>
            </SelectHookInput>
          </FormField>
          {type === RequirementDocumentTypes.FILE && (
            <div className=" relative">
              <FormField
                id="file"
                name="file"
                label={t('project.file')}
                description={t('project.file-desc')}
                required
                error={extractHookError(formState, 'file')}
              >
                <div className={fileInputStyles.file_input_label}>
                  <img src={FileIcon} style={{ height: 20 }} alt="file icon" />
                  <Label
                    htmlFor="requirement-doc"
                    className={`${fileInputStyles.truncate_text} text-base normal-case	font-medium ml-1`}
                  >
                    {fileName ? fileName : t('buttons.choose-a-file')}
                  </Label>
                </div>
                <TextInput
                  className={fileInputStyles.file_input}
                  {...register('file', Validators.documentFileSize(5, t))}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(event) => {
                    setFileName(event.target?.files?.[0].name || '');
                  }}
                />
              </FormField>
            </div>
          )}

          {type === RequirementDocumentTypes.URL && (
            <FormField id="url" name="url" label="URL" required error={extractHookError(formState, 'url')}>
              <TextHookInput control={control} rules={Validators.url(t)} />
            </FormField>
          )}
        </FormFieldGroup>
        <div className="mt-4">
          <Button.Primary type="submit" disabled={disabled}>
            {t('buttons.save')}
          </Button.Primary>
        </div>
      </form>
    </div>
  );
});
