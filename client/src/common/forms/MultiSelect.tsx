import { useContext } from 'react';

import { Select, SelectProps } from 'antd';

import { FormFieldContext } from 'src/common/forms/FormFieldContext';

import commonStyle from 'src/common/forms/CommonInput.module.css';
import style from 'src/common/forms/SelectInput.module.css';

type MultiSelectInputProps = Omit<SelectProps, 'mode'>;
export const MultiSelect = (props: MultiSelectInputProps) => {
  const { id, describedBy } = useContext(FormFieldContext);

  return (
    <div className="antd-scope">
      <Select
        id={id}
        dropdownClassName="antd-scope"
        className={`form-select ${commonStyle.commonInput} ${style.selectInput}`}
        aria-invalid={false}
        aria-describedby={describedBy}
        {...props}
        transitionName=""
        mode="multiple"
      />
    </div>
  );
};

