import { ReactNode } from 'react';

interface CallToActionCardProps {
  image: string;
  title?: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
}
export const CallToActionCard = ({ image, title, body, action }: CallToActionCardProps) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="h-36 bg-cover bg-center bg-no-repeat rounded-t-xl bg-neutral-900 bg-opacity-25 bg-blend-overlay"
      />
      <div className="flex flex-col gap-2 flex-grow pt-3 pb-5 px-6 text-center">
        {title && <h2 className="m-0 text-2xl font-bold">{title}</h2>}

        {body && <div className="flex-grow">{body}</div>}

        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  );
};
