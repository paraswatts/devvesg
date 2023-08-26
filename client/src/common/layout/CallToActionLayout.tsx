import { PropsWithChildren, ReactNode } from 'react';

interface CallToActionLayoutProps {
  ctas?: ReactNode[];
}
export const CallToActionLayout = ({ ctas, children }: PropsWithChildren<CallToActionLayoutProps>) => {
  return (
    <div className="flex flex-col xl:flex-row gap-4">
      <div className="flex-grow">{children}</div>

      {ctas && ctas.length > 0 && (
        <div className="flex flex-col gap-5 w-full xl:w-80">
          {ctas.map((cta, index) => (
            <div key={index}>{cta}</div>
          ))}
        </div>
      )}
    </div>
  );
};
