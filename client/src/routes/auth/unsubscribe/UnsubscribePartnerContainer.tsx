import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Api, UnsubscribePartnerParams, UnsubscribePartnerResponse, useLazyQuery } from 'src/api';
import { useParams } from 'src/common/hooks';
import { Button } from 'src/common/interactions/Button';

import devvEsgLogo from 'src/assets/images/devv-esg-logo.png';

export const UnsubscribePartnerContainer = React.memo(() => {
  const { t } = useTranslation();
  const { partnerId } = useParams<{ partnerId: string }>();
  const [unsubscribeQuery, unsubscribeResponse] = useLazyQuery<
    UnsubscribePartnerParams,
    { data: UnsubscribePartnerResponse }
  >(Api.auth.unsubscribePartner);

  const loading = unsubscribeResponse.status === 'loading';
  const resolved = unsubscribeResponse.status === 'resolved';
  const disabled = loading || resolved;

  useEffect(() => {
    if (resolved) {
      toast.success(t('authentication.unsubscribe-success'));
    }
  }, [resolved, t]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled) {
      return;
    }
    unsubscribeQuery({ partnerId });
  };

  return (
    <div className="max-w-2x md:w-2/5 mx-auto">
      <img src={devvEsgLogo} alt="DevvESG" className="mx-auto mb-7" />
      <form onSubmit={onSubmit}>
        <div className="text-center mt-7">
          <Button.Primary type="submit" disabled={disabled}>
            {t('authentication.click-to-unsubscribe')}
          </Button.Primary>
        </div>
      </form>
    </div>
  );
});
