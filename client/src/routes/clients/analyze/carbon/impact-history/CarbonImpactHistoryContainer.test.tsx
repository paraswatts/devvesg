import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { GraphQLHandlerInfo } from 'msw/lib/types/handlers/GraphQLHandler';
import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { server } from 'src/mocks/server';
import { CarbonImpactHistoryContainer } from 'src/routes/clients/analyze/carbon/impact-history/CarbonImpactHistoryContainer';

jest.mock('src/common/hooks', () => ({
  useParams: () => ({ clientUuid: 'test-uuid' }),
}));
jest.mock('src/routes/clients/analyze/carbon/common/CarbonTabBar.tsx', () => ({
  CarbonTabBar: () => null,
}));

describe('CarbonImpactHistoryContainer', () => {
  const renderPage = testRenderer(
    <I18nextProvider i18n={i18n}>
      <CarbonImpactHistoryContainer />
    </I18nextProvider>,
  );
  test('it shows a table of carbon impact history', async () => {
    renderPage();

    await waitFor(async () => {
      expect(screen.getAllByText('Delete').length).toBe(3);
    });

    expect(screen.getByText('Impact (TCO2)')).toBeInTheDocument();
    expect(screen.getByText('Date Added')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
    // expect(screen.getByText('04/24/2022')).toBeInTheDocument();
    // expect(screen.getByText('04/24/2021')).toBeInTheDocument();
    // expect(screen.getByText('04/24/2020')).toBeInTheDocument();
    expect(screen.getByText('12,345')).toBeInTheDocument();
    expect(screen.getByText('67,890')).toBeInTheDocument();
    expect(screen.getByText('12,345.1')).toBeInTheDocument();
  });

  test('it deletes a footprint and reloads the list when clicking the delete button', async () => {
    jest.spyOn(global, 'confirm').mockReturnValueOnce(true);
    let fetchCalledCounter = 0;
    let deleteCalledCounter = 0;
    server.events.on('request:match', (req) => {
      if ((req.body as GraphQLHandlerInfo).operationName === 'GetCarbonImpactHistory') {
        fetchCalledCounter++;
      }
      if ((req.body as GraphQLHandlerInfo).operationName === 'CarbonFootprintDelete') {
        deleteCalledCounter++;
      }
    });

    renderPage();

    await waitFor(async () => {
      expect(screen.getAllByText('Delete').length).toBe(3);
    });
    expect(fetchCalledCounter).toBe(1);

    const deleteButton = screen.getAllByText('Delete')[0];
    userEvent.click(deleteButton);
    await waitFor(async () => {
      expect(deleteCalledCounter).toBe(1);
    });
    await waitFor(async () => {
      expect(fetchCalledCounter).toBe(2);
    });
  });
});
