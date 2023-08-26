import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';

import { Api } from 'src/api';
import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { OnboardingPartnerUserContainer } from 'src/routes/onboarding/partner/user/OnboardingPartnerUserContainer';

jest.spyOn(Api.user, 'checkExists').mockResolvedValueOnce({ data: null });
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  };
});

describe('OnboardingPartnerUserContainer', () => {
  const renderPage = testRenderer(
    <I18nextProvider i18n={i18n}>
      <OnboardingPartnerUserContainer />
    </I18nextProvider>,
  );
  test('it renders, moves them onto the next step', async () => {
    renderPage();
    const submitButton = screen.getByRole('button', { name: 'Next' });
    const firstName = screen.getByRole('textbox', { name: /^First Name/ });
    const lastName = screen.getByRole('textbox', { name: /^Last Name/ });
    const email = screen.getByRole('textbox', { name: /^Email/ });
    const agreement = screen.getByRole('checkbox', { name: /^User Agreement/ });
    const password = screen.getByLabelText(/^Password/);
    const passwordConfirm = screen.getByLabelText(/^Confirm Password/);
    userEvent.type(firstName, 'Darth');
    userEvent.type(lastName, 'Vader');
    userEvent.type(email, 'darth@deathstar.net');
    userEvent.type(password, 'D@rkSide1');
    userEvent.type(passwordConfirm, 'D@rkSide1');
    userEvent.click(agreement);
    userEvent.click(submitButton);
    expect(submitButton).toBeEnabled();
    await waitFor(async () => {
      expect(mockNavigate).toHaveBeenCalledWith('/onboarding/create-partner');
    });
  });
});
