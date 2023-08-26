import { screen } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { CarbonCreditsTabBar } from 'src/routes/clients/improve/carbon-credits/common/CarbonCreditsTabBar';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  };
});

describe('CarbonCreditsTabBar', () => {
  const renderPage = testRenderer(
    <I18nextProvider i18n={i18n}>
      <CarbonCreditsTabBar />
    </I18nextProvider>,
  );
  test('renders', () => {
    renderPage();

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Carbon Credits')).toBeInTheDocument();
    expect(screen.getByText('Add Credits')).toBeInTheDocument();
  });

  test('links to the appropriate path', async () => {
    renderPage();
    const carbonImpactLink = screen.getByRole('link', { name: 'Overview' });
    const carbonCalculatorLink = screen.getByRole('link', { name: 'Carbon Credits' });
    const impactHistoryLink = screen.getByRole('link', { name: 'Add Credits' });
    expect(carbonImpactLink).toHaveAttribute('href', '/clients/mock-client-uuid/improve/credits');
    expect(carbonCalculatorLink).toHaveAttribute('href', '/clients/mock-client-uuid/improve/credits/carbon-credits');
    expect(impactHistoryLink).toHaveAttribute('href', '/clients/mock-client-uuid/improve/credits/add');
  });
});
