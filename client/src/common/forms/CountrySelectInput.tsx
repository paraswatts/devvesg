import { useMemo } from 'react';

import { CountryRegionData } from 'react-country-region-selector';

import { SelectOption } from 'src/common/forms/SelectOption';
import { SingleSelectHookInput, SingleSelectHookInputProps } from 'src/common/forms/SingleSelectInput';

type CountryHookSelectProps = SingleSelectHookInputProps;
export const CountrySelectHookInput = (props: CountryHookSelectProps) => {
  const countries = useMemo(() => CountryRegionData.map(([country, _countryCode, _provinces]) => country), []);

  return (
    <SingleSelectHookInput showSearch optionFilterProp="label" {...props}>
      {countries.map((country) => (
        <SelectOption key={country} value={country} label={country}>
          {country}
        </SelectOption>
      ))}
    </SingleSelectHookInput>
  );
};
