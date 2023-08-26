import { PropsWithChildren } from 'react';

import clsx from 'clsx';

import style from 'src/common/forms/FormFieldLabel.module.css';

interface FormFieldLabelProps {
  id: string;
  required?: boolean;
  srOnly?: boolean;
}
export const FormFieldLabel = ({ id, required, srOnly, children }: PropsWithChildren<FormFieldLabelProps>) => {
  return (
    <label htmlFor={id} className={clsx(style.formFieldLabel, srOnly && 'sr-only')}>
      <span>{children}</span> {required && <span>*</span>}
    </label>
  );
};
