import { render, screen } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';

import App from 'src/App';
import i18n from 'src/mocks/i18nForTests';

test('renders learn react link', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
  const linkElement = screen.getByText('Powered by Devvio');
  expect(linkElement).toBeInTheDocument();
});
