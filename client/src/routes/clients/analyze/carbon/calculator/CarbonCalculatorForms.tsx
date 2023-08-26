import { Dispatch, PropsWithChildren, SetStateAction, memo, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Button } from 'src/common/interactions/Button';
import {
  AirForm,
  ElectricityForm,
  HeatForm,
  RailForm,
  ShippingForm,
  TotalForm,
  VehicleForm,
} from 'src/routes/clients/analyze/carbon/calculator/forms';

interface CarbonCalculatorFormButtonProps {
  className: string;
  isActive: boolean;
  isComplete: boolean;
  onClick: () => void;
}

enum CalculatorForm {
  ELECTRICITY = 'ELECTRICITY',
  HEAT = 'HEAT',
  VEHICLE = 'VEHICLE',
  AIR = 'AIR',
  RAIL = 'RAIL',
  SHIPPING = 'SHIPPING',
  TOTAL = 'TOTAL',
}

const FORM_BUTTONS: { key: CalculatorForm; title: string }[] = [
  { key: CalculatorForm.ELECTRICITY, title: 'electricity' },
  { key: CalculatorForm.HEAT, title: 'heat' },
  { key: CalculatorForm.VEHICLE, title: 'vehicle' },
  { key: CalculatorForm.AIR, title: 'air' },
  { key: CalculatorForm.RAIL, title: 'rail' },
  { key: CalculatorForm.SHIPPING, title: 'shipping' },
  { key: CalculatorForm.TOTAL, title: 'total' },
];

interface CarbonCalculatorFormsContainerProps {
  loading?: boolean;
  onChange: (total: number) => void;
  onSubmit: () => void;
}
export const CarbonCalculatorForms = memo(({ loading, onChange, onSubmit }: CarbonCalculatorFormsContainerProps) => {
  const { t } = useTranslation();

  const [totals, setTotals] = useState<Record<CalculatorForm, number>>({
    AIR: 0,
    ELECTRICITY: 0,
    HEAT: 0,
    RAIL: 0,
    SHIPPING: 0,
    TOTAL: 0,
    VEHICLE: 0,
  });

  useEffect(() => onChange(totals.TOTAL), [onChange, totals.TOTAL]);

  const [selectedForm, setSelectedForm] = useState(CalculatorForm.ELECTRICITY);

  const handleSelectForm = (form: CalculatorForm) => {
    setSelectedForm(form);
  };

  const handlers = useMemo(
    () => ({
      [CalculatorForm.ELECTRICITY]: (value: number) => updateTotals(CalculatorForm.ELECTRICITY, value, setTotals),
      [CalculatorForm.HEAT]: (value: number) => updateTotals(CalculatorForm.HEAT, value, setTotals),
      [CalculatorForm.VEHICLE]: (value: number) => updateTotals(CalculatorForm.VEHICLE, value, setTotals),
      [CalculatorForm.AIR]: (value: number) => updateTotals(CalculatorForm.AIR, value, setTotals),
      [CalculatorForm.RAIL]: (value: number) => updateTotals(CalculatorForm.RAIL, value, setTotals),
      [CalculatorForm.SHIPPING]: (value: number) => updateTotals(CalculatorForm.SHIPPING, value, setTotals),
    }),
    [],
  );

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-1">
        {FORM_BUTTONS.map(({ key, title }) => (
          <div key={key} className="flex-grow">
            <CarbonCalculatorFormButton
              className="w-full"
              isActive={selectedForm === key}
              isComplete={key !== CalculatorForm.TOTAL && totals[key] > 0}
              onClick={() => handleSelectForm(key)}
            >
              {t(`buttons.${title}`)}
            </CarbonCalculatorFormButton>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className={selectedForm !== CalculatorForm.ELECTRICITY ? 'hidden' : ''}>
          <ElectricityForm onChange={handlers[CalculatorForm.ELECTRICITY]} />
        </div>
        <div className={selectedForm !== CalculatorForm.HEAT ? 'hidden' : ''}>
          <HeatForm onChange={handlers[CalculatorForm.HEAT]} />
        </div>
        <div className={selectedForm !== CalculatorForm.VEHICLE ? 'hidden' : ''}>
          <VehicleForm onChange={handlers[CalculatorForm.VEHICLE]} />
        </div>
        <div className={selectedForm !== CalculatorForm.AIR ? 'hidden' : ''}>
          <AirForm onChange={handlers[CalculatorForm.AIR]} />
        </div>
        <div className={selectedForm !== CalculatorForm.RAIL ? 'hidden' : ''}>
          <RailForm onChange={handlers[CalculatorForm.RAIL]} />
        </div>
        <div className={selectedForm !== CalculatorForm.SHIPPING ? 'hidden' : ''}>
          <ShippingForm onChange={handlers[CalculatorForm.SHIPPING]} />
        </div>
        <div className={selectedForm !== CalculatorForm.TOTAL ? 'hidden' : ''}>
          <TotalForm onSubmit={onSubmit} disabled={totals.TOTAL <= 0} loading={loading} />
        </div>
      </div>
    </div>
  );
});

const updateTotals = (
  form: Exclude<CalculatorForm, CalculatorForm.TOTAL>,
  total: number,
  setter: Dispatch<SetStateAction<Record<CalculatorForm, number>>>,
) => {
  setter((prevValue) => {
    const { TOTAL, ...rest } = prevValue;
    rest[form] = total;
    return {
      ...rest,
      TOTAL: Object.values(rest).reduce((acc, curr) => acc + curr, 0),
    };
  });
};

const CarbonCalculatorFormButton = (props: PropsWithChildren<CarbonCalculatorFormButtonProps>) => {
  const { isActive, isComplete, ...rest } = props;

  if (isActive) {
    return <Button.Primary type="button" {...rest} />;
  } else if (isComplete) {
    // TODO: may need to add a new button type for this or tweak styles
    return <Button.Accent type="button" {...rest} />;
  } else {
    return <Button.Outline type="button" {...rest} />;
  }
};
