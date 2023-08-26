import { PropsWithChildren, ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { Api, LoginResponse } from 'src/api/actions';
import { setBearerToken } from 'src/api/client';
import { useLazyQuery } from 'src/api/useLazyQuery';
import { EMPTY_USER } from 'src/common/providers/UserProvider';

enum AuthenticationState {
  PENDING,
  NO_TOKEN,
  LOADING,
  ERROR,
  AUTHENTICATED,
}

const REDIRECT_TO_LOGIN_STATES = [AuthenticationState.NO_TOKEN, AuthenticationState.ERROR];
const RENDER_CHILDREN_STATES = [
  AuthenticationState.NO_TOKEN,
  AuthenticationState.ERROR,
  AuthenticationState.AUTHENTICATED,
];

interface AuthenticationContextValues {
  setToken: (token: string) => void;
  signOut: () => void;
}
export const AuthenticationContext = createContext<AuthenticationContextValues>({
  setToken,
  signOut,
});

interface AuthenticationProviderProps {
  skeleton: ReactNode;
  UserProvider: (props: PropsWithChildren<{ user: LoginResponse }>) => JSX.Element;
}
export const AuthenticationProvider = ({
  skeleton,
  UserProvider,
  children,
}: PropsWithChildren<AuthenticationProviderProps>) => {
  const location = useLocation();

  const [getUser] = useLazyQuery<void, { data: LoginResponse }>(Api.auth.currentUser, {
    disableErrorToast: true,
    onError: () => {
      setAuthState(AuthenticationState.ERROR);
    },
    onSuccess: (response: { data: LoginResponse }) => {
      setUser(response.data);
      setAuthState(AuthenticationState.AUTHENTICATED);
    },
  });

  const [user, setUser] = useState<LoginResponse>(EMPTY_USER);
  const [authState, setAuthState] = useState<AuthenticationState>(AuthenticationState.PENDING);
  const context = useMemo<AuthenticationContextValues>(() => ({ setToken, signOut }), []);

  // This should only ever run once on load of this component - try to read the token and fetch user
  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setBearerToken(localToken);
      setAuthState(AuthenticationState.LOADING);
      getUser();
    } else {
      setAuthState(AuthenticationState.NO_TOKEN);
    }
  }, [getUser]);

  // Kick back to login if we are in a few select states - user needs to authenticate
  if (REDIRECT_TO_LOGIN_STATES.includes(authState)) {
    return <Navigate to="/auth/login" state={{ redirectTo: location.pathname }} />;
  }

  // We want to render a fake app skeletion while the app bootstraps and attempts to fetch a user
  if (!RENDER_CHILDREN_STATES.includes(authState)) {
    return <>{skeleton}</>;
  }

  return (
    <AuthenticationContext.Provider value={context}>
      <UserProvider user={user}>{children}</UserProvider>
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};

function setToken(token: string) {
  localStorage.setItem('token', token);
  setBearerToken(token);
}

function signOut() {
  setBearerToken('');
  localStorage.removeItem('token');
  window.location.pathname = '/auth/login';
}
