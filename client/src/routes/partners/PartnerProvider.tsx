import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { Api, useLazyQuery } from 'src/api';
import { useParams } from 'src/common/hooks';
import { Partner } from 'src/interfaces';

export interface PartnerContextValues {
  partner: Partner;
  setPartner: (partner: Partial<Partner>) => void;
}

const PartnerContext = createContext<PartnerContextValues>({
  partner: {} as Partner,
  setPartner: () => {},
});

export const PartnerProvider = ({ children }: PropsWithChildren<any>) => {
  const { partnerUuid } = useParams<{ partnerUuid: string }>();
  const [partner, setPartner] = useState<Partner>({} as Partner);
  const [partnerFetchQuery, { status }] = useLazyQuery(Api.partner.fetchPartner, {
    onSuccess: (response) => setPartner(response.data),
  });

  useEffect(() => partnerFetchQuery({ partnerUuid }), [partnerFetchQuery, partnerUuid]);

  const contextValue = useMemo(() => {
    return {
      partner,
      setPartner: (updatedPartner: Partial<Partner>) => {
        setPartner((prevValue) => ({ ...prevValue, ...updatedPartner }));
      },
    };
  }, [partner]);

  if (status === 'error') {
    // TODO redirect or error page?
    return null;
  } else if (partner.uuid === partnerUuid) {
    return <PartnerContext.Provider value={contextValue}>{children}</PartnerContext.Provider>;
  } else {
    // TODO show spinner?
    return null;
  }
};

export const usePartner = () => useContext(PartnerContext);
