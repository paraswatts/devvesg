import { PropsWithChildren } from 'react';

export const OnboardingSubHeader = (props: PropsWithChildren<any>) => (
  <p className="w-full md:w-3/4 mx-auto mb-8 font-light text-gray-500 text-center">{props.children}</p>
);
