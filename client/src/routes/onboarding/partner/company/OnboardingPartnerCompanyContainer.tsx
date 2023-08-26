import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import { SingleValue } from 'react-select';
import ReactSelect from 'react-select/async';
import { useDebouncedCallback } from 'use-debounce';

import { Api, LoginResponse, PartnerNewParams, UserNewParams, useLazyQuery } from 'src/api';
import { InfoTooltip } from 'src/common/components/info-tooltip/InfoTooltip';
import { OrderedActivitySteps } from 'src/common/components/ordered-activity-steps/OrderedActivitySteps';
import { PartnersForm } from 'src/common/components/page-forms';
import { NoOptionsMessage } from 'src/common/components/page-forms/NoOptionsMessage';
import { Checkbox } from 'src/common/forms/Checkbox';
import { FormGroup } from 'src/common/forms/FormGroup';
import { CheckboxLabel, Label } from 'src/common/forms/Label';
import { REACT_SELECT_STYLES } from 'src/common/forms/ReactSelect';
import { Button } from 'src/common/interactions/Button';
import { Show } from 'src/common/layout';
import { useAuthentication } from 'src/common/providers/AuthenticationProvider';
import { useOnboarding } from 'src/common/providers/onboarding.provider';
import { OnboardingRoutes } from 'src/routes/onboarding';
import {
  OnboardingCard,
  OnboardingFormContent,
  OnboardingHeader,
  OnboardingSubHeader,
} from 'src/routes/onboarding/common';
import { OnboardingAbsoluteRoutes } from 'src/routes/onboarding/OnboardingRouter';
import { PARTNER_ONBOARDING_STEPS, PARTNER_ONBOARDING_STEP_COMPANY } from 'src/routes/onboarding/partner/utils';
import { PartnerAbsoluteRoutes } from 'src/routes/partners/PartnerRouter';

export const OnboardingPartnerCompanyContainer = React.memo(() => {
  const { t } = useTranslation();
  const [selectedPartner, setSelectedPartner] = useState<{ label: string; value: string } | null>();
  const [noOrgChecked, setNoOrgChecked] = useState(false);
  const { setToken } = useAuthentication();
  const navigate = useNavigate();
  const [createUserQuery] = useLazyQuery<UserNewParams, { data: LoginResponse }>(Api.user.new, {
    onSuccess: (createResp) => {
      setToken(createResp.data.token);
      navigate(generatePath(PartnerAbsoluteRoutes.SHOW, { partnerUuid: createResp.data.partnerUuid }));
    },
  });
  const { setNewPartnerData, newUserData } = useOnboarding();

  useEffect(() => {
    if (!newUserData) {
      navigate(generatePath(OnboardingAbsoluteRoutes.PARTNER_USER));
    }
  }, [newUserData, navigate]);

  const onSelectPartner = (event: SingleValue<{ label: string; value: string }>) => {
    if (event?.value) {
      setNoOrgChecked(false);
      setSelectedPartner(event);
    } else {
      setSelectedPartner(null);
    }
  };

  const noOrgChanged = (value: boolean) => {
    setNoOrgChecked(value);
    setSelectedPartner(null);
  };

  const _handleSearch = (query: string, callback: (options: { value: string; label: string }[]) => void) => {
    Api.partner.query({ query }).then((data) => {
      callback(
        data.data.map((val) => {
          return {
            value: val.uuid,
            label: val.name,
          };
        }),
      );
    });
  };

  const handleSearch = useDebouncedCallback(_handleSearch, 250);

  const onSubmit = (partner: PartnerNewParams) => {
    setNewPartnerData(partner);
    navigate(generatePath(OnboardingRoutes.PARTNER_SERVICES));
  };

  const submitWithExistingOrg = () => {
    // Create the user with the partnerUuid selected
    if (newUserData) {
      const payload: UserNewParams = newUserData;
      payload.partnerUuid = selectedPartner?.value;
      createUserQuery({
        ...payload,
      });
    }
  };

  return (
    <OnboardingCard>
      <OnboardingHeader>{t('onboarding.we-are-glad')}</OnboardingHeader>
      <OnboardingSubHeader>{t('onboarding.tell-us-more')}</OnboardingSubHeader>

      <div className="my-8">
        <OrderedActivitySteps active={PARTNER_ONBOARDING_STEP_COMPANY} steps={PARTNER_ONBOARDING_STEPS} />
      </div>

      <OnboardingFormContent>
        <FormGroup className="mb-4">
          <Label id="user-partner">{t('onboarding.your-organization')}</Label>
          <div className="react-select-container">
            <ReactSelect
              aria-labelledby="user-partner"
              value={selectedPartner}
              components={{ NoOptionsMessage }}
              styles={REACT_SELECT_STYLES}
              loadOptions={handleSearch}
              onChange={onSelectPartner}
            />
          </div>

          <CheckboxLabel htmlFor="org-not-listed">
            <div className="flex items-center">
              <Checkbox
                id="org-not-listed"
                checked={noOrgChecked || false}
                onChange={(event) => noOrgChanged(event.target.checked)}
              />{' '}
              {t('onboarding.organization-not-listed')}
              <InfoTooltip className="ml-2" content={t('onboarding.if-organization-not-listed')} />
            </div>
          </CheckboxLabel>
        </FormGroup>

        <Show show={noOrgChecked}>
          <PartnersForm onboarding onSubmit={onSubmit} />
        </Show>

        <Show show={!noOrgChecked}>
          <div className="w-full text-right">
            <Button.Primary
              className="w-full md:w-80"
              disabled={!selectedPartner?.value}
              onClick={submitWithExistingOrg}
            >
              {t('buttons.next')}
            </Button.Primary>
          </div>
        </Show>
      </OnboardingFormContent>
    </OnboardingCard>
  );
});
