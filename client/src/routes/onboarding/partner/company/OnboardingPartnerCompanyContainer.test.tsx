import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { select } from 'react-select-event';

import { Api } from 'src/api';
import i18n from 'src/mocks/i18nForTests';
import { OnboardingPartnerCompanyContainer } from 'src/routes/onboarding/partner/company/OnboardingPartnerCompanyContainer';

jest.mock('src/common/forms/SingleSelectInput.tsx');
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
    useOnboarding: () => ({
      setNewPartnerData: () => {},
      newUserData: {},
    }),
  };
});

const renderComponent = () => {
  render(
    <I18nextProvider i18n={i18n}>
      <OnboardingPartnerCompanyContainer />
    </I18nextProvider>,
    { wrapper: MemoryRouter },
  );
};

describe('OnboardingPartnerCompanyContainer', () => {
  test('it renders and submits properly when a partner is selected', async () => {
    jest.spyOn(Api.partner, 'query').mockResolvedValue({ data: [{ name: 'abcd', uuid: '123' } as any] });
    jest.spyOn(Api.user, 'new').mockResolvedValue({ data: { partnerUuid: 'new-partner' } as any });
    jest.spyOn(Api.vertical, 'list').mockResolvedValue({ data: [{ name: 'abcd', uuid: '123' } as any] });
    renderComponent();
    const partnerSelect = screen.getByLabelText('Your Organization');
    userEvent.type(partnerSelect, 'abcd');
    await select(partnerSelect, 'abcd');
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
    const nextButton = screen.getByRole('button', { name: 'Next' });
    userEvent.click(nextButton);
    await waitFor(async () => {
      expect(mockNavigate).toHaveBeenCalledWith('/partners/new-partner');
    });
  });

  test('it renders and submits properly when data is entered manually', async () => {
    jest.spyOn(Api.partner, 'query').mockResolvedValue({ data: [{ name: 'abcd', uuid: '123' } as any] });
    jest.spyOn(Api.user, 'new').mockResolvedValue({ data: {} as any });
    jest.spyOn(Api.vertical, 'list').mockResolvedValue({ data: [{ name: 'abcd', uuid: '123' } as any] });
    renderComponent();
    const noOrg = screen.getByRole('checkbox', { name: 'My organization is not listed' });
    userEvent.click(noOrg);

    await waitFor(async () => {
      expect(screen.getByRole('combobox', { name: /^Country/ })).toBeInTheDocument();
    });

    const countryDropdown = screen.getByRole('combobox', { name: /^Country/ });
    userEvent.selectOptions(countryDropdown, 'United States');
    const regionDropdown = screen.getByRole('combobox', { name: /^State \/ Province/ });
    userEvent.selectOptions(regionDropdown, 'Georgia');
    const name = screen.getByRole('textbox', { name: /^Name/ });
    userEvent.type(name, 'First Galactic Empire');
    const description = screen.getByRole('textbox', { name: /^Company Description/ });
    userEvent.type(description, 'The bad guys');
    const email = screen.getByRole('textbox', { name: /^Contact Email/ });
    userEvent.type(email, 'vader@deathstar.net');
    const website = screen.getByRole('textbox', { name: /^Website URL/ });
    userEvent.type(website, 'deathstar.net');
    const phone = screen.getByRole('textbox', { name: /^Phone Number/ });
    userEvent.type(phone, '1112223333');

    const vertical = screen.getByRole('combobox', { name: /^Vertical/ });
    await waitFor(async () => {
      expect((await within(vertical).findAllByRole('option')).length).toBeGreaterThan(0);
    });
    userEvent.selectOptions(vertical, '123');

    const nextButton = screen.getByRole('button', { name: 'Next' });
    userEvent.click(nextButton);
    await waitFor(async () => {
      expect(mockNavigate).toHaveBeenLastCalledWith('/onboarding/partner-services');
    });
  });
});
