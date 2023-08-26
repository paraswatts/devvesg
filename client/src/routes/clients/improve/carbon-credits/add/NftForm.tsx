import { useCallback, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { NftFormValues, NftNewParams } from 'src/api';
import { ConfirmationModal } from 'src/common/components';
import { Button } from 'src/common/interactions/Button';
import { useUser } from 'src/common/providers/UserProvider';

import styles from './CarbonCreditsAddContainer.module.scss'
import { CreditInformationForm } from './CreditInformationForm';
import { ProjectDetailsForm } from './ProjectDetailsForm';
import { ProjectOverViewForm } from './ProjectOverViewForm';
import { ProjectValidationForm } from './ProjectValidationForm';
interface NftFormProps {
  nft?: Omit<NftNewParams, 'uuid'>;
  onboarding?: boolean;
  loading?: boolean;
  onSubmit: (nft: NftNewParams) => void;
  closeNftForm: () => void;
}

export const NftForm = ({ onSubmit, loading, closeNftForm }: NftFormProps) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const [formStep, setFormStep] = useState(1)
  const [confirmModal, showConfirmModal] = useState(false)
  const [defaultFormValues, setDefaultFormValues] = useState({
    1: {},
    2: {},
    3: {},
    4: {}
  })
  const [nftValues, setNftValues] = useState<NftFormValues>({
    assetName: 'asset name',
    assetDescription: 'asset description',
    artist: "DEVVESG",
    creator: "DEVVESG",
    amount: "1",
    forSale: true,
    salePrice: "",
    saleCurrency: "",
    saleDescription: "",
    saleLocation: "",
    saleLink: "",
    nftType: "Carbon",
    createdBy: { uuid: user.uuid },
  });

  const handleValidSubmit = useCallback(() => {
    const { projectFromDate, projectToDate, asset, ...rest } = nftValues;
    let assetFile = undefined;
    if (asset && asset instanceof FileList) {
      if (asset.length > 0) {
        assetFile = asset[0];
      }
    }

    const payload: NftNewParams = {
      ...rest,
      asset: assetFile,
      projectFromDate: projectFromDate?.getTime(),
      projectToDate: projectToDate?.getTime()
    };
    delete payload['creditTypeUuid']
    showConfirmModal(false)
    onSubmit(payload);
  }, [nftValues, onSubmit]);

  const handleNext = (values: NftFormValues) => {
    const newNftValues = { ...nftValues, ...values }
    const newDefaults = { ...defaultFormValues, [formStep]: values }
    setDefaultFormValues(newDefaults)
    setNftValues(newNftValues);
    if (formStep === 4) {
      showConfirmModal(true)
    }
    else {
      setFormStep(formStep => formStep + 1)
    }
  }

  const handleBack = () => {
    if (formStep === 1) {
      closeNftForm()
    } else {
      setFormStep(formStep => formStep - 1)
    }
  }

  const getFormTitle = useMemo(() => {
    switch (formStep) {
      case 1:
        return t("improve.credit-information");
      case 2:
        return t("improve.project-overview");
      case 3:
        return t("improve.project-details");
      case 4:
        return t("improve.project-validation");
      default:
        return t("improve.credit-information");
    }
  }, [formStep, t])

  return (
    <div className="mx-20">
      <div className={styles.title}><span>{t('improve.carbon-tokens-application')}</span></div>
      <div className={styles.page_number}>{`${t('global.page')} ${formStep}/4`}</div>

      <div className='w-1/2 mx-auto mt-8'>
        <div className={styles.form_title}>{getFormTitle} </div>
        {{
          1: <CreditInformationForm handleBack={handleBack} handleNext={handleNext} loading={loading} defaultValues={defaultFormValues[1]} />,
          2: <ProjectOverViewForm handleBack={handleBack} handleNext={handleNext} loading={loading} defaultValues={defaultFormValues[2]} />,
          3: <ProjectDetailsForm handleBack={handleBack} handleNext={handleNext} loading={loading} defaultValues={defaultFormValues[3]} />,
          4: <ProjectValidationForm handleBack={handleBack} handleNext={handleNext} loading={loading} defaultValues={defaultFormValues[4]} />,
        }[formStep]}
        <ConfirmationModal isOpen={confirmModal} onCancelModal={() => showConfirmModal(false)} title={t('improve.upload-carbon-credit')}>
          <div className="px-20 mt-4">
            <span className="text-500">{t('improve.submit-doc-desc')}</span>
            <div className="flex justify-center mt-5">
              <Button.Outline type="button" className="mr-4" onClick={() => showConfirmModal(false)}>
                {t('profile.cancel-delete-account')}
              </Button.Outline>
              <Button.Primary type="submit" onClick={handleValidSubmit}>
                {t('buttons.yes')}
              </Button.Primary>
            </div>
          </div>
        </ConfirmationModal>
      </div>
    </div>
  );
};
