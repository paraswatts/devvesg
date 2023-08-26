import { combineResolvers, or } from 'apollo-resolvers';

import { logger } from '../../logger';
import { hubspot } from '../../config/hubspot';
import {
  Partner,
  Project,
  Requirement,
  RequirementDocument,
  RequirementRequestStatus,
  RequirementType,
} from '../../entities';
import {
  PartnerModel,
  ProjectModel,
  RequirementDocumentModel,
  RequirementModel,
  RequirementTypeModel,
} from '../../models';
import { isAdmin, isClient, isPartner, ResolverFn } from './utils';
import { ApolloForbiddenError } from '../../classes/errors';
import {
  handleSendPartnerDisconnectByClient,
  handleSendClientAcceptConnectionRequest,
  handleSendPartnerAcceptConnectionRequest,
  handleSendClientDeclineConnectionRequest,
  handleSendPartnerDeclineConnectionRequest,
} from '../../emails/templates';

// Queries

// Mutations

const resolveRequirementDisconnectPartner: ResolverFn<
  Requirement,
  { id: string; projectId: string; clientId: string; reason: string }
> = async (_, { id, clientId, projectId, reason }, { em, user }) => {
  if (user.type === 'client' && user.clientUuid !== clientId) {
    throw new ApolloForbiddenError();
  }

  const projectOptions = {
    projectId,
    clientId,
  };
  const project = await new ProjectModel(em).fetch(projectOptions);

  const requirement = await em.findOneOrFail(
    Requirement,
    { uuid: id, requestStatus: RequirementRequestStatus.APPROVED, project: project.uuid },
    { populate: ['partner', 'project', 'project.projectType.initiative', 'project.client'] },
  );

  const {
    name: requirementName,
    partner: { contactEmail: to },
    project: {
      name: projectName,
      client: { name: clientName },
      projectType: {
        initiative: { name: initiativeName },
      },
    },
    hubspotDealId,
  } = requirement;

  requirement.requestStatus = RequirementRequestStatus.UNASSIGNED;
  requirement.hubspotDealId = null;
  requirement.partner = null;

  if (hubspotDealId) {
    hubspot.dealUpdateStage(
      hubspotDealId,
      process.env.HUBSPOT_REQUIREMENT_CONNECTION_DEALSTAGE_CLOSED_LOST || 'closedlost', // The closed lost stage
    );
  }

  await em.persistAndFlush(requirement);
  await handleSendPartnerDisconnectByClient({
    to: [to],
    clientName,
    initiativeName,
    projectName,
    requirementName,
    reason,
  });

  return requirement;
};

const resolveRequirementRequestStatusChange: ResolverFn<
  Requirement,
  { id: string; requestStatus: RequirementRequestStatus }
