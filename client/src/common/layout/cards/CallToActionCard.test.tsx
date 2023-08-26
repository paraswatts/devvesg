import { screen } from '@testing-library/react';

import { CallToActionCard } from 'src/common/layout/cards/CallToActionCard';
import { testRenderer } from 'src/mocks/renderer';

describe('CallToActionCard', () => {
  const renderTest = testRenderer(
    <CallToActionCard image={''} title="Provided Heading" body="foobar" action={<a href="/abc">Provided Link</a>} />,
  );

  test('it renders content', () => {
    renderTest();
    expect(screen.getByRole('heading', { name: 'Provided Heading' })).toBeInTheDocument();
    expect(screen.getByText('foobar')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Provided Link' })).toBeInTheDocument();
  });
});
