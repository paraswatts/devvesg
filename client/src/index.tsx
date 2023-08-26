/* istanbul ignore file */

import React, { Suspense } from 'react';

import ReactDOM from 'react-dom';

// Always place the global style import before App as we want all CSS modules to take precendence over globals
import 'src/index.scss';
import App from 'src/App';
import 'src/i18n';
import reportWebVitals from 'src/reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
