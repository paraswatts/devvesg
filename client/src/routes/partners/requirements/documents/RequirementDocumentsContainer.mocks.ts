import { graphql } from 'msw';

import { RequirementDocumentType } from 'src/gql';
import {
  GetRequirementDocuments,
  GetRequirementDocumentsVariables,
} from 'src/routes/partners/requirements/documents/__gql__/GetRequirementDocuments';
import { GET_REQUIREMENT_DOCUMENTS } from 'src/routes/partners/requirements/documents/RequirementDocumentsContainer.query';

export const MswGetRequirementDocumentsHandler = graphql.query<
  GetRequirementDocuments,
  GetRequirementDocumentsVariables
>(GET_REQUIREMENT_DOCUMENTS, (req, res, ctx) => {
  return res(
    ctx.data({
      partner: {
        __typename: 'Partner',
        requirement: {
          __typename: 'Requirement',
          documents: [
            {
              __typename: 'RequirementDocument',
              uuid: 'doc-1',
              name: 'Document 1',
              type: RequirementDocumentType.FILE,
              file: 'https://test.devvesg.com/internal.pdf',
              createdAt: new Date(2000, 0, 1),
            },
            {
              __typename: 'RequirementDocument',
              uuid: 'doc-2',
              name: 'Document 2',
              type: RequirementDocumentType.URL,
              file: 'https://test.devvesg.com/external.pdf',
              createdAt: new Date(2000, 0, 1),
            },
          ],
        },
      },
    }),
  );
});
