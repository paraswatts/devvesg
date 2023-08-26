import React, { useEffect, useRef, useState } from 'react';

import { useQuery } from '@apollo/client';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, generatePath, useNavigate } from 'react-router-dom';

import { Api, PartnerNewParams, PartnerOnboardingParams, useLazyQuery } from 'src/api';
import { OrderedActivitySteps } from 'src/common/components/ordered-activity-steps/OrderedActivitySteps';
import {
  CheckboxHookInput,
  FormField,
  FormFieldGroup,
  LocationSelect,
  MultiSelectHookInput,
  MultiSelectInput,
  SelectOption,
  SingleSelectHookInput,
} from 'src/common/forms';
import { extractHookError } from 'src/common/forms/error';
import { Validators } from 'src/common/forms/validators';
import { Button } from 'src/common/interactions/Button';
import { useAuthentication } from 'src/common/providers/AuthenticationProvider';
import { useOnboarding } from 'src/common/providers/onboarding.provider';
import { ClientPartnerLocation } from 'src/interfaces';
import {
  OnboardingCard,
  OnboardingFormContent,
  OnboardingHeader,
  OnboardingSubHeader,
} from 'src/routes/onboarding/common';
import { OnboardingAbsoluteRoutes } from 'src/routes/onboarding/OnboardingRouter';
import {
  GetOnboardingPartnerServices_clientTypes as ClientType,
  GetOnboardingPartnerServices,
  GetOnboardingPartnerServices_initiatives_items as Initiative,
} from 'src/routes/onboarding/partner/services/__gql__/GetOnboardingPartnerServices';
import { GET_ONBOARDING_PARTNER_SERVICES } from 'src/routes/onboarding/partner/services/OnboardingPartnerServicesContainer.query';
import { PARTNER_ONBOARDING_STEPS, PARTNER_ONBOARDING_STEP_SERVICES } from 'src/routes/onboarding/partner/utils';
import { PartnerAbsoluteRoutes } from 'src/routes/partners/PartnerRouter';

const timelines = [
  { label: '1-3 Months', value: 1 },
  { label: '3-6 Months', value: 3 },
  { label: '6-9 Months', value: 6 },
  { label: '9-12 Months', value: 9 },
  { label: '12+ Months', value: 12 },
];

interface ServiceFormValues {
  clientTypeIds: string[];
  timeline?: number;
  locations: ClientPartnerLocation[];
  agreed: boolean;
  requirementTypeIds: string[];
}

