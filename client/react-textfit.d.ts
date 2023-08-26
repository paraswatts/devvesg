import React from 'react';

interface Props {
  text?: string;
  min?: number;
  max?: number;
  mode?: 'single' | 'multi';
  forceSingleModeWidth?: boolean;
  throttle?: number;
  onReady?: (number) => void;
}

declare module 'react-textfit' {
  export declare class Textfit extends React.Component<Props> {}
  export default Textfit;
}
