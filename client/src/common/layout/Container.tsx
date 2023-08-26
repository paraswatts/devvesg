import { ComponentPropsWithoutRef, forwardRef } from 'react';

import clsx from 'clsx';

export const Container = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>((props, ref) => {
  const { className } = props;
  return (
    <div ref={ref} className={clsx('w-full max-w-7xl mx-auto', className)}>
      {props.children}
    </div>
  );
});
