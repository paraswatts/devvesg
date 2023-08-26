import { screen } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { CarbonCreditsOverviewContainer } from 'src/routes/clients/improve/carbon-credits/overview/CarbonCreditsOverviewContainer';

describe('CarbonCreditsOverviewContainer', () => {
  const renderTest = testRenderer(
    <I18nextProvider i18n={i18n}>
      <CarbonCreditsOverviewContainer />
    </I18nextProvider>,
  );
  test('it renders', () => {
    renderTest();
    expect(screen.getByRole('heading', { name: 'Buy Credit Offsets from Our Marketplace' })).toBeInTheDocument();
  });
});
