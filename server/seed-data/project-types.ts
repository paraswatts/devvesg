import { Collection } from '@mikro-orm/core';
import { RequirementType } from '../entities';
import { SeedData } from './interface';

export interface SeedProjectType {
  name: string;
  objective: string;
  requirementTypes?: Collection<RequirementType>;
  [key: string]: string | Collection<RequirementType>;
}

export const PROJECT_TYPES: SeedData<SeedProjectType> = {
  EV_CHARGING: {
    data: {
      name: 'EV Charging',
      objective: 'Implement charging stations to encourage use of electric vehicles',
      logo: 'anything',
    },
    relationships: {
      requirementTypes: ['EV_TECHNOLOGY_PROVIDER', 'EV_INSTALLATION_PARTNER', 'EV_TAX_ADVISOR', 'EV_PROJECT_FINANCING'],
    },
  },
  SOLAR_ENERGY: {
    data: {
      name: 'Solar Energy',
      objective: 'Install and use solar energy to reduce your carbon-based energy usage',
      logo: 'anything',
    },
    relationships: {
      requirementTypes: [
        'SOLAR_ENERGY_TECHNOLOGY_PROVIDER',
        'SOLAR_ENERGY_INSTALLATION_PARTNER',
        'SOLAR_ENERGY_TAX_ADVISOR',
        'SOLAR_ENERGY_PROJECT_FINANCING',
      ],
    },
  },
  POWER_OPTIMIZATION: {
    data: {
      name: 'Power Optimization',
      objective: 'Engage on a project to optimize the power usage in your facilities',
      logo: 'anything',
    },
    relationships: {
      requirementTypes: ['POWER_TECHNOLOGY_PROVIDER', 'POWER_INSTALLATION_PARTNER', 'POWER_PROJECT_FINANCING'],
    },
  },
  LED_BULB_RETROFIT: {
    data: {
      name: 'LED Bulb Retrofit',
      objective: 'Retrofit your facility with LED bulbs and save massive amounts of energy',
      logo: 'anything',
    },
    relationships: {
      requirementTypes: [
        'LED_TECHNOLOGY_PROVIDER',
        'LED_INSTALLATION_PARTNER',
        'LED_TAX_ADVISOR',
        'LED_PROJECT_FINANCING',
      ],
    },
  },
  ENGAGE_EMPLOYEES: {
    data: {
      name: 'Engage Employees',
      objective:
        'Get your employees involved in impactful projects they can do on their own and get data from their efforts rolled up to your organization',
      logo: 'anything',
    },
    relationships: {
      requirementTypes: ['EMPLOYEE_PROJECTS_FOR_INDIVIDUALS'],
    },
  },
  ENGAGE_CITIZENS: {
    data: {
      name: 'Engage Citizens',
      objective:
        'Get your citizens involved in impactful projects they can do on their own and get data from their efforts rolled up to your city-wide efforts',
      logo: 'anything',
    },
    relationships: {
      requirementTypes: ['CITIZEN_PROJECTS_FOR_INDIVIDUALS'],
    },
  },
  FOREST_MANAGEMENT: {
    data: {
      name: 'Forest Management',
      objective: 'Determine the carbon capture potential of your forest and then get help to protect it',
      logo: 'anything',
    },
    relationships: { requirementTypes: ['FOREST_MANAGEMENT_SERVICE', 'FOREST_FINANCING_FOR_PROJECTS'] },
  },
  DETERMINE_CARBON_POTENTIAL: {
    data: {
      name: 'Determine Carbon Potential',
      objective: 'Leverage our partner ecosystem to determine the carbon capture potential of your land',
      logo: 'anything',
    },
    relationships: { requirementTypes: ['CARBON_MANAGEMENT_SERVICE'] },
  },
  CERTIFIED_OCEAN_PLASTIC: {
    data: {
      name: 'Certified Ocean Plastic',
      objective: 'Offset your plastic usage with certified and tracked plastic recovered from the ocean',
      logo: 'anything',
    },
    relationships: { requirementTypes: ['OCEAN_PLASTIC_PROVIDER'] },
  },
  MONITOR_WASTE: {
    data: {
      name: 'Monitor Waste',
      objective: 'Leverage technology to monitor your food waste in order to right-size portions and increase profits',
      logo: 'anything',
    },
    relationships: { requirementTypes: ['WASTE_TECHNOLOGY_PROVIDER'] },
  },
  BUILD_A_PLASTIC_VILLAGE: {
    data: {
      name: 'Build a Plastic Village',
      objective:
        "Join us as we leverage a collection of technologies to build completely sustainable villages to house the world's homeless",
      logo: 'anything',
    },
    relationships: {
      requirementTypes: [
        'PLASTIC_VILLAGE_PLASTIC_PROVIDER',
        'PLASTIC_VILLAGE_POWER_PROVIDER',
        'PLASTIC_VILLAGE_WATER_PROVIDER',
      ],
    },
  },
  PEER_ESG_RANKING: {
    data: {
      name: 'Peer ESG Ranking',
      objective:
        "Get a report on how you're doing in the ESG space versus your peer companies and learn the most impactful places to take action",
      logo: 'anything',
    },
    relationships: { requirementTypes: ['ESG_RATING_PROVIDER'] },
  },
  ESG_IMPACT_ON_STOCK: {
    data: {
      name: 'ESG Impact on Stock',
      objective: 'Look into detailed analysis of your achievement against ESG KPIs and their impact on your stock',
      logo: 'anything',
    },
    relationships: { requirementTypes: ['ESG_ANALYTICS_COMPANY'] },
  },
};
