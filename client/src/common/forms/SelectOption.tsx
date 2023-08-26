import { Select } from 'antd';
import { OptionProps } from 'antd/lib/select';
const { Option } = Select;

type SelectOptionProps = OptionProps;
export const SelectOption = (props: SelectOptionProps) => <Option {...props} />;
