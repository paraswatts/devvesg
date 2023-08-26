import { PropsWithChildren } from 'react';

interface ServiceBadgeProps {
  name: string;
}

export const ServiceBadge = (props: ServiceBadgeProps) => (
  <span className="text-xs py-0.5 px-2.5 border text-neutral-700 border-neutral-700 rounded">{props.name}</span>
);

export const ServiceBadges = ({ children }: PropsWithChildren<any>) => (
  <div className="flex flex-wrap gap-2">{children}</div>
);
