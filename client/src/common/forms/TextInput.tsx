import { ComponentPropsWithoutRef, forwardRef, useContext } from 'react';

import { Controller } from 'react-hook-form';

import { FormFieldContext } from 'src/common/forms/FormFieldContext';
import { HookControlProps } from 'src/common/forms/interfaces';

import commonStyle from 'src/common/forms/CommonInput.module.css';

interface TextInputProps extends ComponentPropsWithoutRef<'input'> {}
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props: TextInputProps, ref) => {
  const { id, name, valid, describedBy } = useContext(FormFieldContext);
  const { type = 'text', ...rest } = props;
  return (
    <input
      ref={ref}
      type={type}
      id={id}
      className={commonStyle.commonInput}
      name={name}
      aria-invalid={!valid}
      aria-describedby={describedBy}
      {...rest}
    />
  );
});

type TextHookInputProps = TextInputProps & HookControlProps;
export const TextHookInput = ({ control, rules, ...rest }: TextHookInputProps) => {
  const { name } = useContext(FormFieldContext);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => <TextInput {...rest} {...field} />}
    />
  );
};
