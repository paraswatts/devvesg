import { render, screen } from '@testing-library/react';

import { SideNavContentContainer, SideNavLayout, SideNavNavigationContainer } from 'src/common/layout/SideNavLayout';

describe('SideNavLayout', () => {
  test('it renders', () => {
    render(<SideNavLayout>foobar</SideNavLayout>);
    expect(screen.getByText('foobar')).toBeInTheDocument();
  });
});

describe('SideNavNavigationContainer', () => {
  test('it renders', () => {
    render(<SideNavNavigationContainer>foobar</SideNavNavigationContainer>);
    expect(screen.getByText('foobar')).toBeInTheDocument();
  });
});

describe('SideNavContentContainer', () => {
  test('it renders', () => {
    render(<SideNavContentContainer>foobar</SideNavContentContainer>);
    expect(screen.getByText('foobar')).toBeInTheDocument();
  });
});
