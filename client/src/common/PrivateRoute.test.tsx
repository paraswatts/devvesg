import { render, screen } from '@testing-library/react';

import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PrivateRoute } from 'src/common/PrivateRoute';
import { EMPTY_USER, UserContext } from 'src/common/providers/UserProvider';
import { UserTypes } from 'src/interfaces';

describe('PrivateRoute', () => {
  test('it allows a user with permissions', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: { ...EMPTY_USER, type: UserTypes.ADMIN }, setUser: jest.fn() }}>
          <Routes>
            <Route element={<PrivateRoute allowedTypes={[UserTypes.ADMIN]} />}>
              <Route path="*" element="foobar" />
            </Route>
          </Routes>
        </UserContext.Provider>
      </MemoryRouter>,
    );
    expect(screen.getByText('foobar')).toBeInTheDocument();
  });

  test('it blocks a user without permissions', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: { ...EMPTY_USER, type: UserTypes.CLIENT }, setUser: jest.fn() }}>
          <Routes>
            <Route element={<PrivateRoute allowedTypes={[UserTypes.ADMIN]} />}>
              <Route path="*" element="foobar" />
            </Route>
          </Routes>
        </UserContext.Provider>
      </MemoryRouter>,
    );
    expect(screen.getByText('Not Authorized')).toBeInTheDocument();
  });
});
