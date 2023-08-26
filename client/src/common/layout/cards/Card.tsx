import { PropsWithChildren } from 'react';

export const Card = (props: PropsWithChildren<any>) => <div className="bg-white rounded-xl">{props.children}</div>;

export const CardBody = (props: PropsWithChildren<any>) => <div className={`p-6 ${props.className}`} >{props.children}</div>;

export const CardTitles = (props: PropsWithChildren<any>) => (
  <div className="flex flex-col gap-1">{props.children}</div>
);

export const CardTitle = (props: PropsWithChildren<any>) => (
  <div className={`text-2xl font-light text-neutral-700 ${props.className}`} role="heading" aria-level={1}>
    {props.children}
  </div>
);

export const CardSubtitle = (props: PropsWithChildren<any>) => <div className={`text-xs ${props.className}`}>{props.children}</div>;
