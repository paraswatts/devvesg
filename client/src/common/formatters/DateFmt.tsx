import { ReactNode, useCallback, useMemo, useRef } from 'react';

export const dateFmt = (value?: Date, options?: Intl.DateTimeFormatOptions, locale?: string | string[]) => {
  if (value === undefined) {
    return '';
  }
  return Intl.DateTimeFormat(locale, options).format(value);
};

export const useDateFmt = (options?: Intl.DateTimeFormatOptions, locale?: string | string[]) => {
  const ref = useRef(Intl.DateTimeFormat(locale, options));
  return useCallback((value?: Date) => {
    if (value === undefined) {
      return '';
    }
    return ref.current.format(value);
  }, []);
};

interface DateFmtProps extends Intl.DateTimeFormatOptions {
  value?: Date;
  locale?: string | string[];
  fallback?: ReactNode;
}
export const DateFmt = ({ value, fallback, locale, ...options }: DateFmtProps) => {
  const {
    calendar,
    dateStyle,
    day,
    dayPeriod,
    era,
    fractionalSecondDigits,
    hour12,
    hour,
    hourCycle,
    minute,
    month,
    numberingSystem,
    second,
    timeStyle,
    timeZone,
    timeZoneName,
    weekday,
    year,
  } = options;
  const formatter = useMemo(() => {
    return Intl.DateTimeFormat(locale, {
      calendar,
      dateStyle,
      day,
      dayPeriod,
      era,
      fractionalSecondDigits,
      hour12,
      hour,
      hourCycle,
      minute,
      month,
      numberingSystem,
      second,
      timeStyle,
      timeZone,
      timeZoneName,
      weekday,
      year,
    });
  }, [
    locale,
    calendar,
    dateStyle,
    day,
    dayPeriod,
    era,
    fractionalSecondDigits,
    hour12,
    hour,
    hourCycle,
    minute,
    month,
    numberingSystem,
    second,
    timeStyle,
    timeZone,
    timeZoneName,
    weekday,
    year,
  ]);

  if (value === undefined) {
    if (fallback) {
      return <>{fallback}</>;
    } else {
      return <></>;
    }
  }

  if (!(value instanceof Date)) {
    // TODO: remove this once we replace all date returning endpoints with graphql
    value = new Date(value);
  }

  return <>{formatter.format(value)}</>;
};
