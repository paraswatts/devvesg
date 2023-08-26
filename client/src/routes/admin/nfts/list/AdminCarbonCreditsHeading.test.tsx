import { cleanup, screen } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';

import { AdminCarbonCreditsHeading } from './AdminCarbonCreditsHeading';

afterEach(() => {
  cleanup();
});
jest.mock('src/api/actions', () => ({
  Api: {
    requirement: { all: jest.fn() },
  },
}));

describe('AdminCarbonCredits view header rendered', () => {
  const renderTest = testRenderer(
    <I18nextProvider i18n={i18n}>
      <AdminCarbonCreditsHeading />
    </I18nextProvider>,
  );
  test('Is render headings', () => {
    renderTest();
    expect(screen.getByTestId('h1')).toBeInTheDocument();
    expect(screen.getByTestId('h4')).toBeInTheDocument();
  });

  test('Validate Title', () => {
    renderTest();
    expect(screen.getByTestId('h1').innerHTML).toEqual('Credits Submissions');
  });
  test('Validate SubTitle', () => {
    renderTest();
    expect(screen.getByTestId('h4').innerHTML).toEqual('Review Credits Submissions');
  });
});
