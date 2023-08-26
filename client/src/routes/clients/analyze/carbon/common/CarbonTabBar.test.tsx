import { screen } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { CarbonTabBar } from 'src/routes/clients/analyze/carbon/common/CarbonTabBar';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  };
});

describe('CarbonTabBar', () => {
  const renderPage = testRenderer(
    <I18nextProvider i18n={i18n}>
      <CarbonTabBar />
    </I18nextProvider>,
  );
  test('renders', () => {
    renderPage();
    expect(screen.getByText('Carbon Impact')).toBeInTheDocument();
    expect(screen.getByText('Carbon Calculator')).toBeInTheDocument();
    expect(screen.getByText('Impact History')).toBeInTheDocument();
  });

  test('links to the appropriate path', async () => {
    renderPage();
    const carbonImpactLink = screen.getByRole('link', { name: 'Carbon Impact' });
    const carbonCalculatorLink = screen.getByRole('link', { name: 'Carbon Calculator' });
    const impactHistoryLink = screen.getByRole('link', { name: 'Impact History' });
    expect(carbonImpactLink).toHaveAttribute('href', '/clients/mock-client-uuid/analyze/carbon/impact');
    expect(carbonCalculatorLink).toHaveAttribute('href', '/clients/mock-client-uuid/analyze/carbon/calculator');
    expect(impactHistoryLink).toHaveAttribute('href', '/clients/mock-client-uuid/analyze/carbon/impact-history');
  });
});
