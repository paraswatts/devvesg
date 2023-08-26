import React from 'react';

// @Deprecated
export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    return (
      <select ref={ref} className={`block w-full p-4 border-gray-500 ${className ? className : ''}`} {...rest}>
        {children}
      </select>
    );
  },
);
