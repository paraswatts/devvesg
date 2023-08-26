import { ComponentPropsWithoutRef, forwardRef, useContext } from 'react';

import { FormFieldContext } from 'src/common/forms/FormFieldContext';

import commonStyle from 'src/common/forms/CommonInput.module.css';

interface TextInputProps extends ComponentPropsWithoutRef<'input'> { }
export const TextNumberInput = forwardRef<HTMLInputElement, TextInputProps>((props: TextInputProps, ref) => {
  const { id, name, describedBy } = useContext(FormFieldContext);
  const { type = 'text', ...rest } = props;
  return (
    <input
      ref={ref}
      type={type}
      id={id}
      className={commonStyle.commonInput}
      name={name}
      aria-invalid={false}
      aria-describedby={describedBy}
      {...rest}
      min={0}
      max={100}
    />
  );
});
