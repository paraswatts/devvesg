import { combineResolvers, or } from 'apollo-resolvers';
import { wrap } from '@mikro-orm/core';

import { getSignedUrl } from '../../config/s3';
import { MediaEntityTypes } from '../../interfaces';
import {
  ClientType,
  Partner,
  PartnerLocation,
  Requirement,
  RequirementRequestStatus,
  RequirementType,
  Service,
  Vertical,
} from '../../entities';
import {
  PartnerModel,
  PartnerLocationModel,
  RequirementModel,
  RequirementTypeModel,
  ServiceModel,
  VerticalModel,
  ClientTypeModel,
} from '../../models';
import { PaginatedResource } from './interfaces';
import { isAdmin, isPartner, ResolverFn } from './utils';
import { ApolloForbiddenError } from '../../classes/errors';
import { GqlMutationPartnerUpdateArgs } from '../../gql/types';

const resolveOne: ResolverFn<Partner, { partnerId: string }> = (_, { partnerId }, { em, user }) => {
  if (user.type === 'partner' && user.partnerUuid !== partnerId) {
    throw new ApolloForbiddenError();
  }
  return new PartnerModel(em).fetch({ partnerId });
};

const resolveAllClientTypes: ResolverFn<ClientType[], any, Partner> = async (partner, __, { em }) => {
  return new ClientTypeModel(em).fetchAll({ partnerId: partner.uuid });
};

const resolveAllRequirements: ResolverFn<PaginatedResource<Requirement>, any, Partner> = async (
  partner,
  __,
  { em },
) => {
  const items = await new RequirementModel(em).fetchAll({
    partnerId: partner.uuid,
    requestStatus: RequirementRequestStatus.APPROVED,
  });
  return {
    items,
    pageInfo: {
      page: 0,
      pageSize: items.length,
      totalCount: items.length,
    },
  };
};

const resolveOneRequirement: ResolverFn<Requirement, { requirementId: string }, Partner> = (
  partner,
  { requirementId },
  { em },
) => {
  return new RequirementModel(em).fetch({
    requirementId,
    partnerId: partner.uuid,
    requestStatus: RequirementRequestStatus.APPROVED,
  });
};

const resolveAllRequests: ResolverFn<PaginatedResource<Requirement>, any, Partner> = async (partner, __, { em }) => {
  const items = await new RequirementModel(em).fetchAll({
    partnerId: partner.uuid,
    requestStatus: RequirementRequestStatus.PENDING,
  });
  return {
    items,
    pageInfo: {
      page: 0,
      pageSize: items.length,
      totalCount: items.length,
    },
  };
};

const resolveOneRequest: ResolverFn<Requirement, { requirementRequestId: string }, Partner> = (
  partner,
  { requirementRequestId },
  { em },
) => {
  return new RequirementModel(em).fetch({
    requirementId: requirementRequestId,
    partnerId: partner.uuid,
    requestStatus: RequirementRequestStatus.PENDING,
  });
};

const resolveAllRequirementTypes: ResolverFn<RequirementType[], any, Partner> = async (partner, __, { em }) => {
  return new RequirementTypeModel(em).fetchAll({ partnerId: partner.uuid });
};

const resolveAllServiceLocations: ResolverFn<PartnerLocation[], any, Partner> = async (partner, __, { em }) => {
  return new PartnerLocationModel(em).fetchAll({ partnerId: partner.uuid });
};

const resolveOneVertical: ResolverFn<Vertical, { verticalId: string }, Partner> = async (
  partner,
  { verticalId },
  { em },
) => {
  if (!partner.vertical) {
    return null;
  }
  return new VerticalModel(em).fetch({ verticalId: partner.vertical.uuid });
};

const resolveAllServices: ResolverFn<Service[], { partnerId: string }, Partner> = async (partner, __, { em }) => {
  return new ServiceModel(em).fetchAll({ partnerId: partner.uuid });
};

const resolveHubspotId: ResolverFn<string | null, any, Partner> = (partner, __, { user }) => {
  if (user.type === 'admin') {
    return partner.hubspotId;
  } else {
    return null;
  }
};

const resolveSignedLogo: ResolverFn<string, any, Partner> = (partner) => {
  return getSignedUrl(partner.logo, MediaEntityTypes.PARTNER, 'logo', partner.mediaUuid);
};

const resolvePartnerUpdate: ResolverFn<Partner, GqlMutationPartnerUpdateArgs> = async (_, payload, { em, user }) => {
  const { id, companyInformation, servicesInformation } = payload;
  // verify that partner belongs to user
  if (user.type === 'partner' && user.partnerUuid !== id) {
    throw new ApolloForbiddenError();
  }

  const partner = await em.findOneOrFail(
    Partner,
    { uuid: id },
    { populate: ['serviceLocations', 'requirementTypes.partners', 'clientTypes'] },
  );
  if (companyInformation) {
    wrap(partner).assign(companyInformation, { em });
  }
  if (servicesInformation) {
    const { projectTimeline, clientTypeIds, requirementTypeIds, serviceLocations } = servicesInformation;
    partner.assign({ projectTimeline });

    // Client Types TODO: diff existing and new to reduce overhead
    const clientTypes = await new ClientTypeModel(em).fetchAll({ id: clientTypeIds });
    partner.clientTypes.removeAll();
    partner.clientTypes.add(...clientTypes);

    // Service Locations TODO: diff existing and new to reduce overhead
    partner.serviceLocations.removeAll();
    serviceLocations.forEach((serviceLoc) => {
      serviceLoc.provinces.forEach((prov: string) => {
        partner.serviceLocations.add(
          new PartnerLocation().assign({
            country: serviceLoc.country,
            province: prov,
          }),
        );
      });
    });

    // Requirement Types TODO: diff existing and new to reduce overhead
    const requirementTypesToUpdate = [];
    for (let rt of partner.requirementTypes) {
      rt.partners.remove(partner);
      requirementTypesToUpdate.push(rt);
    }
    for (let rtId of requirementTypeIds) {
      const requirementType = await new RequirementTypeModel(em).fetch({ requirementTypeId: rtId });
      if (requirementType) {
        requirementType.partners.add(partner);
        requirementTypesToUpdate.push(requirementType);
      }
    }
    await em.persistAndFlush(requirementTypesToUpdate);
  }

  await em.persistAndFlush(partner);

  return partner;
};

export const resolvers = {
  Query: {
    partner: combineResolvers([or(isAdmin, isPartner)])(resolveOne),
  },
  Partner: {
    clientTypes: resolveAllClientTypes,
    logo: resolveSignedLogo,
    hubspotId: resolveHubspotId,
    requirements: resolveAllRequirements,
    requirement: resolveOneRequirement,
    requirementRequests: resolveAllRequests,
    requirementRequest: resolveOneRequest,
    requirementTypes: resolveAllRequirementTypes,
    serviceLocations: resolveAllServiceLocations,
    services: resolveAllServices,
    vertical: resolveOneVertical,
  },
  PartnerInfo: {
    logo: resolveSignedLogo,
    services: resolveAllServices,
  },
  Mutation: {
    partnerUpdate: combineResolvers([or(isAdmin, isPartner)])(resolvePartnerUpdate),
  },
};
