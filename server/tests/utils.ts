import request from 'supertest';
import { Express } from 'express';
import { DocumentNode, print } from 'graphql';

import { User } from '../entities';
import { generateJWT } from '../lib/util';

const GQL_ENDPOINT = '/graphql';
const AWS_SIGNATURE_ACCESS_KEY = 'AWSAccessKeyId=';
const AWS_SIGNATURE_KEY = 'Signature=';
export const UNASSIGNED_UUID = '00000000-0000-0000-0000-000000000000';

interface GqlRequestPayload {
  query: string;
  variables?: { [key: string]: any };
}

const getAuthHeaderForTestUser = (user: Partial<User>) => {
  const { token } = generateJWT(user as User);
  return token;
};

export const getGqlRequestPayload = (query: DocumentNode, variables?: { [key: string]: any }): GqlRequestPayload => {
  return {
    query: print(query),
    variables,
  };
};

export const gqlRequest = (app: Express, payload: GqlRequestPayload, user: Partial<User>) => {
  const r = request(app).post(GQL_ENDPOINT).send(payload);
  if (user) {
    return r.set('Authorization', getAuthHeaderForTestUser(user));
  } else {
    return r;
  }
};

export const mediaIsSigned = (media: string) => {
  return media.includes(AWS_SIGNATURE_ACCESS_KEY) && media.includes(AWS_SIGNATURE_KEY);
};

export const mediaIsSignedTest = (media: string) => {
  return true;
};
