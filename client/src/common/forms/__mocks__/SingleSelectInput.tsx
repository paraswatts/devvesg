import { ComponentPropsWithoutRef, forwardRef, useContext } from 'react';

import { Controller } from 'react-hook-form';

import { FormFieldContext } from 'src/common/forms/FormFieldContext';
import { HookControlProps } from 'src/common/forms/interfaces';

interface SingleSelectInputProps extends ComponentPropsWithoutRef<'select'> {}
export const SingleSelectInput = forwardRef<HTMLSelectElement, SingleSelectInputProps>(
  (props: SingleSelectInputProps, ref) => {
    const { id, name, valid, describedBy } = useContext(FormFieldContext);
    const { children, ...rest } = props;
    // @ts-ignore
    delete rest.optionFilterProp;
    // @ts-ignore
    delete rest.showSearch;
    return (
      <select ref={ref} id={id} name={name} aria-invalid={!valid} aria-describedby={describedBy} {...rest}>
        {children}
      </select>
    );
  },
);
SingleSelectInput.displayName = 'MockSingleSelectInput';

type SingleSelectHookInputProps = SingleSelectInputProps & HookControlProps;
export const SingleSelectHookInput = ({ control, rules, ...rest }: SingleSelectHookInputProps) => {
  const { id, name } = useContext(FormFieldContext);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <SingleSelectInput id={id} {...field}>
          {rest.children}
        </SingleSelectInput>
      )}
    />
  );
};
SingleSelectHookInput.displayName = 'MockSingleSelectHookInput';
