import { render, screen } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { UnauthenticatedHeader } from 'src/common/skeleton/UnauthenticatedHeader';
import i18n from 'src/mocks/i18nForTests';

describe('UnauthenticatedHeader', () => {
  test('it renders', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <UnauthenticatedHeader userArea="foobar" />
      </I18nextProvider>,
      { wrapper: MemoryRouter },
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('foobar')).toBeInTheDocument();
  });
});
