import { useTranslation } from 'react-i18next';

import { TermsOfServiceContent } from 'src/common/components/user-agreement';
import { Button } from 'src/common/interactions/Button';

interface UserAgreementProps {
  onAgree: () => void;
  loading: boolean;
}
export const UserAgreement = ({ onAgree, loading }: UserAgreementProps) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-xl mx-auto bg-white rounded-md p-2">
      <h3 className="text-center">{t('global.user-agreement')}.</h3>
      <TermsOfServiceContent />
      <div className="text-center">
        <Button.Primary type="button" onClick={onAgree} disabled={loading}>
          {t('buttons.i-agree')}
        </Button.Primary>
      </div>
    </div>
  );
};
