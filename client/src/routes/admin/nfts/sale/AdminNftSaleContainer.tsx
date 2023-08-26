import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormField, FormFieldGroup, TextAreaHookInput, TextHookInput } from 'src/common/forms';
import { extractHookError } from 'src/common/forms/error';
import { Validators } from 'src/common/forms/validators';
import { Button } from 'src/common/interactions/Button';
import { NftSale } from 'src/interfaces';

export const AdminNftSaleContainer = (props: any) => {
  const { t } = useTranslation();
  const { submitNFTSaleDetails, nft, cancelModal } = props;

  const { uuid, saleLink, salePrice, saleCurrency, saleLocation, saleDescription, assetReferenceThumbnails } = nft;
  const { control, handleSubmit, formState, watch, setValue,  } = useForm<NftSale>({
    defaultValues: {
      uuid,
      saleLink,
      salePrice,
      saleCurrency,
      saleLocation,
      saleDescription,
      assetReferenceThumbnails,
    },
  });

  const onSubmit = (sale: NftSale) => {
    submitNFTSaleDetails(sale);
  };
  
  const currency = watch("saleCurrency");
  useEffect(() => {
    if (currency)
      setValue("saleCurrency", currency.toUpperCase());
  }, [currency, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="form-modal" >
      <div>
        <FormFieldGroup>
          <FormField
            id="salePrice"
            name="salePrice"
            label={t('admin.sale-price')}
            required
            error={extractHookError(formState, 'salePrice')}
          >
            <TextHookInput control={control} rules={Validators.required(t)} type="number"  min="1"/>
          </FormField>
          <FormField
            id="saleLink"
            name="saleLink"
            label={t('admin.sale-link')}
            required
            error={extractHookError(formState, 'saleLink')}
          >
            <TextHookInput control={control} rules={Validators.required(t)} type="url" placeholder="https://www.glassblock.io" />
          </FormField>

          <FormField
            id="saleLocation"
            name="saleLocation"
            label={t('admin.sale-location')}
            required
            error={extractHookError(formState, 'saleLocation')}
          >
            <TextHookInput control={control} rules={Validators.required(t)} placeholder={t('admin.sale-location-placeholder')} />
          </FormField>

          <FormField
            id="saleCurrency"
            name="saleCurrency"
            label={t('admin.sale-currency')}
            required
            error={extractHookError(formState, 'saleCurrency')}
          >
            <TextHookInput control={control} rules={Validators.required(t)} placeholder={t('admin.sale-currency-placeholder')} />
          </FormField>

          <FormField
            id="saleDescription"
            name="saleDescription"
            label={t('admin.sale-description')}
            required
            error={extractHookError(formState, 'saleDescription')}
          >
            <TextAreaHookInput control={control} rules={Validators.required(t)} rows={3} />
          </FormField>

          <Button.Primary type="submit" name="submit" className="uppercase">
            {t('buttons.sale')}
          </Button.Primary>
          <Button.Outline type="button" name="nevermind" className="uppercase" onClick={(e) => cancelModal()}>
            {t('buttons.nevermind')}
          </Button.Outline>
        </FormFieldGroup>
      </div>
    </form>
  );
};
