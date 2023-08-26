import { ReactNode, useCallback, useMemo, useRef } from 'react';

export const numberFmt = (value?: number, options?: Intl.NumberFormatOptions, locale?: string | string[]) => {
  if (value === undefined) {
    return '';
  }
  return Intl.NumberFormat(locale, options).format(value);
};

export const useNumberFmt = (options?: Intl.NumberFormatOptions, locale?: string | string[]) => {
  const ref = useRef(Intl.NumberFormat(locale, options));
  return useCallback((value?: number) => {
    if (value === undefined) {
      return '';
    }
    return ref.current.format(value);
  }, []);
};

interface NumberFmtProps extends Intl.NumberFormatOptions {
  value?: number;
  locale?: string | string[];
  fallback?: ReactNode;
}
export const NumberFmt = ({ value, fallback, locale, ...options }: NumberFmtProps) => {
  const {
    compactDisplay,
    currency,
    currencyDisplay,
    currencySign,
    maximumFractionDigits,
    minimumFractionDigits,
    maximumSignificantDigits,
    minimumIntegerDigits,
    minimumSignificantDigits,
    notation,
    signDisplay,
    style,
    unit,
    unitDisplay,
    useGrouping,
  } = options;
  const formatter = useMemo(() => {
    return Intl.NumberFormat(locale, {
      compactDisplay,
      currency,
      currencyDisplay,
      currencySign,
      maximumFractionDigits,
      minimumFractionDigits,
      maximumSignificantDigits,
      minimumIntegerDigits,
      minimumSignificantDigits,
      notation,
      signDisplay,
      style,
      unit,
      unitDisplay,
      useGrouping,
    });
  }, [
    locale,
    compactDisplay,
    currency,
    currencyDisplay,
    currencySign,
    maximumFractionDigits,
    minimumFractionDigits,
    maximumSignificantDigits,
    minimumIntegerDigits,
    minimumSignificantDigits,
    notation,
    signDisplay,
    style,
    unit,
    unitDisplay,
    useGrouping,
  ]);

  if (value === undefined) {
    if (fallback) {
      return <>{fallback}</>;
    } else {
      return <></>;
    }
  }

  return <>{formatter.format(value)}</>;
};
