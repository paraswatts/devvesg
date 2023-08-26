import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { graphql } from 'msw';
import { I18nextProvider } from 'react-i18next';

import { RequirementRequestStatus } from 'src/gql';
import i18n from 'src/mocks/i18nForTests';
import { TestRenderOptions, testRenderer } from 'src/mocks/renderer';
import {
  RequirementRequestStatusChange,
  RequirementRequestStatusChangeVariables,
} from 'src/routes/partners/requests/details/__gql__/RequirementRequestStatusChange';
import { RequestDetailsContainer } from 'src/routes/partners/requests/details/RequestDetailsContainer';
import { REQUEST_STATUS_CHANGE } from 'src/routes/partners/requests/details/RequestDetailsContainer.query';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  };
});

describe('RequirementsListContainer', () => {
  const renderPage = testRenderer(
    <I18nextProvider i18n={i18n}>
      <RequestDetailsContainer />
    </I18nextProvider>,
  );

  test('it shows a table of requirements', async () => {
    renderPage();

    await waitFor(async () => {
      expect(screen.queryByLabelText('ESG Initiative')).toHaveTextContent('Initiative 1');
    });
    expect(screen.queryByLabelText('Project Type')).toHaveTextContent('Project Type 1');
    expect(screen.queryByLabelText('Requirement')).toHaveTextContent('Requirement Type 1');
    expect(screen.queryByLabelText('Start Date')).toHaveTextContent('Jan 1, 2000');
    expect(screen.queryByLabelText('End Date')).toHaveTextContent('None');
    expect(screen.queryByLabelText('Status')).toHaveTextContent('Not Started');
  });

  test('it should allow accepting the request', async () => {
    const renderOptions: TestRenderOptions = {
      gqlOverrides: graphql.mutation<RequirementRequestStatusChange, RequirementRequestStatusChangeVariables>(
        REQUEST_STATUS_CHANGE,
        (req, res, ctx) => {
          return res(
            ctx.data({
              requirementRequestStatusChange: {
                __typename: 'RequirementRequest',
                uuid: 'accepted-uuid',
                requestStatus: RequirementRequestStatus.APPROVED,
              },
            }),
          );
        },
      ),
    };
    renderPage(renderOptions);

    await waitFor(async () => {
      expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
    });
    userEvent.click(screen.getByRole('button', { name: 'Accept' }));
    await waitFor(async () => {
      expect(mockNavigate).toHaveBeenCalledWith('/partners/mock-partner-uuid/requirements/accepted-uuid', {
        replace: true,
      });
    });
  });

  test('it should allow declining the request', async () => {
    const renderOptions: TestRenderOptions = {
      gqlOverrides: graphql.mutation<RequirementRequestStatusChange, RequirementRequestStatusChangeVariables>(
        REQUEST_STATUS_CHANGE,
        (req, res, ctx) => {
          return res(
            ctx.data({
              requirementRequestStatusChange: {
                __typename: 'RequirementRequest',
                uuid: 'rejected-uuid',
                requestStatus: RequirementRequestStatus.UNASSIGNED,
              },
            }),
          );
        },
      ),
    };
    renderPage(renderOptions);

    await waitFor(async () => {
      expect(screen.getByRole('button', { name: 'Decline' })).toBeInTheDocument();
    });
    userEvent.click(screen.getByRole('button', { name: 'Decline' }));
    await waitFor(async () => {
      expect(mockNavigate).toHaveBeenCalledWith('/partners/mock-partner-uuid/requests', {
        replace: true,
      });
    });
  });
});
