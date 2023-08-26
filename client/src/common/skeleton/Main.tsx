import { PropsWithChildren } from 'react';

import { Container } from 'src/common/layout/Container';

export const Main = ({ children }: PropsWithChildren<any>) => {
  return <Container className="flex flex-grow mt-16 p-4">{children}</Container>;
};
