import { OptionProps } from 'antd/lib/select';

type SelectOptionProps = OptionProps;
export const SelectOption = (props: SelectOptionProps) => <option value={props.value}>{props.children}</option>;
SelectOption.displayName = 'MockSelectOption';
