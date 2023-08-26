import React, { ComponentPropsWithoutRef } from 'react';

import clsx from 'clsx';
import { FieldError, FormState } from 'react-hook-form';

import { get } from 'src/common/util';

import styles from 'src/routes/auth/Auth.module.scss';

// @Deprecated
type InputProps = ComponentPropsWithoutRef<'input'> & Partial<Pick<FormState<any>, 'errors' | 'isSubmitted'>>;
export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, errors, isSubmitted, ...rest } = props;
  let errorMessage;
  if (isSubmitted && errors) {
    errorMessage = get<FieldError>(errors, rest?.name)?.message;
  }
  const isInvalid = Boolean(errorMessage);
  return (
    <>
      <input
        ref={ref}
        className={clsx('block w-full p-4 border-gray-500', isInvalid && styles.inputInvalid, className)}
        aria-invalid={isInvalid}
        {...rest}
      />
      {isInvalid && <div className="text-red-500 text-xs">{errorMessage}</div>}
    </>
  );
});
