import { screen } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';

import { Footer } from 'src/common/skeleton/Footer';
import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';


describe('Footer', () => {
  const renderPage = testRenderer(
    <I18nextProvider i18n={i18n}>
      <Footer />
    </I18nextProvider>
  );
  test('it renders', () => {
    renderPage();
    expect(screen.getByText('Powered by Devvio')).toBeInTheDocument();
  });
});
