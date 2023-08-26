import { useEffect, useState } from 'react';

import { useLazyQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { Api, useLazyQuery as useEsgLazyQuery } from 'src/api';
import { DateIcon, Modal } from 'src/common/components';
import { ExternalLinkDisplay } from 'src/common/components/external-link-display';
import { RequirementDocumentNewForm } from 'src/common/components/requirement-information/RequirementDocumentNewForm';
import { useParams } from 'src/common/hooks';
import { Button } from 'src/common/interactions/Button';
import { RequirementDocumentType } from 'src/gql';
import { usePartner } from 'src/routes/partners/PartnerProvider';
import {
  GetRequirementDocuments,
  GetRequirementDocumentsVariables,
  GetRequirementDocuments_partner_requirement_documents as RequirementDocument,
} from 'src/routes/partners/requirements/documents/__gql__/GetRequirementDocuments';
import { GET_REQUIREMENT_DOCUMENTS } from 'src/routes/partners/requirements/documents/RequirementDocumentsContainer.query';
import { RequirementNavigation } from 'src/routes/partners/requirements/RequirementNavigation';

import tableStyles from 'src/common/styles/Table.module.scss';

export const RequirementDocumentsContainer = () => {
  const { partner } = usePartner();
  const { requirementUuid } = useParams<{ requirementUuid: string }>();
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();
  const [documents, setDocuments] = useState<RequirementDocument[]>([]);

  const [fetchDocuments, { called, loading, refetch }] = useLazyQuery<
    GetRequirementDocuments,
    GetRequirementDocumentsVariables
  >(GET_REQUIREMENT_DOCUMENTS, {
    onCompleted: (response) => setDocuments(response.partner.requirement.documents),
  });

  useEffect(() => {
    fetchDocuments({ variables: { partnerId: partner.uuid, requirementId: requirementUuid } });
  }, [fetchDocuments, partner.uuid, requirementUuid]);

  const handleUploadComplete = () => {
    setModalOpen(false);
    refetch();
  };

  return (
    <div className="px-8 pb-10 bg-white shadow">
      <RequirementNavigation />

      {called && !loading && documents.length === 0 && <EmptyMessage t={t} />}

      <DocumentsTable documents={documents} onDeleted={() => refetch()} t={t} />

      <Button.Primary type="button" onClick={() => setModalOpen(true)}>
        {t('buttons.upload-document')}
      </Button.Primary>

      <Modal onCancelModal={() => setModalOpen(false)} isOpen={modalOpen} slim={true}>
        <UploadModal partnerUuid={partner.uuid} requirementUuid={requirementUuid} onSuccess={handleUploadComplete} />
      </Modal>
    </div>
  );
};

const EmptyMessage = ({ t }: { t: (p: string) => string }) => {
  return (
    <div className="flex flex-col items-center gap-6 my-8">
      <h1 className="mb-0">{t('partner.empty-message')}</h1>
      <p className="mb-0">{t('partner.no-documents-attached')}</p>
    </div>
  );
};

interface DocumentsTableProps {
  documents: RequirementDocument[];
  onDeleted: (document: RequirementDocument) => void;
  t: (p: string) => string;
}
const DocumentsTable = ({ documents, onDeleted, t }: DocumentsTableProps) => {
  if (documents.length === 0) {
    return null;
  }

  return (
    <div className={tableStyles.scrollXTableContainer}>
      <table className={tableStyles.devvEsgTable}>
        <thead>
          <tr>
            <th>{t('profile.name')}</th>
            <th style={{ width: 0 }}>{t('partner.date-uploaded')}</th>
            <th style={{ width: 0 }}></th>
            <th style={{ width: 0 }}></th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <DocumentsTableRow key={document.uuid} document={document} onDeleted={onDeleted} t={t} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface DocumentsTableRowProps {
  document: RequirementDocument;
  onDeleted: (document: RequirementDocument) => void;
  t: (p: string) => string;
}
const DocumentsTableRow = ({ document, onDeleted: onNotifyDeleted, t }: DocumentsTableRowProps) => {
  const { uuid, name, file, createdAt, type } = document;
  const { partner } = usePartner();
  const { requirementUuid } = useParams<{ requirementUuid: string }>();

  const [deleteQuery, { status }] = useEsgLazyQuery(Api.document.delete, {
    onSuccess: () => onNotifyDeleted(document),
  });

  const handleDelete = () => {
    if (!window.confirm(t('partner.remove-document'))) {
      return;
    }

    deleteQuery({ partnerUuid: partner.uuid, requirementUuid, requirementDocumentUuid: uuid });
  };

  return (
    <tr key={uuid}>
      <td>{name}</td>
      <td>
        <DateIcon date={createdAt} hideIcon />
      </td>
      <td>
        {type === RequirementDocumentType.URL ? (
          <ExternalLinkDisplay href={file}>{t('partner.visit-url')}</ExternalLinkDisplay>
        ) : (
          <ExternalLinkDisplay href={file}>{t('download')}</ExternalLinkDisplay>
        )}
      </td>
      <td>
        <Button.Primary type="button" onClick={handleDelete} disabled={status === 'loading'}>
          {t('global.delete')}
        </Button.Primary>
      </td>
    </tr>
  );
};

interface UploadModalProps {
  partnerUuid: string;
  requirementUuid: string;
  onSuccess: () => void;
}
const UploadModal = ({ onSuccess, ...props }: UploadModalProps) => {
  const [uploadQuery, { status }] = useEsgLazyQuery(Api.document.new, {
    onSuccess: () => onSuccess(),
  });

  return (
    <RequirementDocumentNewForm
      loading={status === 'loading'}
      onSubmit={(value) => uploadQuery({ ...value, ...props })}
    />
  );
};
