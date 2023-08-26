import React, { PropsWithChildren, createContext, useContext, useState } from 'react';

import { PartnerNewParams, UserNewParams } from 'src/api';

export interface OnboardingContextFields {
  newUserData: UserNewParams | null;
  setNewUserData: (newUser: UserNewParams | null) => void;
  newPartnerData: PartnerNewParams | null;
  setNewPartnerData: (newPartner: PartnerNewParams | null) => void;
}

const onboardingContext = createContext<OnboardingContextFields>({
  newUserData: null,
  setNewUserData: () => {},
  newPartnerData: null,
  setNewPartnerData: () => {},
});

export function ProvideOnboarding({ children }: PropsWithChildren<any>) {
  const [newUserData, setNewUserData] = useState<UserNewParams | null>(null);
  const [newPartnerData, setNewPartnerData] = useState<PartnerNewParams | null>(null);

  return (
    <onboardingContext.Provider
      value={{
        newUserData,
        setNewUserData,
        newPartnerData,
        setNewPartnerData,
      }}
    >
      {children}
    </onboardingContext.Provider>
  );
}

export function useOnboarding() {
  return useContext(onboardingContext);
}
