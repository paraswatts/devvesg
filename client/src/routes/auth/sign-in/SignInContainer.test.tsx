import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { Api } from 'src/api';
import i18n from 'src/mocks/i18nForTests';
import { SignInContainer } from 'src/routes/auth/sign-in/SignInContainer';

describe('SignInContainer', () => {
  test('it submits the form', async () => {
    const spy = jest.spyOn(Api.auth, 'login').mockImplementation(() => Promise.resolve({ data: {} } as unknown as any));
    render(<I18nextProvider i18n={i18n}><SignInContainer /></I18nextProvider>, { wrapper: MemoryRouter });
    userEvent.type(screen.getByRole('textbox', { name: /^Username/ }), 'foo@bar.com');
    userEvent.type(screen.getByLabelText(/^Password/), 'p@ssword');
    userEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    await waitFor(async () => {
      expect(spy).toHaveBeenCalledWith({ email: 'foo@bar.com', password: 'p@ssword' });
    });
  });

  test('it validates the form', async () => {
    const spy = jest.spyOn(Api.auth, 'login').mockImplementation(() => Promise.resolve({ data: {} } as unknown as any));
    render(<I18nextProvider i18n={i18n}><SignInContainer /></I18nextProvider>, { wrapper: MemoryRouter });
    expect(screen.getByRole('textbox', { name: /^Username/ })).toBeValid();
    expect(screen.getByLabelText(/^Password/)).toBeValid();
    userEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    await waitFor(async () => {
      expect(screen.getByRole('textbox', { name: /^Username/ })).toBeInvalid();
    });
    expect(screen.getByLabelText(/^Password/)).toBeInvalid();
    expect(screen.getAllByText('Required')).toHaveLength(2);
    expect(spy).not.toHaveBeenCalled();
  });

  test('it shows client actions', () => {
    render(<I18nextProvider i18n={i18n}><SignInContainer /></I18nextProvider>, { wrapper: MemoryRouter });
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Create An Account' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'I have a passcode' })).toBeInTheDocument();
  });

  test('it shows partner actions', () => {
    render(
      <MemoryRouter initialEntries={['/?partner']}>
        <I18nextProvider i18n={i18n}><SignInContainer /></I18nextProvider>
      </MemoryRouter>,
    );
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign Up' })).toBeInTheDocument();
  });
});
