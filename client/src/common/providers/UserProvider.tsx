import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { LoginResponse } from 'src/api/actions';
import { UserTypes } from 'src/interfaces';

export const EMPTY_USER: LoginResponse = {
  clientUuid: '',
  code: '',
  email: '',
  expires: '',
  firstName: '',
  lastName: '',
  onboardingComplete: false,
  partnerUuid: '',
  token: '',
  type: UserTypes.CLIENT,
  userAgreementCompleted: false,
  uuid: '',
  approvalStatus: null,
  userWallet: {},
  clientWallet: {},
  partnerWallet: {},
};

interface UserContextValues {
  user: LoginResponse;
  setUser: (user: Partial<LoginResponse>) => void;
}

export const UserContext = createContext<UserContextValues>({
  user: EMPTY_USER,
  setUser: () => { },
});

interface UserProviderProps {
  user: LoginResponse;
}
export const UserProvider = ({ user, children }: PropsWithChildren<UserProviderProps>) => {
  // This user may be updated at various times during the application, for example updating a name
  const [managedUser, setManagedUser] = useState<LoginResponse>(user);

  // If we get a new user from the authentication provider, make sure we reset all user data.
  useEffect(() => setManagedUser(user), [user]);

  // Getter / setter for the UserProvider context
  const context = useMemo<UserContextValues>(
    () => ({
      user: managedUser,
      setUser: (updatedUser: Partial<LoginResponse>) =>
        setManagedUser((prevValue) => ({ ...prevValue, ...updatedUser })),
    }),
    [managedUser],
  );

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
