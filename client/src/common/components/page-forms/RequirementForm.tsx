import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';

import { Api, RequirementNewParams, useLazyQuery } from 'src/api';
import { FormGroup } from 'src/common/forms/FormGroup';
import { Input } from 'src/common/forms/Input';
import { Label } from 'src/common/forms/Label';
import { Select } from 'src/common/forms/Select';
import { Textarea } from 'src/common/forms/Textarea';
import { Button } from 'src/common/interactions/Button';
import { Partner, ProjectRequirementStatuses, Requirement } from 'src/interfaces';

interface RequirementFormProps {
  requirement?: Requirement;
  onSubmit: (requirement: Omit<RequirementNewParams, 'projectUuid' | 'clientUuid'>) => void;
}

export const RequirementForm = React.memo((props: RequirementFormProps) => {
  const { requirement, onSubmit } = props;
  const [partnersQuery, partnersResponse] = useLazyQuery<null, { data: Partner[] }>(Api.partner.list);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { t } = useTranslation();
  useEffect(() => {
    partnersQuery(null);
    if (requirement) {
      if (requirement.startDate) {
        setStartDate(new Date(requirement.startDate));
      }
      if (requirement.endDate) {
        setEndDate(new Date(requirement.endDate));
      }
    }
  }, [partnersQuery, requirement]);

  const prepareSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const payload: RequirementNewParams | Omit<RequirementNewParams, 'projectUuid' | 'clientUuid'> = {
      name: '' + data.get('name'),
      description: '' + data.get('description'),
      status: ('' + data.get('status')) as ProjectRequirementStatuses,
      partnerUuid: '' + data.get('partnerUuid'),
      projectCode: '' + data.get('projectCode'),
      areaCode: '' + data.get('areaCode'),
    };
    payload.startDate = startDate;
    payload.endDate = endDate;
    onSubmit(payload);
  };

  if (!partnersResponse.response?.data) {
    return null;
  }

  const partners = partnersResponse.response.data;

  return (
    <form onSubmit={prepareSubmit}>
      <FormGroup>
        <Label htmlFor="requirement-name">{t('profile.name')}*</Label>
        <Input id="requirement-name" type="text" name="name" required defaultValue={requirement?.name} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="requirement-description">{t('profile.description')}*</Label>
        <Textarea
          id="requirement-description"
          name="description"
          required
          rows={4}
          defaultValue={requirement?.description}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="requirement-status">{t('project.status')}*</Label>
        <Select id="requirement-status" name="status" required defaultValue={requirement?.status}>
          <option value={ProjectRequirementStatuses.IN_PROGRESS}>{t('project.in-progress')}</option>
          <option value={ProjectRequirementStatuses.NOT_STARTED}>{t('project.not-started')}</option>
          <option value={ProjectRequirementStatuses.DONE}>{t('project.done')}</option>
          <option value={ProjectRequirementStatuses.ON_HOLD}>{t('project.on-hold')}</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="requirement-partner">{t('project.partner')}</Label>
        <Select id="requirement-partner" name="partnerUuid" defaultValue={requirement?.partner?.uuid}>
          <option value="">{t('placeholder.none')}</option>
          {partners.map((p) => {
            return (
              <option key={`partner-${p.uuid}`} value={p.uuid}>
                {p.name}
              </option>
            );
          })}
        </Select>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="requirement-area-code">{t('improve.project-code-label')}</Label>
        <Input id="requirement-area-code" type="text" name="projectCode" defaultValue={requirement?.projectCode} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="requirement-project-code">{t('project.area-code')}</Label>
        <Input id="requirement-project-code" type="text" name="areaCode" defaultValue={requirement?.areaCode} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="requirement-start-date">{t('project.start-date')}</Label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          isClearable
          className="block w-full p-4 border-gray-500 rounded"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="requirementt-end-date">{t('project.end-date')}</Label>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          isClearable
          className="block w-full p-4 border-gray-500 rounded"
        />
      </FormGroup>
      <Button.Primary type="submit" className="uppercase">
        {t('buttons.save')}
      </Button.Primary>
    </form>
  );
});
