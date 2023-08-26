import { useEffect } from 'react';

import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

import { NftStatuses } from 'src/api';
import { ClientPartnerLocation } from 'src/interfaces';

export const passwordsMatch = (newPassword: string, newPasswordConfirm: string) => {
  return newPassword === newPasswordConfirm;
};

export const passwordMeetsRequirements = (password: string) => {
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return new RegExp(passwordRegex).test(password);
};

export const getDomainFromEmail = (email: string) => {
  return email.split('@')[1];
};

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
      const gaId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID || '';
      ReactGA.initialize(gaId);
      ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
    }
  }, [location]);
};

/**
 * A native alternative to lodash.get. Fetch deeply nested values from an object.
 *
 * Example: get(obj, 'foo.bar[3].baz');
 *
 * From: https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
 *
 * @param obj The object to pull a value from
 * @param path The path to the value
 * @param defaultValue A fallback if
 * @returns The value at the path, or the default value
 */
export const get = <T>(obj: any, path?: string, defaultValue: T | undefined = undefined): T | undefined => {
  if (!path) {
    return defaultValue;
  }
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

export const getValidDateOrNull = (date: Date) => {
  return date !== null && new Date(date).toString() !== 'Invalid Date' ? new Date(date) : null;
};

export const noop = () => { };

export const locationsFlatten = (locations: ClientPartnerLocation[]): { country: string; province: string }[] => {
  const flattened: { country: string; province: string }[] = [];
  locations.forEach(({ country, provinces }) => {
    provinces.forEach((province) => {
      flattened.push({ country, province });
    });
  });
  return flattened;
};

export const locationsUnflatten = (locations: { country: string; province: string }[]): ClientPartnerLocation[] => {
  const mapByCountry: Record<string, string[]> = {};
  locations.forEach((location) => {
    if (!mapByCountry[location.country]) {
      mapByCountry[location.country] = [];
    }
    mapByCountry[location.country].push(location.province);
  });

  const unflattened: ClientPartnerLocation[] = [];
  for (const country in mapByCountry) {
    const provinces = mapByCountry[country];
    provinces.sort();
    unflattened.push({ country, provinces });
  }

  unflattened.sort((a, b) => a.country.localeCompare(b.country));
  return unflattened;
};

export const statusBadgeColor = (status: any) => {
  if (status === NftStatuses.DECLINED)
    return "red";
  else if (status === NftStatuses.APPROVED)
    return "light-green";
  else if (status === NftStatuses.UNDER_REVIEW)
    return "orange";
  else if (status === NftStatuses.OWNED)
    return "blue";
  else if (status === NftStatuses.RETIRED)
    return "grey";
  else if (status === NftStatuses.LISTED_FOR_SALE)
    return "black";
  else
    return "gray";
}

export const getNftStatus = (statusCode: string) => {
  let displayText: string = statusCode.slice(0, 1);
  if (statusCode.includes("_")) displayText += statusCode.slice(1).replaceAll("_", " ").toLocaleLowerCase();
  else displayText += statusCode.slice(1).toLocaleLowerCase();
  return displayText;
}

export function sortArray(arr: any[], key: string) {
  return arr.sort(function (a, b) {
    var keyA = a[key],
      keyB = b[key];
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
}