import { FormEvent, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { DatePickerHookInput, FormField, FormFieldGroup, TextHookInput } from 'src/common/forms';
import { extractStepFormError } from 'src/common/forms/error';
import { Validators } from 'src/common/forms/validators';
import { Button } from 'src/common/interactions/Button';
import { Nft, RetireNFT } from 'src/interfaces';

interface RetireNFTFormData {
    uuid?: string;
    credits?: string;
    nftRetireDate?: string;
}

interface RetireNFTModalData {
    nft: Nft;
    showConfirmModal: (flag: boolean) => void;
    submitRetireNFT: (data: RetireNFTFormData) => void;
}

export const RetireNFTModal = ({ nft, showConfirmModal, submitRetireNFT }: RetireNFTModalData) => {
    const { t } = useTranslation();
    const { control, formState, trigger, getValues, setValue } = useForm<RetireNFT>({
        shouldFocusError: true,
        mode: "onChange",
        defaultValues: {}
    });

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = await trigger();
        if (isValid)
            submitRetireNFT({
                uuid: nft.uuid,
                ...getValues()
            });
    }

    useEffect(() => {
        setValue('credits', nft.creditCount, { shouldValidate: true });
    }, [nft, setValue])

    return (
        <div className="px-10 mt-5">
            <form onSubmit={submitForm}>
                <span className="text-500" data-testid="text-1">{t('admin.choose-date-to-retire-carbon-credits')}</span>
                <div className="px-20 mt-5">
                    <FormFieldGroup>
                        <FormField
                            description={t('admin.nft-retire-date')}
                            label={t('date')}
                            id="nftRetireDate"
                            name="nftRetireDate"
                            error={extractStepFormError(formState, 'nftRetireDate')}
                            required
                        >
                            <DatePickerHookInput placeholderText="MM-DD-YYYY" minDate={new Date()} autoComplete="off" control={control} isClearable rules={Validators.required(t)} />
                        </FormField>

                        <FormField
                            description={t('admin.the-carbon-credit')}
                            id="credits"
                            name="credits"
                            label={t('launchpad.esg-assets')}
                            error={extractStepFormError(formState, 'credits')}
                            required
                        >
                            <TextHookInput type="number" placeholder="1,200" max={nft.creditCount} min="1" control={control} rules={Validators.required(t)} />
                        </FormField>
                    </FormFieldGroup>
                </div>
                <span className="text-500">{t('admin.retire-carbon-credits-confirmation')}</span>
                <div className="flex justify-center mt-5">
                    <Button.Outline type="button" className="mr-4" onClick={() => showConfirmModal(false)}>
                        {t('buttons.nevermind')}
                    </Button.Outline>
                    <Button.Primary type="submit">
                        {t('buttons.yes')}
                    </Button.Primary>
                </div>
            </form>
        </div>
    );
}