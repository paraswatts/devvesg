import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { Api } from 'src/api';
import { UserTypes } from 'src/interfaces';
import i18n from 'src/mocks/i18nForTests';
import { CreateUserContainer } from 'src/routes/onboarding/CreateUserContainer';

jest.spyOn(Api.user, 'checkExists').mockResolvedValueOnce({ data: null });

describe('CreateUserContainer', () => {
  test('it renders, checks for existing email, and submits properly', async () => {
    const onSubmit = jest.fn();
    render(
      <I18nextProvider i18n={i18n}>
        <CreateUserContainer userType={UserTypes.PARTNER} onSubmit={onSubmit} />
      </I18nextProvider>,
      { wrapper: MemoryRouter },
    );
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
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });
});
