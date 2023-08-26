import { screen } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { LaunchpadContainer } from 'src/routes/clients/launchpad/LaunchpadContainer';

describe('LaunchpadContainer', () => {
  const renderPage = testRenderer(<I18nextProvider i18n={i18n}><LaunchpadContainer /></I18nextProvider>);
  test('renders', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Analyze' })).toBeInTheDocument();
    expect(
      screen.getByText(
        "Calculate your carbon footprint, determine your ESG score, and get insight into your organization's risk.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Improve' })).toBeInTheDocument();
    expect(
      screen.getByText(
        'Reduce your impact by running guided initiatives and projects or by directly purchasing offset credits.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Report' })).toBeInTheDocument();
    expect(
      screen.getByText(
        'Keep all of your internal and external stakeholders informed of your progress using custom or industry standard ESG reports and dashboards.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("What's Carbon Footprint?")).toBeInTheDocument();
    expect(screen.getByText("What's an Initiative?")).toBeInTheDocument();
  });

  test('renders action children properly', () => {
    renderPage();
    const carbonOutputLink = screen.getByRole('link', { name: 'Calculate my Carbon Footprint' });
    expect(carbonOutputLink).toHaveAttribute('href', '/clients/mock-client-uuid/analyze/carbon/calculator');
    const startInitiativeLink = screen.getByRole('link', { name: 'Start an Initiative' });
    expect(startInitiativeLink).toHaveAttribute('href', '/clients/mock-client-uuid/initiatives/new');
  });
});
