import { PropsWithChildren, ReactNode, useMemo } from 'react';

import clsx from 'clsx';

import { FormFieldContext, FormFieldContextValue } from 'src/common/forms/FormFieldContext';
import { FormFieldLabel } from 'src/common/forms/FormFieldLabel';

import { FormFieldHint } from './FormFieldHint';

interface FormFieldProps {
  id: string;
  name: string;
  label?: ReactNode;
  labelSrOnly?: boolean;
  preFieldContent?: ReactNode;
  postFieldContent?: ReactNode;
  error?: ReactNode;
  description?: ReactNode;
  disableHelpTextAllocation?: boolean;
  required?: boolean;
  hint?: ReactNode
  rightText?: string;
}
export const FormField = ({
  id,
  name,
  label,
  labelSrOnly,
  preFieldContent,
  postFieldContent,
  error,
  description,
  disableHelpTextAllocation,
  required,
  children,
  hint,
  rightText
}: PropsWithChildren<FormFieldProps>) => {
  const valid = error === undefined;
  const describedBy = useMemo<string>(() => formFieldDescribedById(id), [id]);
  const contextValue = useMemo<FormFieldContextValue>(
    () => ({
      id,
      name,
      valid,
      describedBy: Boolean(error || description) ? describedBy : undefined,
    }),
    [id, name, error, description, valid, describedBy],
  );

  return (
    <FormFieldContext.Provider value={contextValue}>
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <FormFieldLabel id={id} required={required} srOnly={labelSrOnly}>
            {label}
          </FormFieldLabel>
        )}

        {preFieldContent && <div>{preFieldContent}</div>}
        <div>{children}</div>
        {postFieldContent && <div>{postFieldContent}</div>}
        {/* TODO min height should match the line height of the a single line of description / error text */}
        <div
          id={describedBy}
          className={clsx('text-xs text-neutral-700 mb-4', { 'min-h-[1rem]': !disableHelpTextAllocation })}
        >
          {!valid && <span className="text-red-500 b-6">{error}</span>}
          {valid && <FormFieldHint id={id} rightText={rightText}>
            {description}
          </FormFieldHint>}
        </div>
      </div>
    </FormFieldContext.Provider>
  );
};

function formFieldDescribedById(id: string) {
  return `field-desc-${id}`;
}
