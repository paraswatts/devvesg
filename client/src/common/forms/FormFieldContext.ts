import { createContext } from 'react';

export interface FormFieldContextValue {
  id: string;
  name: string;
  valid?: boolean;
  describedBy?: string;
}
export const FormFieldContext = createContext<FormFieldContextValue>({
  id: '',
  name: '',
  describedBy: '',
});
