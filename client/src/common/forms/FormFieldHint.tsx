import { PropsWithChildren } from 'react';

import style from 'src/common/forms/FormFieldLabel.module.css';

interface FormFieldLabelProps {
  id: string;
  rightText?: string
}
export const FormFieldHint = ({ id, children, rightText }: PropsWithChildren<FormFieldLabelProps>) => {
  return (
    <label htmlFor={id} className={style.formFieldHint}>
      <span>{children}</span>{rightText && <span>{rightText}</span>}
    </label>
  );
};
