import { useContext, useMemo } from 'react';

import { CountryRegionData } from 'react-country-region-selector';
import { useTranslation } from 'react-i18next';

import { FormField, FormFieldGroup, MultiSelectInput, SelectOption } from 'src/common/forms';
import { FormFieldContext } from 'src/common/forms/FormFieldContext';
import { ClientPartnerLocation } from 'src/interfaces';

interface LocationForm2Props {
  value: ClientPartnerLocation[];
  onChange: (value: ClientPartnerLocation[]) => void;
}

export const LocationSelect = ({ value, onChange }: LocationForm2Props) => {
  const { id, name, valid } = useContext(FormFieldContext);
  const { t } = useTranslation();
  const { countries, provinceMap } = useMemo(() => {
    const countries: string[] = [];
    const provinceMap: Record<string, string[]> = {};
    CountryRegionData.forEach(([country, _countryCode, provinces]) => {
      countries.push(country);
      provinceMap[country] = provinces.split('|').map((province) => province.split('~')[0]);
    });
    return { countries, provinceMap };
  }, []);

  const selectedCountries = useMemo(() => {
    const countries = value.map((location) => location.country);
    countries.sort();
    return countries;
  }, [value]);

  const onCountryChange = (countries: string[]) => {
    const existing = new Set<string>(value.map((location) => location.country));
    const toDelete = new Set<string>(existing);
    const toAdd = new Set<string>();
    const toKeep = new Set<string>();

    countries.forEach((country) => {
      toDelete.delete(country);
      if (!existing.has(country)) {
        toAdd.add(country);
      } else {
        toKeep.add(country);
      }
    });

    const newLocations = value.filter((location) => !toDelete.has(location.country));
    toAdd.forEach((country) => newLocations.push({ country: country, provinces: [] }));
    newLocations.sort((a, b) => a.country.localeCompare(b.country));
    onChange(newLocations);
  };

  const onProvinceChange = (location: { country: string; provinces: string[] }, provinces: string[]) => {
    const index = value.indexOf(location);
    if (index !== undefined) {
      const newLocations = [...value];
      const newLocation: { country: string; provinces: string[] } = {
        country: location.country,
        provinces: provinces,
      };
      newLocations[index] = newLocation;
      onChange(newLocations);
    }
  };

  const countrySelect = (
    <FormField
      id={`${id}-country-select`}
      name={`${name}CountrySelect`}
      label={t('profile.locations')}
      error={!valid && value.length === 0 ? '' : undefined}
      disableHelpTextAllocation
      required
    >
      <MultiSelectInput
        placeholder={t('placeholder.select-countries')}
        value={selectedCountries}
        onChange={onCountryChange}
      >
        {countries.map((country) => (
          <SelectOption key={country} value={country} label={country}>
            {country}
          </SelectOption>
        ))}
      </MultiSelectInput>
    </FormField>
  );

  const provinceSelects = value.map((location) => {
    const { country, provinces } = location;
    const selectId = `${id}-${encodeURIComponent(country)}-province-select`;
    const selectName = `${name}${encodeURIComponent(country)}ProvinceSelect`;
    return (
      <FormField
        key={country}
        id={selectId}
        name={selectName}
        label={country}
        disableHelpTextAllocation
        error={!valid && provinces.length === 0 ? t('warnings.province-required') : undefined}
      >
        <MultiSelectInput
          placeholder={t('placeholder.select-province')}
          value={provinces}
          onChange={(provinces) => onProvinceChange(location, provinces)}
        >
          {provinceMap[country].map((province) => (
            <SelectOption key={province} value={province} label={province}>
              {province}
            </SelectOption>
          ))}
        </MultiSelectInput>
      </FormField>
    );
  });

  return (
    <FormFieldGroup>
      {countrySelect}

      <div className="p-4 border border-gray-500 border-dashed">
        {provinceSelects.length === 0 && <div className="text-gray-500 text-center">{t('profile.select-country')}</div>}
        <FormFieldGroup>{provinceSelects}</FormFieldGroup>
      </div>
    </FormFieldGroup>
  );
};
