import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { testRenderer } from 'src/mocks/renderer';
import { ClientProvider, useClient } from 'src/routes/clients/providers/ClientProvider';

jest.unmock('src/routes/clients/providers/ClientProvider.tsx');

jest.mock('src/common/hooks/useParams', () => ({
  useParams: () => ({ clientUuid: 'client-uuid' }),
}));

const TestComponent = () => {
  const { client, setClient } = useClient();
  return (
    <div>
      <h1>{client.name}</h1>
      <button type="button" onClick={() => setClient({ name: 'Foo Baz' })}>
        Update
      </button>
    </div>
  );
};

describe('ClientProvider', () => {
  const render = testRenderer(
    <ClientProvider>
      <TestComponent />
    </ClientProvider>,
  );
  test('it provides a client', async () => {
    render();

    await waitFor(async () => {
      expect(screen.getByRole('heading', { name: 'Foo Bar' })).toBeInTheDocument();
    });
  });

  test('it updates a client', async () => {
    render();

    await waitFor(async () => {
      expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
    });
    userEvent.click(screen.getByRole('button', { name: 'Update' }));
    await waitFor(async () => {
      expect(screen.getByRole('heading', { name: 'Foo Baz' })).toBeInTheDocument();
    });
  });
});
