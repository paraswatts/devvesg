import { getSignedUrl } from '../../config/s3';
import { MediaEntityTypes } from '../../interfaces';
import { RequirementDocumentTypes, RequirementDocument } from '../../entities';
import { ResolverFn } from './utils';

const resolveSignedUrl: ResolverFn<string, any, RequirementDocument> = (document) => {
  if (document.type === RequirementDocumentTypes.URL) {
    return document.file;
  } else if (document.type === RequirementDocumentTypes.FILE) {
    return getSignedUrl(document.file, MediaEntityTypes.REQUIREMENT_DOCUMENT, 'file', document.mediaUuid);
  } else {
    return null;
  }
};

export const resolvers = {
  Query: {},
  Mutation: {},
  RequirementDocument: {
    file: resolveSignedUrl,
  },
  RequirementDocumentType: {
    FILE: RequirementDocumentTypes.FILE,
    URL: RequirementDocumentTypes.URL,
  },
};
