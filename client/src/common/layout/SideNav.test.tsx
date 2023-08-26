import { render, screen } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { SideNav, SideNavGroup, SideNavItem, SideNavLaunchpad } from 'src/common/layout/SideNav';
import i18n from 'src/mocks/i18nForTests';

describe('SideNav', () => {
  test('it renders a list', () => {
    render(<SideNav>foobar</SideNav>);
    expect(screen.getByText('foobar')).toBeInTheDocument();
  });
});

describe('SideNavGroup', () => {
  test('it renders a header', () => {
    render(<SideNavGroup label="Foobar"></SideNavGroup>);
    expect(screen.getByText('Foobar')).toBeInTheDocument();
  });

  test('it renders a list', () => {
    render(<SideNavGroup label="Foobar"></SideNavGroup>);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});

describe('SideNavLaunchpad', () => {
  test('it renders a link', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <SideNavLaunchpad to="/path" />
      </I18nextProvider>,
      { wrapper: MemoryRouter },
    );
    expect(screen.queryByRole('link', { name: 'Launchpad' })).toHaveAttribute('href', '/path');
  });
});

describe('SideNavLink', () => {
  test('it renders a link', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <SideNavItem to="/path">foobar</SideNavItem>
      </I18nextProvider>,
      { wrapper: MemoryRouter },
    );
    expect(screen.queryByRole('link', { name: 'foobar' })).toHaveAttribute('href', '/path');
  });
});
