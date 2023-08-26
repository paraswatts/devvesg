import { useTranslation } from 'react-i18next';

export const AdminCarbonCreditsHeading = () => {
  const { t } = useTranslation();

  return (
    <div className="heading">
      <h1 className="mb-5 font-bold" style={{ fontSize: '45px' }} data-testid="h1">
        {t('admin.carbon-credits-submission')}
      </h1>
      <h4 className="items-left" style={{ fontSize: '1.2rem' }} data-testid="h4">
        {t('admin.review-carbon-credits-submission')}
      </h4>
    </div>
  );
};
