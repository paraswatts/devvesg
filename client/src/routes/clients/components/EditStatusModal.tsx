import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Api, ClientProjectStatusUpdateParams, ClientRequirementStatusUpdateParams, useLazyQuery } from 'src/api';
import { DatePickerHookInput, FormField, FormFieldGroup, SelectHookInput } from 'src/common/forms';
import { Validators, applyHookFormErrors } from 'src/common/forms/validators';
import { Button } from 'src/common/interactions/Button';
import { Show } from 'src/common/layout';
import { translateProjectStatusForRest, translateRequirementStatusForRest } from 'src/gql/utils';
import { Project, ProjectRequirementStatuses, Requirement } from 'src/interfaces';
import {
  GetProjects_client_projects_items as ApolloProject,
  GetProjects_client_projects_items_requirements as ApolloRequirement,
} from 'src/routes/clients/initiatives/__gql__/GetProjects';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

interface EditStatusModalProps {
  onCloseModal: () => void;
  project?: ApolloProject;
  requirement?: ApolloRequirement;
  projectUuid: string;
}

interface StatusForm {
  status: ProjectRequirementStatuses;
  startDate: Date | null;
  endGoalDate?: Date | null;
  completionDate?: Date | null;
  endDate?: Date | null;
}

export const EditStatusModal = React.memo((props: EditStatusModalProps) => {
  const { project, projectUuid, requirement, onCloseModal } = props;
  const { t } = useTranslation();
  const { client } = useClient();

  const [updateProjectStatusQuery, updateProjectStatusResponse] = useLazyQuery<
    ClientProjectStatusUpdateParams,
    { data: Project }
  >(Api.project.updateStatus, {
    onSuccess: () => onCloseModal(),
    onError: (errors) => applyHookFormErrors(errors, setError),
  });
  const [updateRequirementStatusQuery, updateRequirementStatusResponse] = useLazyQuery<
    ClientRequirementStatusUpdateParams,
    { data: Requirement }
  >(Api.requirement.updateStatus, {
    onSuccess: () => onCloseModal(),
    onError: (errors) => applyHookFormErrors(errors, setError),
  });

  const { handleSubmit, formState, setError, control, setValue } = useForm<StatusForm>({ mode: 'all' });

  useEffect(() => {
    if (project) {
      setValue('status', translateProjectStatusForRest(project.status));
      setValue('startDate', project.startDate);
      setValue('endGoalDate', project.endGoalDate);
      setValue('completionDate', project.completionDate);
    } else if (requirement) {
      setValue('status', translateRequirementStatusForRest(requirement.status));
      setValue('startDate', requirement.startDate);
      setValue('endDate', requirement.endDate);
    }
  }, [project, requirement, setValue]);

  const submitForm = (value: StatusForm) => {
    if (project) {
      if (updateProjectStatusResponse.status !== 'loading') {
        updateProjectStatusQuery({
          ...value,
          clientUuid: client.uuid,
          projectUuid: projectUuid,
        } as ClientProjectStatusUpdateParams);
      }
    } else if (requirement) {
      if (updateRequirementStatusResponse.status !== 'loading') {
        updateRequirementStatusQuery({
          ...value,
          clientUuid: client.uuid,
          projectUuid: projectUuid,
          requirementUuid: requirement.uuid,
        } as ClientRequirementStatusUpdateParams);
      }
    }
  };

  const disabled = formState.isSubmitted && !formState.isValid;

  const projectRequirementStatuses = [
    {
      value: ProjectRequirementStatuses.NOT_STARTED,
      label: t('project.not-started'),
    },
    {
      value: ProjectRequirementStatuses.IN_PROGRESS,
      label: t('project.in-progress'),
    },
    {
      value: ProjectRequirementStatuses.DONE,
      label: t('project.done'),
    },
    {
      value: ProjectRequirementStatuses.ON_HOLD,
      label: t('project.on-hold'),
    },
  ];

  return (
    <div className="p-10">
      <h1>{project?.name || requirement?.name}</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <FormFieldGroup>
          <FormField label={t('project.status')} id="item-status" name="status" required>
            <SelectHookInput control={control} rules={Validators.required(t)}>
              {projectRequirementStatuses.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </SelectHookInput>
          </FormField>

          <FormField label={t('project.start-date')} id="status-start-date" name="startDate">
            <DatePickerHookInput control={control} isClearable />
          </FormField>

          <Show show={Boolean(project)}>
            <FormField label={t('project.end-goal-date')} id="status-end-goal-date" name="endGoalDate">
              <DatePickerHookInput control={control} isClearable />
            </FormField>
            <FormField label={t('project.completion-date')} id="status-completion-date" name="completionDate">
              <DatePickerHookInput control={control} isClearable />
            </FormField>
          </Show>

          <Show show={Boolean(requirement)}>
            <FormField label={t('project.end-date')} id="status-end-date" name="endDate">
              <DatePickerHookInput control={control} isClearable />
            </FormField>
          </Show>

          <div className="text-right">
            <Button.Primary type="submit" disabled={disabled}>
              {t('buttons.save')}
            </Button.Primary>
          </div>
        </FormFieldGroup>
      </form>
    </div>
  );
});
