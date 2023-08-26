import React, { useEffect, useState } from 'react';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Link, generatePath } from 'react-router-dom';

import {
  Api,
  InitiativeFetchParams,
  ProjectTypeFetchParams,
  RequirementTypeSortOrderParams,
  useLazyQuery,
} from 'src/api';
import { useParams } from 'src/common/hooks';
import { LinkButton } from 'src/common/interactions/Button';
import { Initiative, ProjectType, RequirementType } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

import tableStyles from 'src/common/styles/Table.module.scss';

export const AdminRequirementTypeListContainer = React.memo(() => {
  const { initiativeUuid, projectTypeUuid } = useParams<{ initiativeUuid: string; projectTypeUuid: string }>();
  const [requirementTypes, setRequirementTypes] = useState<RequirementType[]>();
  const { t } = useTranslation();
  const [requirementTypesQuery, requirementTypesResponse] = useLazyQuery<
    { initiativeUuid: string; projectTypeUuid: string },
    { data: RequirementType[] }
  >(Api.admin.requirementType.list);

  const [initiativeQuery, initiativeResponse] = useLazyQuery<InitiativeFetchParams, { data: Initiative }>(
    Api.admin.initiative.fetch,
  );

  const [projectTypesQuery, projectTypesResponse] = useLazyQuery<ProjectTypeFetchParams, { data: ProjectType }>(
    Api.admin.projectType.fetch,
  );

  const [requirementTypeSortOrderQuery, requirementTypeSortOrderResponse] = useLazyQuery<
    RequirementTypeSortOrderParams,
    { data: RequirementType[] }
  >(Api.admin.requirementType.sortOrder);

  useEffect(() => {
    requirementTypesQuery({ initiativeUuid, projectTypeUuid });
    projectTypesQuery({ initiativeUuid, projectTypeUuid });
    initiativeQuery({ initiativeUuid });
  }, [requirementTypesQuery, initiativeQuery, projectTypesQuery, initiativeUuid, projectTypeUuid]);

  useEffect(() => {
    if (requirementTypesResponse?.response?.data) {
      setRequirementTypes(requirementTypesResponse.response.data);
    }
  }, [requirementTypesResponse]);

  useEffect(() => {
    if (requirementTypeSortOrderResponse.status === 'resolved') {
      setRequirementTypes(requirementTypeSortOrderResponse.response?.data || []);
    }
  }, [requirementTypeSortOrderResponse]);

  const reorder = (list: RequirementType[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    result.forEach((val, index) => {
      val.sortOrder = index;
    });
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedList = reorder(requirementTypes || [], result.source.index, result.destination.index);
    setRequirementTypes(reorderedList);
    requirementTypeSortOrderQuery({
      initiativeUuid,
      projectTypeUuid,
      requirementTypes: requirementTypes || [],
    });
  };

  if (
    !requirementTypesResponse.response?.data ||
    !initiativeResponse.response?.data ||
    !projectTypesResponse.response?.data
  ) {
    return null;
  }

  const initiative = initiativeResponse.response.data;
  const projectType = projectTypesResponse.response.data;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mb-0 font-bold">
          {initiative.name} - {projectType.name} {t('admin.requirement-type-list')}
        </h2>
        <LinkButton.Primary to={generatePath(AdminRoutes.REQUIREMENT_TYPES_NEW, { initiativeUuid, projectTypeUuid })}>
          {t('buttons.new')}
        </LinkButton.Primary>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={tableStyles.devvEsgTable}>
          <div className={`grid grid-cols-4 ${tableStyles.tableHead}`}>
            <div className={`col-span-3 ${tableStyles.cell}`}>{t('profile.name')}</div>
            <div className={`${tableStyles.cell}`}>{t('admin.sort-order')}</div>
          </div>
          <Droppable droppableId="list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {requirementTypes
                  ?.sort((a, b) => (a.sortOrder > b.sortOrder ? 1 : -1))
                  .map((rt, index) => {
                    return (
                      <Draggable draggableId={rt.uuid} index={index} key={`project-type-${rt.uuid}`}>
                        {(provided) => (
                          <div
                            className={`grid grid-cols-4 ${tableStyles.tableBody}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <div className={`col-span-3 ${tableStyles.cell}`}>
                              <Link
                                to={generatePath(AdminRoutes.REQUIREMENT_TYPES_SHOW, {
                                  initiativeUuid,
                                  projectTypeUuid,
                                  requirementTypeUuid: rt.uuid,
                                })}
                              >
                                {rt.name}
                              </Link>
                            </div>
                            <div className={`${tableStyles.cell} text-neutral-600 text-opacity-60`}>
                              <div {...provided.dragHandleProps}>
                                <FontAwesomeIcon className="cursor-pointer" icon={faBars} size="2x" />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
});
