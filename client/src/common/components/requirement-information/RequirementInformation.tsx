import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { Api, useLazyQuery } from 'src/api';
import { DateIcon, StatusIcon } from 'src/common/components';
import { Show } from 'src/common/layout';
import { Requirement } from 'src/interfaces';

interface RequirementInformationProps {
  clientUuid: string;
  requirementUuid: string;
  projectUuid: string;
  canEdit: boolean;
}

export const RequirementInformation = React.memo((props: RequirementInformationProps) => {
  const { requirementUuid, projectUuid, clientUuid } = props;
  const { t } = useTranslation();
  const [requirementQuery, requirementResponse] = useLazyQuery<
    { clientUuid: string; projectUuid: string; requirementUuid: string },
    { data: Requirement }
  >(Api.requirement.fetch);

  useEffect(() => {
    requirementQuery({ clientUuid, requirementUuid, projectUuid });
  }, [clientUuid, requirementUuid, projectUuid, requirementQuery]);

  if (!requirementResponse.response?.data) {
    return null;
  }

  const { startDate, projectCode, areaCode, status, requirementDocuments } = requirementResponse.response?.data;

  const rowClass =
    'grid grid-cols-3 border-bottom border-solid border-gray-100 border-b-2 p-4 pl-2 text-xs text-gray-500';

  return (
    <>
      <p className="mb-8">
        <strong>{t('partner.project-requirement-information')}</strong>
      </p>
      <Show show={!!projectCode}>
        <div className={rowClass}>
          <div>
            <strong>{t('improve.project-code-label').toUpperCase()}</strong>
          </div>
          <div className="col-span-2">{projectCode}</div>
        </div>
      </Show>

      <Show show={!!areaCode}>
        <div className={rowClass}>
          <div>
            <strong>{t('project.area-code').toUpperCase()}</strong>
          </div>
          <div className="col-span-2">{areaCode}</div>
        </div>
      </Show>

      <Show show={!!startDate}>
        <div className={rowClass}>
          <div>
            <strong>{t('project.start-date').toUpperCase()}</strong>
          </div>
          <div className="col-span-2">
            <DateIcon date={startDate} />
          </div>
        </div>
      </Show>

      <div className={rowClass}>
        <div>
          <strong>{t('project.status').toUpperCase()}</strong>
        </div>
        <div className="col-span-2">
          <StatusIcon status={status} />
        </div>
      </div>

      <div className={`${rowClass} pr-0`}>
        <div>
          <strong>{t('project.documents').toUpperCase()}</strong>
        </div>
        <div className="col-span-2">
          {requirementDocuments.map((document) => (
            <div
              className="flex justify-between border-bottom border-solid border-gray-100 border-b-2 p-4 pl-2 pt-0 mb-4"
              key={document.uuid}
            >
              <div>
                <a href={document.file} target="_blank" rel="noreferrer" className="text-gray-500">
                  {document.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});
