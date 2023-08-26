import { ComponentPropsWithoutRef, forwardRef, useContext } from 'react';

import { Controller } from 'react-hook-form';

import { FormFieldContext } from 'src/common/forms/FormFieldContext';
import { HookControlProps } from 'src/common/forms/interfaces';

interface MultiSelectInputProps extends ComponentPropsWithoutRef<'select'> {}
export const MultiSelectInput = forwardRef<HTMLSelectElement, MultiSelectInputProps>(
  (props: MultiSelectInputProps, ref) => {
    const { id, name, valid, describedBy } = useContext(FormFieldContext);
    const { children, onChange, ...rest } = props;
    // @ts-ignore
    delete rest.optionFilterProp;
    // @ts-ignore
    delete rest.showSearch;
    return (
      <select
        ref={ref}
        id={id}
        name={name}
        aria-invalid={!valid}
        aria-describedby={describedBy}
        {...rest}
        multiple
        onChange={(event) =>
          // @ts-ignore
          onChange(Array.from(event.target.querySelectorAll('option:checked')).map((x: any) => x.value))
        }
      >
        {children}
      </select>
    );
  },
);
MultiSelectInput.displayName = 'MockMultiSelectInput';

type MultiSelectHookInputProps = MultiSelectInputProps & HookControlProps;
export const MultiSelectHookInput = ({ control, rules, ...rest }: MultiSelectHookInputProps) => {
  const { id, name } = useContext(FormFieldContext);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <MultiSelectInput id={id} {...field}>
          {rest.children}
        </MultiSelectInput>
      )}
    />
  );
};
MultiSelectHookInput.displayName = 'MockMultiSelectHookInput';
