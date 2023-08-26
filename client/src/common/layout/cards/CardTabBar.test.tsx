import { screen } from '@testing-library/react';

import { CardTabBar, CardTabBarTab } from 'src/common/layout/cards/CardTabBar';
import { testRenderer } from 'src/mocks/renderer';

describe('CardTabBar', () => {
  test('renders children', () => {
    const renderPage = testRenderer(<CardTabBar>children</CardTabBar>);
    renderPage();
    expect(screen.getByText('children')).toBeInTheDocument();
  });

  test('renders CardTabBarTab and children', () => {
    const renderPage = testRenderer(
      <CardTabBar>
        <CardTabBarTab to="link1">First Link</CardTabBarTab>
        <CardTabBarTab to="link2">Second Link</CardTabBarTab>
      </CardTabBar>,
    );
    renderPage();

    expect(screen.getByRole('link', { name: 'First Link' })).toHaveAttribute('href', '/link1');
    expect(screen.getByRole('link', { name: 'Second Link' })).toHaveAttribute('href', '/link2');
  });
});
