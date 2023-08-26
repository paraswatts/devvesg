import { Collection } from '@mikro-orm/core';
import { Partner } from '../entities';
import { SeedData } from './interface';

export interface SeedRequirementType {
  name: string;
  description: string;
  partners?: Collection<Partner>;
  [key: string]: string | Collection<Partner>;
}

export const REQUIREMENT_TYPES: SeedData<SeedRequirementType> = {
  EMPLOYEE_PROJECTS_FOR_INDIVIDUALS: {
    data: {
      name: 'Employee Projects for Individuals',
      description: 'A partner that can help engage your employees in projects',
    },
    relationships: { partners: ['BRIGHT_ACTION'] },
  },
  CITIZEN_PROJECTS_FOR_INDIVIDUALS: {
    data: {
      name: 'Citizen Projects for Individuals',
      description: 'A partner that can help engage your citizens in projects',
    },
    relationships: { partners: ['BRIGHT_ACTION'] },
  },
  LED_TECHNOLOGY_PROVIDER: {
    data: { name: 'LED Technology Provider', description: 'Provider of LED lighting products' },
    relationships: { partners: ['LED_GREENLIGHT'] },
  },

  LED_INSTALLATION_PARTNER: {
    data: { name: 'LED Installation Partner', description: 'Installers for your LED lighting projects' },
    relationships: { partners: ['ABM'] },
  },
  LED_TAX_ADVISOR: {
    data: { name: 'LED Tax Advisor', description: 'Tax advisors specializing in lighting projects and retrofits' },
    relationships: { partners: ['DANTO_BUILDERS'] },
  },
  LED_PROJECT_FINANCING: {
    data: { name: 'LED Project Financing', description: 'Financing options for your lighting project' },
    relationships: { partners: ['DEVVESG_CARBON_STREAMING'] },
  },
  SOLAR_ENERGY_TECHNOLOGY_PROVIDER: {
    data: { name: 'Solar Energy Technology Provider', description: 'Provider of solar energy products' },
    relationships: { partners: ['CHITENDAI'] },
  },
  SOLAR_ENERGY_INSTALLATION_PARTNER: {
    data: { name: 'Solar Energy Installation Partner', description: 'Installers for your solar energy projects' },
    relationships: { partners: ['ABM'] },
  },
  SOLAR_ENERGY_TAX_ADVISOR: {
    data: { name: 'Solar Energy Tax Advisor', description: 'Tax advisors specializing in solar energy projects' },
    relationships: { partners: ['DANTO_BUILDERS'] },
  },
  SOLAR_ENERGY_PROJECT_FINANCING: {
    data: { name: 'Solar Energy Project Financing', description: 'Financing options for your solar energy project' },
    relationships: { partners: ['DEVVESG_CARBON_STREAMING'] },
  },
  POWER_TECHNOLOGY_PROVIDER: {
    data: { name: 'Power Technology Provider', description: 'Provider of clean energy products' },
    relationships: { partners: ['CYBERIAL'] },
  },
  POWER_INSTALLATION_PARTNER: {
    data: { name: 'Power Installation Partner', description: 'Installers for your clean energy projects' },
    relationships: { partners: ['ABM'] },
  },
  POWER_PROJECT_FINANCING: {
    data: { name: 'Power Project Financing', description: 'Financing options for your clean energy project' },
    relationships: { partners: ['DEVVESG_CARBON_STREAMING'] },
  },
  EV_TECHNOLOGY_PROVIDER: {
    data: { name: 'EV Technology Provider', description: 'Provider of EV charging products' },
    relationships: { partners: ['VOLTPOST'] },
  },
  EV_INSTALLATION_PARTNER: {
    data: { name: 'EV Installation Partner', description: 'Installers for your EV charging projects' },
    relationships: { partners: ['ABM'] },
  },
  EV_TAX_ADVISOR: {
    data: { name: 'EV Tax Advisor', description: 'Tax advisors specializing in EV charging projects' },
    relationships: { partners: ['DANTO_BUILDERS'] },
  },
  EV_PROJECT_FINANCING: {
    data: { name: 'EV Project Financing', description: 'Financing options for your EV charging project' },
    relationships: { partners: ['DEVVESG_CARBON_STREAMING'] },
  },
  FOREST_MANAGEMENT_SERVICE: {
    data: { name: 'Forest Management Service', description: 'Management service providers for forrest projects' },
    relationships: { partners: ['COLUMBIA_CARBON_EXCHANGE_(GCS)', 'HAYSTACK'] },
  },
  FOREST_FINANCING_FOR_PROJECTS: {
    data: { name: 'Forest Financing for Projects', description: 'Financing options for your foresty projects' },
    relationships: { partners: ['DEVVESG_CARBON_STREAMING', 'NCX'] },
  },
  CARBON_MANAGEMENT_SERVICE: {
    data: {
      name: 'Carbon Management Service',
      description: 'Companies to help you manage your carbon credits from certification to sale',
    },
    relationships: { partners: ['NCX', 'HAYSTACK', 'COLUMBIA_CARBON_EXCHANGE_(GCS)'] },
  },
  OCEAN_PLASTIC_PROVIDER: {
    data: {
      name: 'Ocean Plastic Provider',
      description: 'Providers of certified ocean plastic for use in your products',
    },
    relationships: { partners: ['OCEANS_INTEGRITY_(RIO)'] },
  },
  PLASTIC_VILLAGE_PLASTIC_PROVIDER: {
    data: {
      name: 'Plastic Village Plastic Provider',
      description: 'Provider of plastic for the plastic village concept projects',
    },
    relationships: { partners: ['OCEANS_INTEGRITY_(RIO)'] },
  },
  PLASTIC_VILLAGE_POWER_PROVIDER: {
    data: {
      name: 'Plastic Village Power Provider',
      description: 'Provider of power for the plastic village concept projects',
    },
    relationships: { partners: ['LOCOAL'] },
  },
  PLASTIC_VILLAGE_WATER_PROVIDER: {
    data: {
      name: 'Plastic Village Water Provider',
      description: 'Provider of water for the plastic village concept projects',
    },
    relationships: { partners: ['GENESIS_SYSTEMS'] },
  },
  WASTE_TECHNOLOGY_PROVIDER: {
    data: { name: 'Waste Technology Provider', description: 'Providers of waste analysis and reduction technologies' },
    relationships: { partners: ['FLOWASTE'] },
  },
  ESG_ANALYTICS_COMPANY: {
    data: {
      name: 'ESG Analytics Company',
      description: 'ESG analytics companies to help you find your biggest impact',
    },
    relationships: { partners: ['CONFLUENCE_ANALYTICS'] },
  },
  ESG_RATING_PROVIDER: {
    data: { name: 'ESG Rating Provider', description: 'Providers that supply various ESG-centric ratings' },
    relationships: { partners: ['CLEAR_RATING'] },
  },
};
