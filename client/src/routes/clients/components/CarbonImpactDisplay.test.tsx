import { screen } from '@testing-library/react';

import { testRenderer } from 'src/mocks/renderer';
import { CarbonImpactDisplayComponent } from 'src/routes/clients/components/CarbonImpactDisplay';

describe('CarbonImpactDisplay', () => {
  test('renders with dashes when no inputs are provided', () => {
    const renderPage = testRenderer(<CarbonImpactDisplayComponent />);
    renderPage();
    expect(screen.getAllByText('—').length).toBe(2);
  });

  test('renders with a dash for carbon impact total when only a date is provided', () => {
    const date = new Date(2000, 0, 1);
    const renderPage = testRenderer(<CarbonImpactDisplayComponent lastUpdated={date} />);
    renderPage();
    expect(screen.getAllByText('—').length).toBe(1);
    expect(screen.getByText('01/01/2000')).toBeInTheDocument();
  });

  test('renders with a dash for last updated when only a total is provided', () => {
    const total = 1000;
    const renderPage = testRenderer(<CarbonImpactDisplayComponent value={total} />);
    renderPage();
    expect(screen.getAllByText('—').length).toBe(1);
    expect(screen.getByText('1,000')).toBeInTheDocument();
  });

  test('truncates totals to a single decimal point', () => {
    const total = 1000.123;
    const renderPage = testRenderer(<CarbonImpactDisplayComponent value={total} />);
    renderPage();
    expect(screen.getAllByText('—').length).toBe(1);
    expect(screen.getByText('1,000.1')).toBeInTheDocument();
  });

  test('renders both values when they are provided', () => {
    const date = new Date(2000, 0, 1);
    const total = 1000;
    const renderPage = testRenderer(<CarbonImpactDisplayComponent value={total} lastUpdated={date} />);
    renderPage();
    expect(screen.queryAllByText('—').length).toBe(0);
    expect(screen.getByText('1,000')).toBeInTheDocument();
    expect(screen.getByText('01/01/2000')).toBeInTheDocument();
  });
});
