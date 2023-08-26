import React from 'react';

// @Deprecated
export const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    const { className, ...rest } = props;
    return <input ref={ref} className={`mr-2 rounded-sm ${className ? className : ''}`} {...rest} type="checkbox" />;
  },
);
