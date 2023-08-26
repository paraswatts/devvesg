import { useTranslation } from 'react-i18next';

import { Button } from 'src/common/interactions/Button';

interface FormButtonProps {
  handleBack: () => void;
  disabled: boolean | undefined;
}
const FormButtons = ({ handleBack, disabled }: FormButtonProps) => {
  const { t } = useTranslation();
  return (
    <div className="w-full text-right flex px-2 mt-4">
      <Button.Outline type="button" className="w-1/3 mr-5" onClick={handleBack}>
        {t('buttons.back')}
      </Button.Outline>
      <Button.Primary type="submit" className="w-full md:w-80" disabled={disabled}>
        {t('buttons.next')}
      </Button.Primary>
    </div>
  );
};

export default FormButtons;
