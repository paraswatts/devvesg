import { Control, ControllerProps } from 'react-hook-form';

export interface HookControlProps<FieldValues = any, FormContext extends object = object> {
  control: Control<FieldValues, FormContext>;
  rules?: ControllerProps<FieldValues>['rules'];
}
