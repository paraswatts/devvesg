import { screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { BaselineTabBar } from './BaselineTabBar';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  };
});

describe('BaselineTabBar', () => {
  const renderPage = testRenderer(
    <I18nextProvider i18n={i18n}>
      <BaselineTabBar />
    </I18nextProvider>,
  );
  test('renders', () => {
    renderPage();

    expect(screen.getByText('ESG Score')).toBeInTheDocument();
    expect(screen.getByText('Questionnaire')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
  });

  test('links to the appropriate path', async () => {
    renderPage();
    const carbonImpactLink = screen.getByRole('link', { name: 'ESG Score' });
    const carbonCalculatorLink = screen.getByRole('link', { name: 'Questionnaire' });
    const impactHistoryLink = screen.getByRole('link', { name: 'History' });
    expect(carbonImpactLink).toHaveAttribute('href', '/clients/mock-client-uuid/analyze/esg-score/overview');
    expect(carbonCalculatorLink).toHaveAttribute('href', '/clients/mock-client-uuid/analyze/esg-score/questionnaire');
    expect(impactHistoryLink).toHaveAttribute('href', '/clients/mock-client-uuid/analyze/esg-score/history');
  });
});
