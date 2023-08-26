import { useTranslation } from 'react-i18next';
import { components } from 'react-select';

export const NoOptionsMessage = (props: any) => {
  const { t } = useTranslation();
  return <components.NoOptionsMessage {...props}>{t('placeholder.start-typing')}</components.NoOptionsMessage>;
};
