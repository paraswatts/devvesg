import { PropsWithChildren } from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { Api } from 'src/api';
import { AuthenticationProvider, useAuthentication } from 'src/common/providers/AuthenticationProvider';

const Skeleton = () => <h1>Loading</h1>;
const NotAuthenticated = () => <h1>Not Authenticated</h1>;
const UserProvider = ({ children }: PropsWithChildren<any>) => <>{children}</>;

const TestWrapper = ({ children }: PropsWithChildren<any>) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route
          path="*"
          element={
            <AuthenticationProvider skeleton={<Skeleton />} UserProvider={UserProvider}>
              {children}
            </AuthenticationProvider>
          }
        ></Route>
        <Route path="/auth/login" element={<NotAuthenticated />} />
      </Routes>
    </MemoryRouter>
  );
};

const TestComponent = () => {
  const { setToken, signOut } = useAuthentication();

  return (
    <div>
      <h1>Hello World</h1>
      <button type="button" onClick={() => setToken('foobaz')}>
        Token
      </button>
      <button type="button" onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
};

describe('AuthenticationProvider', () => {
  afterEach(() => localStorage.removeItem('token'));

  test('it redirects to login without token', async () => {
    render(<TestComponent />, { wrapper: TestWrapper });
    expect(screen.getByRole('heading', { name: 'Not Authenticated' })).toBeInTheDocument();
  });

  test('it renders children when token is invalid', async () => {
    localStorage.setItem('token', 'foobar');
    jest.spyOn(Api.auth, 'currentUser').mockRejectedValueOnce({});

    render(<TestComponent />, { wrapper: TestWrapper });

    // Show loading state before showing final result
    expect(screen.getByRole('heading', { name: 'Loading' })).toBeInTheDocument();
    await waitFor(async () => {
      expect(screen.getByRole('heading', { name: 'Not Authenticated' })).toBeInTheDocument();
    });
  });

  test('it renders children when authentication is valid', async () => {
    localStorage.setItem('token', 'foobar');
    jest.spyOn(Api.auth, 'currentUser').mockResolvedValueOnce({} as any);

    render(<TestComponent />, { wrapper: TestWrapper });

    // Show loading state before showing final result
    expect(screen.getByRole('heading', { name: 'Loading' })).toBeInTheDocument();
    await waitFor(async () => {
      expect(screen.getByRole('heading', { name: 'Hello World' })).toBeInTheDocument();
    });
  });

  test('it updates the token', async () => {
    localStorage.setItem('token', 'foobar');
    jest.spyOn(Api.auth, 'currentUser').mockResolvedValueOnce({} as any);

    render(<TestComponent />, { wrapper: TestWrapper });

    await waitFor(async () => {
      expect(screen.getByRole('button', { name: 'Token' })).toBeInTheDocument();
    });
    userEvent.click(screen.getByRole('button', { name: 'Token' }));
    expect(localStorage.getItem('token')).toEqual('foobaz');
  });

  test('it signs out / destroys the token', async () => {
    localStorage.setItem('token', 'foobar');
    jest.spyOn(Api.auth, 'currentUser').mockResolvedValueOnce({} as any);

    render(<TestComponent />, { wrapper: TestWrapper });

    await waitFor(async () => {
      expect(screen.getByRole('button', { name: 'Sign Out' })).toBeInTheDocument();
    });
    userEvent.click(screen.getByRole('button', { name: 'Sign Out' }));
    expect(localStorage.getItem('token')).toBeNull();
  });
});
