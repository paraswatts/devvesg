import * as hubspotApi from '@hubspot/api-client';

let hubspotClient: hubspotApi.Client;
if (process.env.HUBSPOT_API_KEY) {
  hubspotClient = new hubspotApi.Client({ apiKey: process.env.HUBSPOT_API_KEY });
}

async function contactCreate(user: any) {
  if (!hubspotClient) {
    return Promise.resolve({ id: 'HUBSPOT_MOCK_ID' });
  }
  return hubspotClient.crm.contacts.basicApi.create({ properties: user });
}

async function companyCreate(company: any) {
  if (!hubspotClient) {
    return Promise.resolve({ id: 'HUBSPOT_MOCK_ID' });
  }

  // Trim off any leading https:// or http://
  if (company.domain) {
    company.domain = (company.domain || '').replace(/^https?:\/\//, '');
  }
  return hubspotClient.crm.companies.basicApi.create({ properties: company });
}

async function dealCreate(deal: any) {
  if (!hubspotClient) {
    return Promise.resolve({ id: 'HUBSPOT_MOCK_ID' });
  }

  return hubspotClient.crm.deals.basicApi.create({ properties: deal });
}

async function dealUpdateStage(dealId: string, stage: string) {
  if (!hubspotClient) {
    return Promise.resolve({});
  }

  return hubspotClient.crm.deals.basicApi.update(dealId, { properties: { dealstage: stage } });
}

async function companyAssociateToContact(companyId: string, contactId: string) {
  if (!hubspotClient) {
    return Promise.resolve({});
  }

  return hubspotClient.crm.companies.associationsApi.create(companyId, 'contact', contactId, 'company_to_contact');
}

async function companyAssociateToDeal(companyId: string, dealId: string) {
  if (!hubspotClient) {
    return Promise.resolve({});
  }

  return hubspotClient.crm.companies.associationsApi.create(companyId, 'deal', dealId, 'company_to_deal');
}

async function dealAssociateToCompany(dealId: string, companyId: string) {
  if (!hubspotClient) {
    return Promise.resolve({});
  }

  return hubspotClient.crm.deals.associationsApi.create(dealId, 'company', companyId, 'deal_to_company');
}

export const hubspot = {
  contactCreate,
  companyCreate,
  dealCreate,
  dealUpdateStage,
  companyAssociateToContact,
  companyAssociateToDeal,
  dealAssociateToCompany,
};
