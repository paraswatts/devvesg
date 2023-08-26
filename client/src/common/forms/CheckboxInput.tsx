import { ComponentPropsWithoutRef, ReactNode, forwardRef, useContext } from 'react';

import { Controller } from 'react-hook-form';

import { FormFieldContext } from 'src/common/forms/FormFieldContext';
import { HookControlProps } from 'src/common/forms/interfaces';

import style from 'src/common/forms/CheckboxInput.module.css';

interface CheckboxInputProps extends ComponentPropsWithoutRef<'input'> {
  label?: ReactNode;
}
export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ label, ...rest }: CheckboxInputProps, ref) => {
    const { id, name, valid, describedBy } = useContext(FormFieldContext);
    const input = (
      <input
        ref={ref}
        type="checkbox"
        id={id}
        className={style.checkboxInput}
        name={name}
        aria-invalid={!valid}
        aria-describedby={describedBy}
        {...rest}
      />
    );
    if (label) {
      return (
        <div className="flex gap-2 items-center">
          {input}
          <label htmlFor={id}>{label}</label>
        </div>
      );
    } else {
      return input;
    }
  },
);

type CheckboxHookInputProps = CheckboxInputProps & HookControlProps;
export const CheckboxHookInput = ({ control, rules, ...rest }: CheckboxHookInputProps) => {
  const { name } = useContext(FormFieldContext);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <CheckboxInput {...rest} defaultChecked={value} onClick={(evt) => onChange(!value)} />
      )}
    />
  );
};
