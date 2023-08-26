import { PropsWithChildren } from 'react';

export const FormFieldGroup = ({ children }: PropsWithChildren<any>) => (
  <div className="flex flex-col gap-2">{children}</div>
);
