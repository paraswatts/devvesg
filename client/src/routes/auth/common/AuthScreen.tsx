import { PropsWithChildren } from 'react';

import devvEsgLogo from 'src/assets/images/devvesg.svg';

export const AuthScreen = (props: PropsWithChildren<any>) => (
  <div className="w-full sm:max-w-lg mx-auto">
    <img src={devvEsgLogo} alt="DevvESG" className="w-3/4 mx-auto my-8" />

    {props.children}
  </div>
);
