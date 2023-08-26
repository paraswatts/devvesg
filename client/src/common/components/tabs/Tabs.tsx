import React, { PropsWithChildren } from 'react';

export const Tabs = React.memo((props: PropsWithChildren<any>) => {
  const { children } = props;
  return <div className="flex w-full">{children}</div>;
});
