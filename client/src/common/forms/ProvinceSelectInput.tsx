import { useMemo } from 'react';

import { CountryRegionData } from 'react-country-region-selector';

import { SelectOption } from 'src/common/forms/SelectOption';
import { SingleSelectHookInput, SingleSelectHookInputProps } from 'src/common/forms/SingleSelectInput';

type ProvinceHookSelectProps = SingleSelectHookInputProps & { country?: string };
export const ProvinceSelectHookInput = ({ country, ...rest }: ProvinceHookSelectProps) => {
  const provinces = useMemo(() => {
    const provinceMap: Record<string, string[]> = {};
    CountryRegionData.forEach(([country, _countryCode, provinces]) => {
      provinceMap[country] = provinces.split('|').map((province) => province.split('~')[0]);
    });
    return provinceMap;
  }, []);

  return (
    <SingleSelectHookInput disabled={!country} showSearch optionFilterProp="label" {...rest}>
      {((country && provinces[country]) || []).map((province) => (
        <SelectOption key={province} value={province} label={province}>
          {province}
        </SelectOption>
      ))}
    </SingleSelectHookInput>
  );
};
