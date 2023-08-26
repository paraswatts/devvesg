import { screen, waitFor, within } from '@testing-library/react';

import { graphql } from 'msw';
import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { TestRenderOptions, testRenderer } from 'src/mocks/renderer';
import { GetRequests, GetRequestsVariables } from 'src/routes/partners/requests/list/__gql__/GetRequests';
import { RequestsListContainer } from 'src/routes/partners/requests/list/RequestsListContainer';
import { GET_REQUESTS } from 'src/routes/partners/requests/list/RequestsListContainer.query';

describe('RequestsListContainer', () => {
  const renderPage = testRenderer(
    <I18nextProvider i18n={i18n}>
      <RequestsListContainer />
    </I18nextProvider>,
  );

  test('it shows an empty message', async () => {
    const renderOptions: TestRenderOptions = {
      gqlOverrides: graphql.query<GetRequests, GetRequestsVariables>(GET_REQUESTS, (req, res, ctx) => {
        return res(
          ctx.data({
            partner: {
              __typename: 'Partner',
              requirementRequests: {
                __typename: 'RequirementRequestList',
                items: [],
              },
            },
          }),
        );
      }),
    };
    renderPage(renderOptions);

    await waitFor(async () => {
      expect(screen.getByText('There are no current requests.')).toBeInTheDocument();
    });
  });

  test('it shows a table of requirements', async () => {
    renderPage();

    await waitFor(async () => {
      expect(screen.getAllByRole('rowgroup')).toHaveLength(2);
    });
    const [header, body] = screen.getAllByRole('rowgroup');
    const headerRows = within(header).getAllByRole('row');
    expect(headerRows).toHaveLength(1);
    const [clientTh, requirementTh, statusTh, startDateTh, actionTh] = within(headerRows[0]).getAllByRole(
      'columnheader',
    );
    expect(clientTh).toHaveTextContent('Initiative');
    expect(requirementTh).toHaveTextContent('Project');
    expect(statusTh).toHaveTextContent('Requirement');
    expect(startDateTh).toHaveTextContent('Status');
    expect(actionTh).toBeEmptyDOMElement();

    const bodyRows = within(body).getAllByRole('row');

    expect(bodyRows).toHaveLength(1);
    const [clientTd, requirementTd, statusTd, startDateTd, actionTd] = within(bodyRows[0]).getAllByRole('cell');
    expect(clientTd).toHaveTextContent('Initiative 1');
    expect(requirementTd).toHaveTextContent('Project 1');
    expect(statusTd).toHaveTextContent('Project Type 1: Project 1');
    expect(startDateTd).toHaveTextContent('Not Started');
    expect(within(actionTd).getByRole('link', { name: 'Review' })).toBeInTheDocument();
  });
});
