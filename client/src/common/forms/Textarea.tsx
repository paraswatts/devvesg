import React from 'react';

// @Deprecated
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  (props, ref) => {
    const { className, ...rest } = props;
    return <textarea ref={ref} className={`block w-full ${className ? className : ''}`} {...rest} />;
  },
);
