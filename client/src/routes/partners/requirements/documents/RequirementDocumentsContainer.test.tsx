import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { graphql } from 'msw';
import { I18nextProvider } from 'react-i18next';

import { Api } from 'src/api';
import { MockPartner } from 'src/common/mocks/MockPartner';
import i18n from 'src/mocks/i18nForTests';
import { TestRenderOptions, testRenderer } from 'src/mocks/renderer';
import {
  GetRequirementDocuments,
  GetRequirementDocumentsVariables,
} from 'src/routes/partners/requirements/documents/__gql__/GetRequirementDocuments';
import { RequirementDocumentsContainer } from 'src/routes/partners/requirements/documents/RequirementDocumentsContainer';
import { GET_REQUIREMENT_DOCUMENTS } from 'src/routes/partners/requirements/documents/RequirementDocumentsContainer.query';

jest.mock('src/routes/partners/requirements/RequirementNavigation', () => ({
  RequirementNavigation: () => null,
}));

jest.mock('src/common/hooks/useParams', () => ({
  useParams: () => ({ requirementUuid: 'requirement-uuid' }),
}));

describe('RequirementDocumentsContainer', () => {
  const renderPage = testRenderer(
    <I18nextProvider i18n={i18n}>
      <RequirementDocumentsContainer />
    </I18nextProvider>,
  );

  test('it renders an empty message', async () => {
    const renderOptions: TestRenderOptions = {
      gqlOverrides: graphql.query<GetRequirementDocuments, GetRequirementDocumentsVariables>(
        GET_REQUIREMENT_DOCUMENTS,
        (req, res, ctx) => {
          return res(
            ctx.data({
              partner: {
                __typename: 'Partner',
                requirement: {
                  __typename: 'Requirement',
                  documents: [],
                },
              },
            }),
          );
        },
      ),
    };
    renderPage(renderOptions);
    await waitFor(async () => {
      expect(screen.getByText('This looks a bit empty!')).toBeInTheDocument();
    });
  });

  test('it shows a list of documents', async () => {
    renderPage();

    await waitFor(async () => {
      expect(screen.getAllByRole('rowgroup')).toHaveLength(2);
    });

    const [header, body] = screen.getAllByRole('rowgroup');
    const headerRows = within(header).getAllByRole('row');
    expect(headerRows).toHaveLength(1);
    const [nameTh, dateTh, downloadTh, deleteTh] = within(headerRows[0]).getAllByRole('columnheader');
    expect(nameTh).toHaveTextContent('Name');
    expect(dateTh).toHaveTextContent('Date Uploaded');
    expect(downloadTh).toHaveTextContent('');
    expect(deleteTh).toHaveTextContent('');

    const bodyRows = within(body).getAllByRole('row');
    expect(bodyRows).toHaveLength(2);
    const [nameTd, dateTd, downloadTd, deleteTd] = within(bodyRows[0]).getAllByRole('cell');
    expect(nameTd).toHaveTextContent('Document 1');
    expect(dateTd).toHaveTextContent('Jan 1, 2000');
    expect(within(downloadTd).getByRole('link', { name: 'Download' })).toBeInTheDocument();
    expect(within(deleteTd).getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  test('it opens an upload modal', async () => {
    renderPage();

    const button = screen.getByRole('button', { name: 'Upload Document' });
    userEvent.click(button);
    expect(screen.getByRole('textbox', { name: 'Name *' })).toBeInTheDocument();
  });

  test('it deletes a document', async () => {
    const deleteSpy = jest.spyOn(Api.document, 'delete').mockResolvedValueOnce({ data: null });

    renderPage();

    await waitFor(async () => {
      expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(2);
    });

    const [button] = screen.getAllByRole('button', { name: 'Delete' });
    jest.spyOn(window, 'confirm').mockReturnValueOnce(false);
    userEvent.click(button);

    await waitFor(async () => {
      expect(deleteSpy).not.toHaveBeenCalled();
    });

    jest.spyOn(window, 'confirm').mockReturnValueOnce(true);
    userEvent.click(button);

    await waitFor(async () => {
      expect(deleteSpy).toHaveBeenCalledWith({
        partnerUuid: MockPartner.uuid,
        requirementDocumentUuid: 'doc-1',
        requirementUuid: 'requirement-uuid',
      });
    });
  });
});
