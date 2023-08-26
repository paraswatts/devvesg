import { PropsWithChildren, useMemo, useState } from 'react';

import { MockPartner } from 'src/common/mocks/MockPartner';
import { Partner } from 'src/interfaces';

export const PartnerProvider = ({ children }: PropsWithChildren<any>) => {
  return <>{children}</>;
};

export const usePartner = () => {
  const [partner, setPartner] = useState<Partner>(MockPartner);

  return useMemo(
    () => ({
      partner,
      setPartner,
    }),
    [partner],
  );
};
