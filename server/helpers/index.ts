import { NextFunction, Response } from 'express';
import { z } from 'zod';
import { wrap } from '@mikro-orm/core';

import { ApiRes, MediaEntityTypes } from '../interfaces';
import { DI } from '../index';
import { Partner, UserTypes, User, PartnerLocation } from '../entities';
import { uploadFile } from '../config/s3';
import { isValidPassword } from '../lib/util';
import { generateJWT } from '../lib/util';

export const partnerNewUpdateFormSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  contactEmail: z.string().email().nonempty(),
  websiteUrl: z.string().nonempty(),
  contactPhoneNumber: z.string().nonempty(),
  twitterUrl: z.string().optional(),
  linkedInUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  serviceIds: z.array(z.string()).optional(),
  country: z.string().optional(),
  province: z.string().optional(),
  verticalId: z.string().optional(),
  serviceLocations: z
    .array(
      z.object({
        country: z.string(),
        provinces: z.array(z.string()),
      }),
    )
    .optional(),
  clientTypes: z.array(z.object({ uuid: z.string() })).optional(),
  projectTimeline: z.number().optional(),
  hubspotId: z.string().optional(),
});

export const updatePartner = async (req: any, res: Response<ApiRes<Partner>>, next: NextFunction) => {
  const em = DI.orm.em.fork(false);
  const file = req.file;
  try {
    const whereQuery: { uuid: string; users?: string } = { uuid: req.params.partnerUuid };
    if (req.user.type !== UserTypes.ADMIN) {
      // Don't allow non-admins to change the hubspot id
      delete req.body.hubspotId;
      whereQuery.users = req.user.uuid;
    }
    const partner = await DI.partnerRepo.findOneOrFail(whereQuery, {
      populate: ['services', 'serviceLocations', 'clientTypes'],
    });

    const {
      serviceIds: servicesString,
      serviceLocations: serviceLocationString,
      clientTypes: clientTypesString,
      ...rest
    } = req.body;
    const translatedBody = { ...rest, serviceIds: undefined, serviceLocations: undefined, clientTypes: undefined };
    try {
      translatedBody.serviceIds = JSON.parse(servicesString);
    } catch (e) {}
    try {
      translatedBody.serviceLocations = JSON.parse(serviceLocationString);
    } catch (e) {}
    try {
      translatedBody.clientTypes = JSON.parse(clientTypesString);
    } catch (e) {}

    const { serviceIds, clientTypes, serviceLocations, verticalId, ...parsed } =
      partnerNewUpdateFormSchema.parse(translatedBody);
    partner.assign(parsed);

    // Services
    if (serviceIds) {
      const foundServices = await DI.serviceRepo.find({ uuid: serviceIds });
      partner.services.removeAll();
      partner.services.add(...foundServices);
    }

    // Client Types
    if (clientTypes) {
      const foundClientTypes = await DI.clientTypeRepo.find({ uuid: clientTypes.map((s) => s.uuid) });
      partner.clientTypes.removeAll();
      partner.clientTypes.add(...foundClientTypes);
    }

    // Locations
    if (serviceLocations) {
      const existingLocations = [...partner.serviceLocations.getItems()];
      const newLocations: PartnerLocation[] = [];

      serviceLocations.forEach((serviceLoc) => {
        serviceLoc.provinces.forEach((prov: string) => {
          newLocations.push(
            wrap(new PartnerLocation()).assign(
              {
                country: serviceLoc.country,
                province: prov,
                partner,
              },
              { em: em },
            ),
          );
        });
      });
      await em.persistAndFlush([...newLocations]);
      await em.removeAndFlush(existingLocations);
    }

    // Vertical
    if (verticalId && verticalId !== 'null' && verticalId !== 'undefined') {
      // Silently fail if we are given an invalid vertical
      const foundVertical = await DI.verticalRepo.findOne({ uuid: verticalId });
      if (foundVertical) {
        partner.vertical = foundVertical;
      }
    }

    // Logo
    if (file) {
      const result = await uploadFile(file, MediaEntityTypes.PARTNER, 'logo', partner.mediaUuid);
      partner.logo = result.Location;
    }

    await em.persistAndFlush(partner);

    const updatedPartner = await DI.partnerRepo.findOne({ uuid: req.params.partnerUuid }, [
      'services',
      'vertical',
      'serviceLocations',
      'clientTypes',
    ]);
    updatedPartner.signMedia();
    res.json({ data: updatedPartner });
  } catch (e) {
    next(e);
  }
};

export const login = (password: string, user: User) => {
  const isValid = isValidPassword(password, user.hash, user.salt);

  if (isValid) {
    const { token, expires } = generateJWT(user);
    const {
      type,
      client,
      partner,
      firstName,
      lastName,
      email,
      userAgreementCompleted,
      onboardingComplete,
      code,
      approvalStatus,
    } = user;
    const payload = {
      data: {
        token,
        expires,
        type,
        email,
        clientUuid: client?.uuid,
        partnerUuid: partner?.uuid,
        firstName,
        lastName,
        userAgreementCompleted,
        onboardingComplete,
        code,
        approvalStatus,
        userWallet:{isWalletSessionActive:false, message:""}
      },
    };
    return payload;
  } else {
    return null;
  }
};
