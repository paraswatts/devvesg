import React from 'react';

// @Deprecated
export const RadioButton = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    const { className, ...rest } = props;
    return <input ref={ref} className={`mr-2 ${className ? className : ''}`} {...rest} type="radio" />;
  },
);
