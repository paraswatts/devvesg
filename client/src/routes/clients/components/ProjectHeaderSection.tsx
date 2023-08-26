import React, { PropsWithChildren, ReactNode, useCallback, useMemo, useState } from 'react';

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

import { Modal } from 'src/common/components';
import { DateIcon, StatusIcon } from 'src/common/components/icons';
import { Button } from 'src/common/interactions/Button';
import { EditStatusModal } from 'src/routes/clients/components/EditStatusModal';
import {
  GetProjects_client_projects_items_initiative as Initiative,
  GetProjects_client_projects_items as Project,
} from 'src/routes/clients/initiatives/__gql__/GetProjects';

interface ProjectHeaderSectionProps {
  initiative: Initiative;
  project: Project;
  fetchProjects: () => void;
}

export const ProjectHeaderSection = React.memo((props: ProjectHeaderSectionProps) => {
  const { t } = useTranslation();
  const { initiative, project, fetchProjects } = props;
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const toggleStatusModal = useCallback(() => setStatusModalOpen((prevValue) => !prevValue), []);

  const modalClosed = () => {
    toggleStatusModal();
    fetchProjects();
  };

  const statusBlocks = useMemo(() => {
    const blocks = [];

    if (project.startDate) {
      blocks.push(
        <StatusBlock key="start-date" label={t('project.start-date')}>
          <DateIcon date={project.startDate} />
        </StatusBlock>,
      );
    }

    if (project.completionDate) {
      blocks.push(
        <StatusBlock key="completetion-date" label={t('project.completion-date')}>
          <DateIcon date={project.completionDate} />
        </StatusBlock>,
      );
    }

    if (project.endGoalDate) {
      blocks.push(
        <StatusBlock key="end-goal-date" label={t('project.end-goal-date')}>
          <DateIcon date={project.endGoalDate} />
        </StatusBlock>,
      );
    }
    return blocks;
  }, [project, t]);

  return (
    <>
      <div className="lg:flex bg-gray-100">
        <div
          className="hidden lg:block w-48 bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${initiative.onboardingLogo})` }}
        />

        <div className="flex flex-col flex-grow gap-4 px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <h2 className="flex-grow order-2 lg:order-1 mb-0 text-2xl">
              {initiative.name}: {project.name}
            </h2>

            <div className="order-1 lg:order-2 text-right">
              <Button.Primary type="button" className="whitespace-nowrap" onClick={toggleStatusModal}>
                {t('buttons.edit')} <FontAwesomeIcon icon={faPencilAlt} />
              </Button.Primary>
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-6">
            <StatusBlock label={t('project.status')}>
              <StatusIcon status={project.status} />
            </StatusBlock>

            {statusBlocks}
          </div>
        </div>
      </div>

      <Modal isOpen={statusModalOpen} onCancelModal={toggleStatusModal}>
        <EditStatusModal project={project} projectUuid={project.uuid} onCloseModal={modalClosed} />
      </Modal>
    </>
  );
});

interface StatusBlockProps {
  label?: ReactNode;
}

const StatusBlock = (props: PropsWithChildren<StatusBlockProps>) => {
  return (
    <div>
      <div className="font-bold text-xs uppercase text-neutral-600 text-opacity-60 py-2">{props.label}</div>
      <div className="whitespace-nowrap">{props.children}</div>
    </div>
  );
};
