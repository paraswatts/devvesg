import { screen } from '@testing-library/react';

import { testRenderer } from 'src/mocks/renderer';
import { CarbonCallToActionWrapper } from 'src/routes/clients/analyze/carbon/common/CarbonCallToActionWrapper';

describe('CarbonCallToActionWrapper', () => {
  const renderTest = testRenderer(<CarbonCallToActionWrapper>foobar</CarbonCallToActionWrapper>);

  test('it renders content', () => {
    renderTest();
    expect(screen.getByText('foobar')).toBeInTheDocument();
  });

  test('it renders a call to action', () => {
    renderTest();
    expect(screen.getByRole('heading', { name: "What's Carbon Footprint?" })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Reduce Impact' })).toHaveAttribute(
      'href',
      '/clients/mock-client-uuid/improve/reduce-impact',
    );
  });
});
