import { PropsWithChildren } from 'react';

export const OnboardingHeader = (props: PropsWithChildren<any>) => (
  <h1 className="w-full md:w-3/4 mx-auto mb-2 font-light text-center">{props.children}</h1>
);
