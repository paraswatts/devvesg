import { screen, waitFor, within } from '@testing-library/react';

import { graphql } from 'msw';
import { I18nextProvider } from 'react-i18next';

import { MockPartner } from 'src/common/mocks/MockPartner';
import i18n from 'src/mocks/i18nForTests';
import { TestRenderOptions, testRenderer } from 'src/mocks/renderer';
import {
  GetRequirements,
  GetRequirementsVariables,
} from 'src/routes/partners/requirements/list/__gql__/GetRequirements';
import { RequirementsListContainer } from 'src/routes/partners/requirements/list/RequirementsListContainer';
import { GET_REQUIREMENTS } from 'src/routes/partners/requirements/list/RequirementsListContainer.query';

describe('RequirementsListContainer', () => {
  const renderPage = testRenderer(
    <I18nextProvider i18n={i18n}>
      <RequirementsListContainer />
    </I18nextProvider>,
  );

  test('it shows an empty message', async () => {
    const renderOptions: TestRenderOptions = {
      gqlOverrides: graphql.query<GetRequirements, GetRequirementsVariables>(GET_REQUIREMENTS, (req, res, ctx) => {
        return res(
          ctx.data({
            partner: {
              __typename: 'Partner',
              requirements: {
                __typename: 'RequirementList',
                items: [],
              },
            },
          }),
        );
      }),
    };
    renderPage(renderOptions);

    expect(screen.getByRole('heading', { name: MockPartner.name })).toBeInTheDocument();

    await waitFor(async () => {
      expect(screen.getByText("Welcome, Let's Get Started!")).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: 'Requests' })).toBeInTheDocument();
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
    expect(clientTh).toHaveTextContent('Client');
    expect(requirementTh).toHaveTextContent('Requirement');
    expect(statusTh).toHaveTextContent('Status');
    expect(startDateTh).toHaveTextContent('Start Date');
    expect(actionTh).toBeEmptyDOMElement();

    const bodyRows = within(body).getAllByRole('row');

    expect(bodyRows).toHaveLength(1);
    const [clientTd, requirementTd, statusTd, startDateTd, actionTd] = within(bodyRows[0]).getAllByRole('cell');
    expect(clientTd).toHaveTextContent('Client 1');
    expect(requirementTd).toHaveTextContent('Project Type 1: Project 1');
    expect(statusTd).toHaveTextContent('Not Started');
    expect(startDateTd).toHaveTextContent('Jan 1, 2000');
    expect(within(actionTd).getByRole('link', { name: 'Details' })).toBeInTheDocument();
  });
});
