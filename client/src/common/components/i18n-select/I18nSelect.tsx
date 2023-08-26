import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { Select } from 'src/common/forms/Select';

import styles from './I18nSelect.module.scss';

const I18nSelect = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  
  useEffect(()=> {
    setCurrentLang(i18n.language);
  }, [i18n.language])

  const updateI18n = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <Select
        id="requirement-status"
        className={clsx(styles.i18nselect, 'w-auto')}
        onChange={(event) => updateI18n(event.target.value)}
        name="status" value={currentLang}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="ja">日本語</option>
      </Select>
    </>
  );
};

export default I18nSelect;
