import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';

import { Api } from 'src/api';
import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { OnboardingPartnerServicesContainer } from 'src/routes/onboarding/partner/services/OnboardingPartnerServicesContainer';

jest.mock('src/common/forms/SingleSelectInput.tsx');
jest.mock('src/common/forms/MultiSelectInput.tsx');
jest.mock('src/common/forms/SelectOption.tsx');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  };
});

jest.mock('src/common/providers/onboarding.provider', () => {
  return {
    useOnboarding: () => {
      return {
        newUserData: {},
        newPartnerData: {},
      };
    },
  };
});

describe('OnboardingPartnerServicesContainer', () => {
  const renderPage = testRenderer(
    <I18nextProvider i18n={i18n}>
      <OnboardingPartnerServicesContainer />
    </I18nextProvider>,
  );
  test('it renders, submits', async () => {
    const partnerNewSpy = jest
      .spyOn(Api.partner, 'new')
      .mockResolvedValue({ data: { uuid: 'new-partner-uuid' } } as any);
    const partnerOnboardSpy = jest.spyOn(Api.partner, 'onboard').mockResolvedValue({ data: null });
    const userNewSpy = jest
      .spyOn(Api.user, 'new')
      .mockResolvedValue({ data: { partnerUuid: 'new-partner-uuid' } } as any);

    renderPage();

    await waitFor(async () =>
      expect(
        within(screen.getByRole('listbox', { name: /^Client Types/ })).getAllByRole('option').length,
      ).toBeGreaterThan(0),
    );

    const countryDropdown = screen.getByRole('listbox', { name: /^Locations/ });
    userEvent.selectOptions(countryDropdown, 'United States');

    const regionDropdown = screen.getByRole('listbox', { name: /^United States/ });
    userEvent.selectOptions(regionDropdown, 'Georgia');
    userEvent.selectOptions(regionDropdown, 'Florida');

    const initiativeDropdown = screen.getByRole('listbox', { name: /^Energy Reduction/ });
    userEvent.selectOptions(
      initiativeDropdown,
      '9310c7ed-055b-446f-b124-8d0c0b164357|bd761012-967d-44d8-8cd8-2ea3a6e2c403|e6ef1938-0e04-4e3e-b44f-8e14edd32687',
    );

    const timelineDropdown = screen.getByRole('combobox', { name: /^Project Timeline/ });
    userEvent.selectOptions(timelineDropdown, '6');

    const clientTypesDropdown = screen.getByRole('listbox', { name: /^Client Types/ });
    userEvent.selectOptions(clientTypesDropdown, '123');

    userEvent.click(screen.getByRole('checkbox', { name: /^User Agreement/ }));

    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    await waitFor(async () => expect(mockNavigate).toHaveBeenCalledWith('/partners/new-partner-uuid'));

    expect(userNewSpy).toHaveBeenCalled();
    expect(partnerNewSpy).toHaveBeenCalledWith({
      clientTypes: [{ uuid: '123' }],
      projectTimeline: '6',
      serviceLocations: [{ country: 'United States', provinces: ['Florida', 'Georgia'] }],
    });
    expect(partnerOnboardSpy).toHaveBeenCalledWith({
      partnerUuid: 'new-partner-uuid',
      initiatives: [
        {
          initiativeUuid: '9310c7ed-055b-446f-b124-8d0c0b164357',
          projectTypeUuid: 'bd761012-967d-44d8-8cd8-2ea3a6e2c403',
          requirementTypeUuid: 'e6ef1938-0e04-4e3e-b44f-8e14edd32687',
        },
      ],
    });
  });
});
