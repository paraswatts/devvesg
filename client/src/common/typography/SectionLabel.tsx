import { PropsWithChildren } from 'react';

export const SectionLabel = ({ children }: PropsWithChildren<any>) => (
  <span className="uppercase font-bold">{children}</span>
);
