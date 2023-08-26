import { ComponentPropsWithoutRef, forwardRef, useContext } from 'react';

import { Controller } from 'react-hook-form';

import { FormFieldContext } from 'src/common/forms/FormFieldContext';
import { HookControlProps } from 'src/common/forms/interfaces';

import commonStyle from 'src/common/forms/CommonInput.module.css';
import style from 'src/common/forms/SelectInput.module.css';

interface SelectInputProps extends ComponentPropsWithoutRef<'select'> {}
export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>((props: SelectInputProps, ref) => {
  const { id, name, valid, describedBy } = useContext(FormFieldContext);
  const { children, ...rest } = props;
  return (
    <select
      ref={ref}
      id={id}
      name={name}
      aria-invalid={!valid}
      aria-describedby={describedBy}
      className={`${commonStyle.commonInput} ${style.selectNativeInput}`}
      {...rest}
    >
      {children}
    </select>
  );
});

type SelectHookInputProps = SelectInputProps & HookControlProps;
export const SelectHookInput = ({ control, rules, ...rest }: SelectHookInputProps) => {
  const { name } = useContext(FormFieldContext);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => <SelectInput {...rest} {...field} />}
    />
  );
};
