import { ComponentPropsWithoutRef, forwardRef, useContext } from 'react';

import { Controller } from 'react-hook-form';

import { FormFieldContext } from 'src/common/forms/FormFieldContext';
import { HookControlProps } from 'src/common/forms/interfaces';

import commonStyle from 'src/common/forms/CommonInput.module.css';
import style from 'src/common/forms/TextAreaInput.module.css';

interface TextAreaInputProps extends ComponentPropsWithoutRef<'textarea'> {}
export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>((props: TextAreaInputProps, ref) => {
  const { id, name, valid, describedBy } = useContext(FormFieldContext);
  return (
    <textarea
      ref={ref}
      id={id}
      className={`${commonStyle.commonInput} ${style.textarea}`}
      name={name}
      aria-invalid={!valid}
      aria-describedby={describedBy}
      {...props}
    />
  );
});

type TextAreaHookInputProps = TextAreaInputProps & HookControlProps;
export const TextAreaHookInput = ({ control, rules, ...rest }: TextAreaHookInputProps) => {
  const { name } = useContext(FormFieldContext);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => <TextAreaInput {...rest} {...field} />}
    />
  );
};
