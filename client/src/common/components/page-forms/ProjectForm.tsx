import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';

import { Api, ProjectNewParams, useLazyQuery } from 'src/api';
import { FormGroup } from 'src/common/forms/FormGroup';
import { Input } from 'src/common/forms/Input';
import { Label } from 'src/common/forms/Label';
import { Select } from 'src/common/forms/Select';
import { Textarea } from 'src/common/forms/Textarea';
import { Button } from 'src/common/interactions/Button';
import { Show } from 'src/common/layout';
import { Initiative, Project, ProjectRequirementStatuses, ProjectType } from 'src/interfaces';

interface ProjectFormProps {
  project?: Project;
  initiatives?: Initiative[];
  onSubmit: (project: Omit<ProjectNewParams, 'clientUuid' | 'projectTypeUuid'>, projectTypeUuid?: string) => void;
}

export const ProjectForm = React.memo((props: ProjectFormProps) => {
  const { t } = useTranslation();
  const { project, initiatives, onSubmit } = props;

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endGoalDate, setEndGoalDate] = useState<Date | null>(null);
  const [completionDate, setCompletionDate] = useState<Date | null>(null);
  const [selectedInitiativeUuid, setSelectedInitiativeUuid] = useState<string>();
  const [projectTypesQuery, projectTypesResponse] = useLazyQuery<{ initiativeUuid: string }, { data: ProjectType[] }>(
    Api.projectType.list,
  );

  useEffect(() => {
    if (project) {
      if (project.startDate) {
        setStartDate(new Date(project.startDate));
      }
      if (project.endGoalDate) {
        setEndGoalDate(new Date(project.endGoalDate));
      }
      if (project.completionDate) {
        setCompletionDate(new Date(project.completionDate));
      }
    }
  }, [project]);

  useEffect(() => {
    if (selectedInitiativeUuid) {
      projectTypesQuery({ initiativeUuid: selectedInitiativeUuid });
    }
  }, [projectTypesQuery, selectedInitiativeUuid]);

  const onSelectInitiative = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedInitiativeUuid(event.target.value);
  };

  const prepareSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const payload: ProjectNewParams | Omit<ProjectNewParams, 'clientUuid' | 'projectTypeUuid'> = {
      name: '' + data.get('name'),
      description: '' + data.get('description'),
      status: ('' + data.get('status')) as ProjectRequirementStatuses,
    };
    payload.startDate = startDate;
    payload.endGoalDate = endGoalDate;
    payload.completionDate = completionDate;
    let uuid;
    if (!project) {
      uuid = '' + data.get('project-type-uuid');
    }
    onSubmit(payload, uuid);
  };

  const projectTypes = projectTypesResponse.response?.data || [];

  return (
    <form onSubmit={prepareSubmit}>
      <FormGroup>
        <Label htmlFor="project-name">{t('profile.name')}*</Label>
        <Input id="project-name" type="text" name="name" required defaultValue={project?.name} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="project-description">{t('profile.description')}*</Label>
        <Textarea id="project-description" name="description" required rows={4} defaultValue={project?.description} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="project-status">{t('project.status')}*</Label>
        <Select id="project-status" name="status" required defaultValue={project?.status}>
          <option value={ProjectRequirementStatuses.NOT_STARTED}>{t('project.not-started')}</option>
          <option value={ProjectRequirementStatuses.IN_PROGRESS}>{t('project.in-progress')}</option>
          <option value={ProjectRequirementStatuses.DONE}>{t('project.done')}</option>
          <option value={ProjectRequirementStatuses.ON_HOLD}>{t('project.on-hold')}</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="project-start-date">{t('project.start-date')}</Label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          isClearable
          className="block w-full p-4 border-gray-500 rounded"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="project-end-goal-date">{t('project.end-goal-date')}</Label>
        <DatePicker
          selected={endGoalDate}
          onChange={(date: Date) => setEndGoalDate(date)}
          isClearable
          className="block w-full p-4 border-gray-500 rounded"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="project-completion-date">{t('project.completion-date')}</Label>
        <DatePicker
          selected={completionDate}
          onChange={(date: Date) => setCompletionDate(date)}
          isClearable
          className="block w-full p-4 border-gray-500 rounded"
        />
      </FormGroup>
      <Show show={!Boolean(project)}>
        <FormGroup>
          <Label htmlFor="project-initiative">{t('project.initiative')}*</Label>
          <Select id="project-initiative" name="project-initiative" required onChange={onSelectInitiative}>
            <option value="">{t('placeholder.select-one')}</option>
            {initiatives?.map((i) => {
              return (
                <option key={`initiative-${i.uuid}`} value={i.uuid}>
                  {i.name}
                </option>
              );
            })}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="project-project-type">{t('improve.project-type-label')}*</Label>
          <Select id="project-project-type" name="project-type-uuid" required>
            {projectTypes?.map((pt) => {
              return (
                <option key={`project-type-${pt.uuid}`} value={pt.uuid}>
                  {pt.name}
                </option>
              );
            })}
          </Select>
        </FormGroup>
      </Show>

      <Button.Primary type="submit" className="uppercase">
        {t('buttons.save')}
      </Button.Primary>
    </form>
  );
});
