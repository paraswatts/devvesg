import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { EMPTY_USER, UserContext } from 'src/common/providers/UserProvider';
import { Header } from 'src/common/skeleton/Header';

describe('Header', () => {
  test('it renders', () => {
    render(
      <UserContext.Provider value={{ user: { ...EMPTY_USER, firstName: 'foo', lastName: 'bar' }, setUser: jest.fn() }}>
        <Header />
      </UserContext.Provider>,
      { wrapper: MemoryRouter },
    );
    expect(screen.getByText('foo bar')).toBeInTheDocument();
  });
});
