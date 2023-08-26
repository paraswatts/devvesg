import { PropsWithChildren } from 'react';

interface LogoDecoratorProps {
  name: string;
  logo?: string | null;
}
export const LogoDecorator = ({ name, logo, children }: PropsWithChildren<LogoDecoratorProps>) => {
  if (!logo) {
    return <>{children}</>;
  }

  return (
    <span className="flex gap-2 items-center">
      {logo && <img className="w-10" src={logo} alt={`${name} logo`} />}
      <span>{children}</span>
    </span>
  );
};
