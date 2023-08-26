import { Collection } from '@mikro-orm/core';
import { ProjectType } from '../entities';
import { SeedData } from './interface';

export interface SeedInitiative {
  name: string;
  objective: string;
  logo: string;
  projectTypes?: Collection<ProjectType>;
  [key: string]: string | Collection<ProjectType>;
}

export const INITIATIVES: SeedData<SeedInitiative> = {
  ENERGY_REDUCTION: {
    data: {
      name: 'Energy Reduction',
      objective: 'Get help with reducing your overall energy usage',
      logo: 'anything',
      onboardingLogo: 'anything',
    },
    relationships: { projectTypes: ['EV_CHARGING', 'SOLAR_ENERGY', 'POWER_OPTIMIZATION', 'LED_BULB_RETROFIT'] },
  },
  LAND_CARBON_MANAGEMENT: {
    data: {
      name: 'Land Carbon Management',
      objective: 'Identify opportunities and take action to improve the carbon capture of your land',
      logo: 'anything',
      onboardingLogo: 'anything',
    },
    relationships: { projectTypes: ['FOREST_MANAGEMENT', 'DETERMINE_CARBON_POTENTIAL'] },
  },
  REDUCE_PLASTIC_WASTE: {
    data: {
      name: 'Reduce Plastic Waste',
      objective: 'Take action to reduce or eliminate your plastic waste',
      logo: 'anything',
      onboardingLogo: 'anything',
    },
    relationships: { projectTypes: ['CERTIFIED_OCEAN_PLASTIC', 'MONITOR_WASTE', 'BUILD_A_PLASTIC_VILLAGE'] },
  },
  REDUCE_INDIVIDUAL_CARBON_EMISSIONS: {
    data: {
      name: 'Reduce Individual Carbon Emissions',
      objective: 'Help individuals in your organization take action to reduce their carbon footprint',
      logo: 'anything',
      onboardingLogo: 'anything',
    },
    relationships: { projectTypes: ['ENGAGE_EMPLOYEES', 'ENGAGE_CITIZENS'] },
  },
  ESTABLISH_ESG_GRADE: {
    data: {
      name: 'Establish ESG Grade',
      objective: "Get a baseline of where you are now and how it's impacting your company financially",
      logo: 'anything',
      onboardingLogo: 'anything',
    },
    relationships: { projectTypes: ['PEER_ESG_RANKING', 'ESG_IMPACT_ON_STOCK'] },
  },
};
