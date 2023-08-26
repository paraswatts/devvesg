import { screen } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { CarbonCreditsAddContainer } from 'src/routes/clients/improve/carbon-credits/add/CarbonCreditsAddContainer';

describe('CarbonCreditsAddContainer', () => {
  const renderTest = testRenderer(
    <I18nextProvider i18n={i18n}>
      <CarbonCreditsAddContainer />
    </I18nextProvider>,
  );
  test('it renders', () => {
    renderTest();
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
  });
});