export const OnboardingPartnerServicesContainer = React.memo(() => {
  // State
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [initiativeOptions, setInitiativeOptions] = useState<Record<string, { label: string; value: string }[]>>({});
  const [clientTypes, setClientTypes] = useState<ClientType[]>([]);
  const partnerUuidRef = useRef('');
  const [formData, setFormData] = useState<ServiceFormValues>({
    locations: [],
    requirementTypeIds: [],
    timeline: undefined,
    clientTypeIds: [],
    agreed: false,
  });

  // Queries
  // GETs
  useQuery<GetOnboardingPartnerServices>(GET_ONBOARDING_PARTNER_SERVICES, {
    onCompleted: (response) => {
      setInitiatives(response.initiatives.items);

      const initiativeOptions: Record<string, { label: string; value: string }[]> = {};
      response.initiatives.items.forEach((initiative) => {
        initiativeOptions[initiative.uuid] = [];
        initiative.projectTypes.forEach((projectType) => {
          projectType.requirementTypes.forEach((requirementType) => {
            initiativeOptions[initiative.uuid].push({
              label: `${projectType.name}: ${requirementType.name}`,
              value: `${initiative.uuid}|${projectType.uuid}|${requirementType.uuid}`,
            });
          });
        });
      });
      setInitiativeOptions(initiativeOptions);

      setClientTypes(response.clientTypes);
    },
  });

  // POSTs
  const [onboardingQuery, { status: onboardingStatus }] = useLazyQuery(Api.partner.onboard, {
    onSuccess: (data) => {
      navigate(generatePath(PartnerAbsoluteRoutes.SHOW, { partnerUuid: partnerUuidRef.current }));
    },
    enableSuccessToast: true,
  });

  const [createUserQuery, { status: userStatus }] = useLazyQuery(Api.user.new, {
    onSuccess: (data) => {
      setToken(data.data.token);
      const payload: PartnerOnboardingParams = {
        partnerUuid: data.data.partnerUuid,
        initiatives: formData.requirementTypeIds.map((id) => {
          const [initiativeUuid, projectTypeUuid, requirementTypeUuid] = id.split('|');
          return { initiativeUuid, projectTypeUuid, requirementTypeUuid };
        }),
      };
      onboardingQuery(payload);
    },
  });

  const [createPartnerQuery, { status: partnerStatus }] = useLazyQuery(Api.partner.new, {
    onSuccess: (data) => {
      partnerUuidRef.current = data.data.uuid;
      if (newUserData) {
        createUserQuery({ ...newUserData, partnerUuid: data.data.uuid });
      }
    },
  });

  // Hooks
  const navigate = useNavigate();
  const { newPartnerData, newUserData } = useOnboarding();
  const { setToken } = useAuthentication();
  const { control, formState, handleSubmit } = useForm<ServiceFormValues>({
    shouldFocusError: true,
    defaultValues: {
      locations: [],
      requirementTypeIds: [],
      timeline: undefined,
      clientTypeIds: [],
      agreed: false,
    },
  });
  const { t } = useTranslation();

  // If we don't have user or partner data, kick them back to the create account screen
  useEffect(() => {
    if (!newUserData || !newPartnerData) {
      navigate(generatePath(OnboardingAbsoluteRoutes.PARTNER_USER));
    }
  }, [newUserData, newPartnerData, navigate]);

  const handleValidSubmit = (values: ServiceFormValues) => {
    if (!newPartnerData) {
      return;
    }

    setFormData(values);
    const payload: PartnerNewParams = {
      ...newPartnerData,
      serviceLocations: values.locations,
      clientTypes: values.clientTypeIds.map((uuid) => ({ uuid })),
      projectTimeline: values.timeline,
    };
    createPartnerQuery(payload);
  };

  const disabled =
    (formState.isSubmitted && !formState.isValid) ||
    [onboardingStatus, userStatus, partnerStatus].some((x) => x === 'loading');

  return (
    <OnboardingCard>
      <OnboardingHeader>{t('onboarding.lets-talk-about-you')}</OnboardingHeader>
      <OnboardingSubHeader>{t('onboarding.add-your-organization')}</OnboardingSubHeader>

      <div className="my-8">
        <OrderedActivitySteps active={PARTNER_ONBOARDING_STEP_SERVICES} steps={PARTNER_ONBOARDING_STEPS} />
      </div>

      <OnboardingFormContent>
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <FormFieldGroup>
            <FormField id="partner-locations" name="locations" error={extractHookError(formState, 'locations')}>
              <Controller
                name="locations"
                control={control}
                rules={Validators.locations(t)}
                render={({ field: { value, onChange } }) => <LocationSelect value={value} onChange={onChange} />}
              />
            </FormField>

            <h2>{t('onboarding.select-eligible-initiatives')}</h2>

            <FormField id="partner-requirement-types" name="requirementTypeIds">
              <Controller
                name="requirementTypeIds"
                control={control}
                rules={Validators.required(t)}
                render={({ field: { value, onChange } }) => (
                  <FormFieldGroup>
                    {initiatives.map((initiative) => {
                      // Loop through all initiatives and make a multi-select for each of them
                      // Grab all values that start with the uuid of the current initiative to give to the multiselect
                      const valuesForThisIniaitive = value.filter((x) => x.indexOf(initiative.uuid) === 0);
                      const handleInitiativeChange = (values: string[]) => {
                        // When changing the value, just delete all values that start with this initiative uuid and replace them
                        const valuesWithThisInitiative = value.filter((x) => x.indexOf(initiative.uuid) === -1);
                        onChange([...valuesWithThisInitiative, ...values]);
                      };

                      return (
                        <FormField
                          key={initiative.uuid}
                          id={`partner-requirement-types-${initiative.uuid}`}
                          name={initiative.uuid}
                          label={initiative.name}
                          error={extractHookError(formState, 'requirementTypeIds')}
                        >
                          <MultiSelectInput
                            value={valuesForThisIniaitive}
                            onChange={handleInitiativeChange}
                            placeholder={t('placeholder.select')}
                            showSearch
                            optionFilterProp="label"
                          >
                            {(initiativeOptions[initiative.uuid] || []).map(({ label, value }) => {
                              return (
                                <SelectOption key={value} value={value} label={label}>
                                  {label}
                                </SelectOption>
                              );
                            })}
                          </MultiSelectInput>
                        </FormField>
                      );
                    })}
                  </FormFieldGroup>
                )}
              />
            </FormField>

            <h2>{t('onboarding.select-initiative-timeline')}</h2>

            <FormField
              id="partner-timeline"
              name="timeline"
              label={t('onboarding.project-timeline')}
              error={extractHookError(formState, 'timeline')}
              required
            >
              <SingleSelectHookInput
                control={control}
                rules={Validators.required(t)}
                placeholder={t('placeholder.select-timeline')}
              >
                {timelines.map((item) => {
                  return (
                    <SelectOption key={item.value} value={item.value} label={item.label}>
                      {item.label}
                    </SelectOption>
                  );
                })}
              </SingleSelectHookInput>
            </FormField>

            <h2>{t('onboarding.client-types')}</h2>

            <FormField
              id="partner-client-types"
              name="clientTypeIds"
              label={t('onboarding.client-types-label')}
              error={extractHookError(formState, 'clientTypeIds')}
              required
            >
              <MultiSelectHookInput
                control={control}
                rules={Validators.required(t)}
                placeholder={t('placeholder.select')}
                showSearch
                optionFilterProp="label"
              >
                {clientTypes.map(({ uuid, name }) => (
                  <SelectOption key={uuid} value={uuid} label={name}>
                    {name}
                  </SelectOption>
                ))}
              </MultiSelectHookInput>
            </FormField>

            <FormField
              id="user-agreement"
              name="agreed"
              label={t('onboarding.user-agreement')}
              required
              postFieldContent={
                <Link to="/terms" target="_blank">
                  {t('onboarding.read-user-agreement')}
                </Link>
              }
              error={extractHookError(formState, 'agreed')}
            >
              <CheckboxHookInput
                control={control}
                rules={Validators.required(t)}
                label={t('onboarding.user-agreement-desc')}
              />
            </FormField>

            <div className="w-full text-right">
              <Button.Primary type="submit" className="w-full md:w-80" disabled={disabled}>
                {t('buttons.next')}
              </Button.Primary>
            </div>
          </FormFieldGroup>
        </form>
      </OnboardingFormContent>
    </OnboardingCard>
  );
});
