import { PropsWithChildren } from 'react';

export const OnboardingCard = (props: PropsWithChildren<any>) => (
  <div className="w-full my-4 p-6 rounded-xl bg-white">{props.children}</div>
);
