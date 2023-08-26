import React, { PropsWithChildren } from 'react';

interface ShowProps {
  show?: boolean;
}

export const Show = React.memo((props: PropsWithChildren<ShowProps>) => {
  if (!props.show) {
    return null;
  }
  return <>{props.children}</>;
});
