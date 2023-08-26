import { RequirementDocument, RequirementDocumentTypes } from '../../entities';

export const requirementDocument1Fixture: Partial<RequirementDocument> = {
  uuid: 'aa111111-1111-1111-1111-111111111111',
  name: 'requirement-document-1',
  type: RequirementDocumentTypes.FILE,
  file: 'https://via.placeholder.com/150',
};

export const requirementDocument2Fixture: Partial<RequirementDocument> = {
  uuid: 'aa111111-1111-1111-1111-111111111112',
  name: 'requirement-document-2',
  type: RequirementDocumentTypes.FILE,
  file: 'https://via.placeholder.com/150',
};

export const requirementDocument3Fixture: Partial<RequirementDocument> = {
  uuid: 'aa111111-1111-1111-1111-111111111113',
  name: 'requirement-document-3',
  type: RequirementDocumentTypes.URL,
  file: 'http://www.example.com/file.pdf',
};

export const requirementDocument4Fixture: Partial<RequirementDocument> = {
  uuid: 'aa111111-1111-1111-1111-111111111114',
  name: 'requirement-document-4',
  type: RequirementDocumentTypes.URL,
  file: 'http://www.example.com/file.pdf',
};

export const requirementDocumentFixtures = [
  requirementDocument1Fixture,
  requirementDocument2Fixture,
  requirementDocument3Fixture,
  requirementDocument4Fixture,
];
