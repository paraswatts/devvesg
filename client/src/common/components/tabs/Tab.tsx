import React, { ReactNode } from 'react';

import clsx from 'clsx';
import { Link, useMatch } from 'react-router-dom';

interface TabProps {
  active?: boolean;
  label: ReactNode;
  to: string;
}

export const Tab = React.memo((props: TabProps) => {
  const { label, to } = props;
  const matches = useMatch(to);

  return (
    <Link
      to={to}
      className={clsx(
        'p-4 text-center text-neutral-600 no-underline',
        matches && 'border-b-4 border-blue-500 text-blue-500',
      )}
    >
      {label}
    </Link>
  );
});
