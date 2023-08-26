import React from 'react';

import { useTranslation } from 'react-i18next';

export const UnauthorizedContainer = React.memo(() => {
  const { t } = useTranslation();
  return (
    <div className="w-full bg-white text-center p-4">
      <h2>{t('authentication.unauthorized-page')}</h2>
    </div>
  );
});
