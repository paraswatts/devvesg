import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Api, ProjectTypeFetchParams, ProjectTypeNewParams, useLazyQuery } from 'src/api';
import { Checkbox } from 'src/common/forms/Checkbox';
import { FormGroup } from 'src/common/forms/FormGroup';
import { Input } from 'src/common/forms/Input';
import { Label } from 'src/common/forms/Label';
import { Textarea } from 'src/common/forms/Textarea';
import { useParams } from 'src/common/hooks';
import { Button } from 'src/common/interactions/Button';
import { Show } from 'src/common/layout';
import { ProjectType, RequirementType } from 'src/interfaces';

import fileInputStyles from 'src/common/styles/FileInput.module.scss';

import FileIcon from 'src/assets/images/file-icon.svg';

interface ProjectTypeFormProps {
  currentValues?: ProjectType;
  onSubmit: (projectType: Omit<ProjectTypeNewParams, 'initiativeUuid'>) => void;
}

export const ProjectTypeForm = React.memo((props: ProjectTypeFormProps) => {
  const { t } = useTranslation();
  const [fileName, setFileName] = useState('');

  const { currentValues, onSubmit } = props;
  const [requirementTypesSelected, setRequirementTypesSelected] = useState<string[]>([]);
  const [requirementTypes, setRequirementTypes] = useState<RequirementType[]>([]);

  const [requirementTypesQuery, requirementTypesResponse] = useLazyQuery<
    ProjectTypeFetchParams,
    { data: RequirementType[] }
  >(Api.admin.requirementType.list);
  const { projectTypeUuid, initiativeUuid } = useParams<{ projectTypeUuid: string; initiativeUuid: string }>();

  useEffect(() => {
    if (currentValues) {
      const reqSelected = currentValues.requirementTypes.map((rt) => {
        return rt.uuid;
      });
      setRequirementTypesSelected(reqSelected);
    }
  }, [setRequirementTypesSelected, currentValues]);

  useEffect(() => {
    if (projectTypeUuid && initiativeUuid) {
      requirementTypesQuery({ projectTypeUuid, initiativeUuid });
    }
  }, [requirementTypesQuery, projectTypeUuid, initiativeUuid]);

  useEffect(() => {
    if (requirementTypesResponse.response?.data) {
      setRequirementTypes(requirementTypesResponse.response!.data);
    }
  }, [requirementTypesResponse, setRequirementTypes]);

  const prepareSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const payload = {
      name: '' + data.get('name'),
      objective: '' + data.get('objective'),
      logo: data.get('logo'),
      requirementTypes: requirementTypesSelected,
    };
    onSubmit(payload);
  };

  const onChange = (value: string) => {
    let state = [...requirementTypesSelected];
    const idx = state.findIndex((val) => val === value);
    if (idx !== -1) {
      state = state.splice(idx, 1);
    } else {
      state.push(value);
    }
  };

  if (requirementTypesResponse.status !== 'resolved' && currentValues) {
    return null;
  }

  return (
    <form onSubmit={prepareSubmit}>
      <FormGroup>
        <Label htmlFor="project-type-name">{t('profile.name')}*</Label>
        <Input id="project-type-name" type="text" name="name" required defaultValue={currentValues?.name} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="project-type-objective">{t('project.objective')}*</Label>
        <Textarea
          id="project-type-objective"
          name="objective"
          required
          defaultValue={currentValues?.objective}
          rows={4}
        />
      </FormGroup>
      <FormGroup>
        <div className="grid grid-cols-6">
          <div className="col-span-3">
            <Label className="mt-4" htmlFor="project-type-logo">
              {t('profile.logo')}
            </Label>
            <div className={fileInputStyles.file_input_label} style={{ border: 'none' }}>
              <img src={FileIcon} style={{ height: 20 }} alt="file icon" />
              <Label
                htmlFor="project-type-logo"
                className={`${fileInputStyles.truncate_text} text-base normal-case	font-medium ml-1`}
              >
                {fileName ? fileName : t('buttons.choose-a-file')}
              </Label>
            </div>
            <Input
              className={fileInputStyles.file_input}
              id="project-type-logo"
              type="file"
              name="logo"
              accept=".jpg,.png,.jpeg,.gif"
              onChange={(event) => {
                setFileName(event.target?.files?.[0].name || '');
              }}
            />
          </div>
          {currentValues?.logo && currentValues.logo.length > 0 && (
            <div className="col-span-3">
              <div className="mt-4">{t('profile.current-logo')}</div>
              <div>
                <img className="max-h-40 max-w-40" src={currentValues.logo} alt="Logo" />
              </div>
            </div>
          )}
        </div>
      </FormGroup>
      <Show show={Boolean(currentValues)}>
        <FormGroup>
          <Label>{t('project.requirement-type')}*</Label>
          {requirementTypes?.map((rt) => {
            return (
              <div key={`requirement-type-${rt.uuid}`}>
                <Checkbox
                  checked={requirementTypesSelected.includes(rt.uuid) || false}
                  onChange={(event) => onChange(event.target.value)}
                />{' '}
                {rt.name}
              </div>
            );
          })}
        </FormGroup>
      </Show>
      <Button.Primary type="submit" className="uppercase">
        {t('buttons.save')}
      </Button.Primary>
    </form>
  );
});
