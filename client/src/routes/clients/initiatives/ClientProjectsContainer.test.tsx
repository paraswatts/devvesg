import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { GraphQLHandlerInfo } from 'msw/lib/types/handlers/GraphQLHandler';
import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { server } from 'src/mocks/server';
import { ClientProjectsContainer } from 'src/routes/clients/initiatives/ClientProjectsContainer';

const renderTest = testRenderer(
  <I18nextProvider i18n={i18n}>
    <ClientProjectsContainer />
  </I18nextProvider>,
);

jest.mock('src/common/hooks', () => ({
  useParams: () => ({ clientUuid: 'client-id' }),
}));

jest.mock('src/api/actions', () => ({
  ...jest.requireActual('src/api/actions'),
  Api: {
    requirement: { fetch: jest.fn() },
  },
}));

describe('ClientProjectsContainer', () => {
  test('renders', async () => {
    renderTest();
    await waitFor(async () => {
      expect(screen.getByRole('heading', { name: 'test-initiative: test-project' })).toBeInTheDocument();
    });
  });

  test('removes a connection and refreshes the page', async () => {
    let fetchCalledCounter = 0;
    let disconnectedCalledCounter = 0;
    server.events.on('request:match', (req) => {
      if ((req.body as GraphQLHandlerInfo).operationName === 'GetProjects') {
        fetchCalledCounter++;
      }
      if ((req.body as GraphQLHandlerInfo).operationName === 'DisconnectPartner') {
        disconnectedCalledCounter++;
      }
    });
    renderTest();

    await waitFor(async () => {
      expect(screen.getByText('test-partner')).toBeInTheDocument();
    });
    expect(fetchCalledCounter).toBe(1);
    const partnerButton = screen.getByText('test-partner');

    userEvent.click(partnerButton);
    expect(screen.getByRole('button', { name: 'Disconnect from Partner' })).toBeInTheDocument();

    const disconnectButton = screen.getByRole('button', { name: 'Disconnect from Partner' });

    userEvent.click(disconnectButton);

    await waitFor(async () => {
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    });
    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    const reasonField = screen.getByRole('textbox', {
      name: 'Reason * Please describe the reason you are disconnecting from this partner. 360 characters maximum',
    });
    expect(confirmButton).toBeInTheDocument();
    expect(reasonField).toBeInTheDocument();

    userEvent.type(reasonField, 'reason');
    userEvent.click(confirmButton);
    await waitFor(async () => {
      expect(disconnectedCalledCounter).toBe(1);
    });
    await waitFor(async () => {
      expect(fetchCalledCounter).toBe(2);
    });
  });
});
