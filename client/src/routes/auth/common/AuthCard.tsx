import { PropsWithChildren } from 'react';

export const AuthCard = (props: PropsWithChildren<any>) => (
  <div className="p-6 rounded-xl bg-white">{props.children}</div>
);
