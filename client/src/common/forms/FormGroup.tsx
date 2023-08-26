import React from 'react';

// @Deprecated
export const FormGroup = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => {
  const { className, ...rest } = props;
  return <div ref={ref} className={`block mb-3 ${className ? className : ''}`} {...rest} />;
});
