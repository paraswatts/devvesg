import { Collection } from '@mikro-orm/core';
import { QuizQuestion } from '../entities';
import { SeedData } from './interface';

export interface SeedQuizSection {
  name: string;
  description: string;
  sortOrder: number;
  key?: string;
  questions?: Collection<QuizQuestion>;
  [key: string]: string | number | Collection<QuizQuestion>;
}

export const QUIZ_SECTIONS: SeedData<SeedQuizSection> = {
  GENERAL: {
    data: {
      name: 'General',
      description: 'General',
      sortOrder: 1,
    },
    relationships: {
      questions: [
        'PRIMARY_REGION',
        'ARE_YOU_GOVT_ENTITY',
        'SUBCONTRACTORS',
        'INDUSTRY'
      ],
    },
  },
  ENVIRONMENTAL: {
    data: {
      name: 'Environmental',
      description: 'Environmental',
      sortOrder: 2,
      key: 'environmental'
    },
    relationships: {
      questions: [
        'HUNDRED_PERCENT_RENEWABLE_SOURCE',
        'OWN_ONSITE_ENERGY_SOURCE',
        'ONSITE_ENGERY_SOURCE',
        'PERCENT_ONSITE_ENGERY',
        'SCOPE_ONE_AND_TWO_EMISSIONS',
        'SCOPE_ONE_AND_TWO_TARGET',
        'SCOPE_ONE_AND_TWO_THIRD_PARTY_VERIFICATION',
        'INVEST_IN_CARBON_OFFSETS',
        'CARBON_OFFSETS_INVEST_PERCENT',
        'WATER_REDUCTION_TARGET',
        'WATER_FOOTPRINTS',
        'RECYCLING_POLICY',
        'WHAT_TYPE_OF_WASTE',
        'MEASURE_PERCENTAGE_OF_WASTE',
        'PERCENTAGE_OF_WASTE',
        'ASSESS_CLIMATE_IMPACT',
        'EMPLOYEE_TRANSPORTATION',
        'LEED_CERTIFIATION',
        'OWN_LAND',
        'LAND_MANAGEMENT_PLAN',
        'REQUIRE_RAW_MATERIALS',
        'RAW_MATERIALS_CERIFIED'
      ],
    },
  },
  SOCIAL: {
    data: {
      name: 'Social',
      description: 'Social',
      sortOrder: 3,
      key: 'social'
    },
    relationships: {
      questions: [
        'DEI_INTIATIVE',
        'BOARD_DIVERSITY_POLICY',
        'NON_WHITE',
        'WOMEN_MANAGERS',
        'SUPPLIER_DIVERSITY_POLICY',
        'PERCENTAGE_SUPPLIER_DIVERSITY',
        'LOCAL_SUPPLY_CHAIN',
        'SAFETY',
        'INVEST_IN_COMMUNITY_ORGANISATION',
        'ENGAGE_STAKEHOLDERS',
        'TOWN_HALL_MEETINGS',
        'STAKEHOLDER_MEETINGS',
        'LABOR_WORKPLACE_FAIRNESS',
        'EMPLOYEEMENT_OUTSIDE',
        'LABOR_GOALS'
      ],
    },
  },
  GOVERNANCE: {
    data: {
      name: 'Governance',
      description: 'Governance',
      sortOrder: 4,
      key: 'governance'
    },
    relationships: {
      questions: [
        'PUBLIC_DISCLOSE_ENVIRONMENT_DATA',
        'ENVIRONMENT_DATA_VERIFIED',
        'PUBLIC_DISCLOSE_SOCIAL_DATA',
        'SOCIAL_DATA_VERIFIED',
        'CODE_OF_ETHICS',
        'HIGHEST_MANAGEMENT_POSITION',
        'ESG_OVERSIGHT',
        'ENVIRONMENTAL_SOCIAL_INTEGRATED',
        'INCORPORATE_ESG',
        'LONG_TERM_GOALS_ESG',
        'EXPENSE_SAVINGS',
        'MAINSTREAM_ANNUAL_REPORT',
        'PUBLIC_POLICY_ESG_GOALS',
      ],
    },
  },
};
