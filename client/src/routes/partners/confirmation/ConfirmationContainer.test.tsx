import { render, screen } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { ConfirmationContainer } from 'src/routes/partners/confirmation/ConfirmationContainer';

describe('ConfirmationContainer', () => {
  test('it renders', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ConfirmationContainer />
      </I18nextProvider>,
    );
    expect(screen.getByText('Thank you for registering with DevvESG Platform')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', 'https://www.devvesg.com/');
  });
});
