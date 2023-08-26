import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import ReactSelect, { MultiValue } from 'react-select';

import { Api, RequirementTypeNewParams, useLazyQuery } from 'src/api';
import { FormGroup } from 'src/common/forms/FormGroup';
import { Input } from 'src/common/forms/Input';
import { Label } from 'src/common/forms/Label';
import { REACT_SELECT_STYLES } from 'src/common/forms/ReactSelect';
import { Textarea } from 'src/common/forms/Textarea';
import { useParams } from 'src/common/hooks';
import { Button } from 'src/common/interactions/Button';
import { Partner, RequirementType } from 'src/interfaces';

interface RequirementTypeFormProps {
  currentValues?: RequirementType;
  onSubmit: (requirementType: RequirementTypeNewParams) => void;
}

export const RequirementTypeForm = React.memo((props: RequirementTypeFormProps) => {
  const { currentValues, onSubmit } = props;
  const { initiativeUuid, projectTypeUuid } = useParams<{ initiativeUuid: string; projectTypeUuid: string }>();
  const [partnerOptions, setPartnerOptions] = useState<{ label: string; value: string }[]>([]);
  const [currentPartners, setCurrentPartners] = useState<readonly { label: string; value: string }[]>([]);
  const [partnersQuery, partnersResponse] = useLazyQuery<null, { data: Partner[] }>(Api.partner.list);
  const { t } = useTranslation();

  useEffect(() => {
    partnersQuery(null);
  }, [partnersQuery]);

  useEffect(() => {
    if (partnersResponse.status === 'resolved') {
      const partners = partnersResponse.response!.data.map((p) => {
        return { value: p.uuid, label: p.name };
      });
      setPartnerOptions(partners);
    }
  }, [partnersResponse, setPartnerOptions]);

  useEffect(() => {
    if (currentValues) {
      const val = currentValues.partners.map((item) => {
        return {
          label: item.name,
          value: item.uuid,
        };
      });
      setCurrentPartners(val || []);
    }
  }, [currentValues, setCurrentPartners]);

  const prepareSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const partners = currentPartners.map((item) => item.value);
    const data = new FormData(event.target as HTMLFormElement);
    const payload = {
      name: '' + data.get('name'),
      description: '' + data.get('description'),
      initiativeUuid,
      projectTypeUuid,
      partnerUuids: partners,
    };
    onSubmit(payload);
  };

  const onSelectPartner = (val: MultiValue<{ label: string; value: string }>) => {
    setCurrentPartners(val);
  };

  return (
    <form onSubmit={prepareSubmit}>
      <FormGroup>
        <Label htmlFor="requirement-type-name">{t('profile.name')}*</Label>
        <Input id="requirement-type-name" type="text" name="name" required defaultValue={currentValues?.name} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="requirement-type-objective">{t('profile.description')}*</Label>
        <Textarea
          id="requirement-type-objective"
          name="description"
          required
          defaultValue={currentValues?.description}
          rows={4}
        />
      </FormGroup>
      <FormGroup>
        <Label>{t('project.partners')}</Label>
        <div className="react-select-container">
          <ReactSelect
            isMulti={true}
            value={currentPartners}
            styles={REACT_SELECT_STYLES}
            options={partnerOptions}
            onChange={onSelectPartner}
          />
        </div>
      </FormGroup>

      <Button.Primary type="submit" className="uppercase">
        {t('buttons.save')}
      </Button.Primary>
    </form>
  );
});
