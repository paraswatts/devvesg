import { useTranslation } from 'react-i18next';
import { Link, generatePath } from 'react-router-dom';

import { Button } from 'src/common/interactions/Button';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

interface TotalFormProps {
  onSubmit: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const TotalForm = ({ disabled, loading, onSubmit }: TotalFormProps) => {
  const { client } = useClient();
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-6 my-6">
      <Button.Primary type="button" onClick={onSubmit} disabled={disabled || loading}>
        {t('global.save-result')}
      </Button.Primary>
      <Link to={generatePath(ClientAbsoluteRoutes.REDUCE_IMPACT, { clientUuid: client.uuid })}>
        {t('launchpad.reduce-impact')}
      </Link>
    </div>
  );
};
