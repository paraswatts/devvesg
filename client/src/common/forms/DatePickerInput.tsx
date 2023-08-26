import { useContext } from 'react';

import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';

import { FormFieldContext } from 'src/common/forms/FormFieldContext';
import { HookControlProps } from 'src/common/forms/interfaces';

import commonStyle from 'src/common/forms/CommonInput.module.css';

type DatePickerInputProps = ReactDatePickerProps;
export const DatePickerInput = (props: DatePickerInputProps) => {
  const { id, valid, describedBy } = useContext(FormFieldContext);

  return (
    <DatePicker
      className={commonStyle.commonInput}
      id={id}
      aria-invalid={!valid}
      aria-describedby={describedBy}
      {...props}
    />
  );
};

type DatePickerHookInputProps = Omit<DatePickerInputProps, 'onChange' | 'selected'> & HookControlProps;
export const DatePickerHookInput = ({ control, rules, ...rest }: DatePickerHookInputProps) => {
  const { name } = useContext(FormFieldContext);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <DatePickerInput {...rest} selected={value} onChange={(date) => onChange(date)} />
      )}
    />
  );
};
