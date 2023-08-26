import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UserProvider, useUser } from 'src/common/providers/UserProvider';

const TestComponent = () => {
  const { user, setUser } = useUser();

  return (
    <div>
      <h1>{user.email}</h1>
      <button
        type="button"
        onClick={() => {
          setUser({ email: 'foo@baz.com' });
        }}
      >
        Update
      </button>
    </div>
  );
};

describe('UserProvider', () => {
  test('it provides a user', async () => {
    const { rerender } = render(
      <UserProvider user={{ email: 'foo@bar.com' } as any}>
        <TestComponent />
      </UserProvider>,
    );

    expect(screen.getByRole('heading', { name: 'foo@bar.com' })).toBeInTheDocument();

    rerender(
      <UserProvider user={{ email: 'bar@foo.com' } as any}>
        <TestComponent />
      </UserProvider>,
    );

    expect(screen.getByRole('heading', { name: 'bar@foo.com' })).toBeInTheDocument();
  });

  test('it updates a user', async () => {
    render(
      <UserProvider user={{ email: 'foo@bar.com' } as any}>
        <TestComponent />
      </UserProvider>,
    );

    userEvent.click(screen.getByRole('button', { name: 'Update' }));

    expect(screen.getByRole('heading', { name: 'foo@baz.com' })).toBeInTheDocument();
  });
});
