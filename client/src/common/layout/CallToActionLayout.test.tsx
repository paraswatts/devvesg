import { screen } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';

import { CtaCardCarbonFootprint } from 'src/common/components/call-to-action';
import { CallToActionLayout } from 'src/common/layout';
import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';

describe('CallToActionLayout', () => {
  const renderTest = testRenderer(
    <I18nextProvider i18n={i18n}>
      <CallToActionLayout ctas={[<CtaCardCarbonFootprint />]}>foobar</CallToActionLayout>
    </I18nextProvider>);

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