> = async (_, { id, requestStatus }, { em, user }) => {
  const options = {
    requirementId: id,
    requestStatus: RequirementRequestStatus.PENDING,
    partnerId: user.type === 'partner' ? user.partnerUuid : undefined,
  };
  const requirement = await new RequirementModel(em).fetch(options);
  await em.populate(requirement, ['partner', 'project', 'project.client', 'project.client.hubspotId']);
  // get email variables before removing the partner from the requirement
  const {
    partner: { contactEmail: partnerEmail, name: partnerName, uuid: partnerUuid },
    project: {
      client: { contactEmail: clientEmail, uuid: clientUuid, name: clientName },
    },
  } = requirement;
  requirement.requestStatus = requestStatus;
  if (requestStatus === RequirementRequestStatus.UNASSIGNED) {
    requirement.partner = null;
    await handleSendClientDeclineConnectionRequest({
      to: [clientEmail],
      clientUuid,
      partnerName,
    });
    await handleSendPartnerDeclineConnectionRequest({ to: [partnerEmail], clientName, partnerUuid });
  }
  await em.persistAndFlush(requirement);

  // Create a new deal in hubspot for the connection and connect the two companies to it
  // Only create a deal if the requirement was previously pending and is now approved
  let hubspotDealId;
  if (requirement.requestStatus === RequirementRequestStatus.APPROVED) {
    await handleSendClientAcceptConnectionRequest({
      to: [clientEmail],
      clientUuid,
      partnerName,
    });

    await handleSendPartnerAcceptConnectionRequest({
      to: [partnerEmail],
      clientName,
      partnerUuid,
    });
    try {
      const dealResponse = await hubspot.dealCreate({
        dealname: requirement.name,
        // TODO can remove defaults once all envs have values set
        pipeline: process.env.HUBSPOT_REQUIREMENT_CONNECTION_PIPELINE || 'default', // the 'Partner' pipeline
        // TODO can remove defaults once all envs have values set
        dealstage: process.env.HUBSPOT_REQUIREMENT_CONNECTION_DEALSTAGE || '9272687', // the 'Initial Contact' stage
      });
      hubspotDealId = dealResponse.id;
    } catch (e) {
      logger.error(`Hubspot failed to create deal during partner approval. Requirement id ${requirement.uuid}`);
      logger.error(e);
    }

    try {
      // Associate partner first so it registers as the primary company
      const partnerHubspotId = requirement.partner?.hubspotId;
      if (hubspotDealId && partnerHubspotId) {
        hubspot.dealAssociateToCompany(hubspotDealId, partnerHubspotId);
      }
    } catch (e) {
      logger.error(
        `Hubspot failed to associate partner to deal during partner approval. Requirement id ${requirement.uuid}`,
      );
      logger.error(e);
    }

    try {
      // Associate client second so it is a secondary company association
      const clientHubspotId = requirement.project?.client?.hubspotId;
      if (hubspotDealId && clientHubspotId) {
        hubspot.dealAssociateToCompany(hubspotDealId, clientHubspotId);
      }
    } catch (e) {
      logger.error(
        `Hubspot failed to associate client to deal during partner approval. Requirement id ${requirement.uuid}`,
      );
      logger.error(e);
    }
    if (hubspotDealId) {
      requirement.hubspotDealId = hubspotDealId;
      await em.persistAndFlush(requirement);
    }
  }

  return requirement;
};

// Fields

const resolveRequirementType: ResolverFn<RequirementType, any, Requirement> = (requirement, __, { em }) => {
  return new RequirementTypeModel(em).fetch({ requirementTypeId: requirement.requirementType.uuid });
};

const resolveAllDocuments: ResolverFn<RequirementDocument[], any, Requirement> = (requirement, __, { em }) => {
  return new RequirementDocumentModel(em).fetchAll({ requirementId: requirement.uuid });
};

const resolveProject: ResolverFn<Project, any, Requirement> = (requirement, __, { em }) => {
  return new ProjectModel(em).fetch({ projectId: requirement.project.uuid });
};

const resolvePartner: ResolverFn<Partner, any, Requirement> = (requirement, __, { em }) => {
  if (!requirement.partner) {
    return null;
  }
  return new PartnerModel(em).fetch({ partnerId: requirement.partner.uuid });
};

const resolveAllPartnersForRequirementType: ResolverFn<Partner[], any, RequirementType> = (
  requirementType,
  __,
  { em },
) => {
  return new PartnerModel(em).fetchAll({
    requirementTypeId: requirementType.uuid,
    orderBy: [{ field: 'name', direction: 'ASC' }],
  });
};

export const resolvers = {
  Query: {},
  Mutation: {
    requirementDisconnectPartner: combineResolvers([or(isAdmin, isClient)])(resolveRequirementDisconnectPartner),
    requirementRequestStatusChange: combineResolvers([or(isAdmin, isPartner)])(resolveRequirementRequestStatusChange),
  },
  Requirement: {
    requirementType: resolveRequirementType,
    project: resolveProject,
    documents: resolveAllDocuments,
  },
  RequirementForClient: {
    requirementType: resolveRequirementType,
    partner: resolvePartner,
    documents: resolveAllDocuments,
  },
  RequirementRequest: {
    requirementType: resolveRequirementType,
    project: resolveProject,
  },
  RequirementType: {
    partners: resolveAllPartnersForRequirementType,
  },
  RequirementStatus: {
    DONE: 'done',
    IN_PROGRESS: 'inprogress',
    NOT_STARTED: 'notstarted',
    ON_HOLD: 'onhold',
  },
  RequirementRequestStatus: {
    UNASSIGNED: RequirementRequestStatus.UNASSIGNED,
    PENDING: RequirementRequestStatus.PENDING,
    APPROVED: RequirementRequestStatus.APPROVED,
  },
};
