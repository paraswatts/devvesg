import { PassportStatic } from 'passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { DI } from '../index';
import { AuthenticationError } from '../classes/errors';
import { UserTypes } from '../entities';
import { ApprovalStatuses } from '../enums';

declare global {
  namespace Express {
    export interface User extends PassportUser {}
  }
}

export interface PassportUser {
  uuid: string;
  type: UserTypes;
  firstName: string;
  lastName: string;
  email: string;
  clientUuid?: string;
  partnerUuid?: string;
  approvalStatus: ApprovalStatuses;
}

export const applyPassportStrategy = (passport: PassportStatic) => {
  const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new Strategy(options, async (payload, done) => {
      try {
        const user = await DI.userRepo.findOneOrFail({ uuid: payload.uuid });

        if (user) {
          const passportUser: PassportUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            uuid: user.uuid,
            type: user.type,
            clientUuid: user.client?.uuid,
            partnerUuid: user.partner?.uuid,
            approvalStatus: user.approvalStatus,
          };
          return done(null, passportUser);
        }
        return done(null, false);
      } catch (e) {
        const authError = new AuthenticationError();
        return done(authError, false);
      }
    }),
  );
};
