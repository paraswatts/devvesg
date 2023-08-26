import { useContext } from 'react';

import { Select, SelectProps } from 'antd';
import { Controller } from 'react-hook-form';

import { FormFieldContext } from 'src/common/forms/FormFieldContext';
import { HookControlProps } from 'src/common/forms/interfaces';

import commonStyle from 'src/common/forms/CommonInput.module.css';
import style from 'src/common/forms/SelectInput.module.css';

type MultiSelectInputProps = Omit<SelectProps, 'mode'>;
export const MultiSelectInput = (props: MultiSelectInputProps) => {
  const { id, valid, describedBy } = useContext(FormFieldContext);

  return (
    <div className="antd-scope">
      <Select
        id={id}
        dropdownClassName="antd-scope"
        className={`form-select ${commonStyle.commonInput} ${style.selectInput}`}
        aria-invalid={!valid}
        aria-describedby={describedBy}
        {...props}
        transitionName=""
        mode="multiple"
        status={!valid ? 'error' : undefined}
      />
    </div>
  );
};

type MultiSelectHookInputProps = MultiSelectInputProps & HookControlProps;
export const MultiSelectHookInput = ({ control, rules, ...rest }: MultiSelectHookInputProps) => {
  const { name } = useContext(FormFieldContext);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <MultiSelectInput {...rest} value={value} onChange={(value: string[]) => onChange(value)} />
      )}
    />
  );
};
