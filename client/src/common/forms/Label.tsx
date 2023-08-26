import React from 'react';

// @Deprecated
export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <label ref={ref} className={`block uppercase font-bold text-xs ${className ? className : ''}`} {...rest}>
      {children}
    </label>
  );
});

// @Deprecated
export const CheckboxLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    return (
      <label ref={ref} className={`block mb-2 ${className ? className : ''}`} {...rest}>
        {children}
      </label>
    );
  },
);
