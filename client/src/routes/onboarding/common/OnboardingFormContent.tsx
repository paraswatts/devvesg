import { PropsWithChildren } from 'react';

export const OnboardingFormContent = (props: PropsWithChildren<any>) => (
  <div className="w-full md:w-1/2 m-auto">{props.children}</div>
);
