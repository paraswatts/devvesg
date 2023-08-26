import { SeedData } from './interface';

export interface SeedQuizQuestionOptions {
  name: string;
  description: string;
  score: number;
  isOther?: boolean;
}

export const QUIZ_QUESTION_OPTIONS: SeedData<SeedQuizQuestionOptions> = {
  ARE_YOU_GOVT_ENTITY_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ARE_YOU_GOVT_ENTITY_NO: {
    data: {
      name: 'No',
      description: '',
      score: 1
    },
  },
  SUBCONTRACTORS_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 0
    },
  },
  SUBCONTRACTORS_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  HUNDRED_PERCENT_RENEWABLE_SOURCE_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  HUNDRED_PERCENT_RENEWABLE_SOURCE_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  OWN_ONSITE_ENERGY_SOURCE_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  OWN_ONSITE_ENERGY_SOURCE_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ONSITE_ENGERY_SOURCE_SOLAR: {
    data: {
      name: 'Solar',
      description: '',
      score: 1
    },
  },
  ONSITE_ENGERY_SOURCE_WIND: {
    data: {
      name: 'Wind',
      description: '',
      score: 1
    },
  },
  ONSITE_ENGERY_SOURCE_COAL: {
    data: {
      name: 'Coal',
      description: '',
      score: 0
    },
  },
  ONSITE_ENGERY_SOURCE_NATURAL_GAS: {
    data: {
      name: 'Natural Gas',
      description: '',
      score: 0
    },
  },
  ONSITE_ENGERY_SOURCE_OTHER: {
    data: {
      name: 'Other',
      description: '',
      score: 0,
      isOther: true
    },
  },
  SCOPE_ONE_AND_TWO_EMISSIONS_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SCOPE_ONE_AND_TWO_EMISSIONS_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  SCOPE_ONE_AND_TWO_TARGET_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SCOPE_ONE_AND_TWO_TARGET_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  SCOPE_ONE_AND_TWO_THIRD_PARTY_VERIFICATION_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SCOPE_ONE_AND_TWO_THIRD_PARTY_VERIFICATION_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  INVEST_IN_CARBON_OFFSETS_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  INVEST_IN_CARBON_OFFSETS_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  WATER_REDUCTION_TARGET_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  WATER_REDUCTION_TARGET_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  RECYCLING_POLICY_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  RECYCLING_POLICY_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  WHAT_TYPE_OF_WASTE_PLASTIC: {
    data: {
      name: 'Plastic',
      description: '',
      score: 0
    },
  },
  WHAT_TYPE_OF_WASTE_TOXIC: {
    data: {
      name: 'Toxic',
      description: '',
      score: 0
    },
  },
  WHAT_TYPE_OF_WASTE_PAPER: {
    data: {
      name: 'Paper',
      description: '',
      score: 0
    },
  },
  WHAT_TYPE_OF_WASTE_GLASS: {
    data: {
      name: 'Glass',
      description: '',
      score: 0
    },
  },
  WHAT_TYPE_OF_WASTE_METAL: {
    data: {
      name: 'Metal',
      description: '',
      score: 0
    },
  },
  WHAT_TYPE_OF_WASTE_WOOD: {
    data: {
      name: 'Wood',
      description: '',
      score: 0
    },
  },
  WHAT_TYPE_OF_WASTE_RUBBER: {
    data: {
      name: 'Rubber',
      description: '',
      score: 0
    },
  },
  WHAT_TYPE_OF_WASTE_OTHER: {
    data: {
      name: 'Other',
      description: '',
      score: 0,
      isOther: true
    },
  },
  MEASURE_PERCENTAGE_OF_WASTE_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  MEASURE_PERCENTAGE_OF_WASTE_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ASSESS_CLIMATE_IMPACT_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ASSESS_CLIMATE_IMPACT_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  OWN_LAND_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  OWN_LAND_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  LAND_MANAGEMENT_PLAN_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  LAND_MANAGEMENT_PLAN_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  REQUIRE_RAW_MATERIALS_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  REQUIRE_RAW_MATERIALS_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  RAW_MATERIALS_CERIFIED_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  RAW_MATERIALS_CERIFIED_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  PUBLIC_DISCLOSE_ENVIRONMENT_DATA_ENERGY: {
    data: {
      name: 'Energy data',
      description: '',
      score: 0
    },
  },
  PUBLIC_DISCLOSE_ENVIRONMENT_DATA_GREENHOUSE: {
    data: {
      name: 'Greenhouse Gas Emissions data',
      description: '',
      score: 0
    },
  },
  PUBLIC_DISCLOSE_ENVIRONMENT_DATA_CARBON_OFFSET: {
    data: {
      name: 'Carbon offset data',
      description: '',
      score: 0
    },
  },
  PUBLIC_DISCLOSE_ENVIRONMENT_DATA_WATER: {
    data: {
      name: 'Water data',
      description: '',
      score: 0
    },
  },
  PUBLIC_DISCLOSE_ENVIRONMENT_DATA_WASTE: {
    data: {
      name: '  Waste data',
      description: '',
      score: 0
    },
  },
  PUBLIC_DISCLOSE_ENVIRONMENT_DATA_RECYCLING: {
    data: {
      name: 'Recylcing data',
      description: '',
      score: 0
    },
  },
  PUBLIC_DISCLOSE_ENVIRONMENT_DATA_BUILDING: {
    data: {
      name: 'Building data',
      description: '',
      score: 0
    },
  },
  PUBLIC_DISCLOSE_ENVIRONMENT_DATA_GREENHOUSE_TECHNOLOGY: {
    data: {
      name: 'Diversity policies',
      description: '',
      score: 0
    },
  },
  PUBLIC_DISCLOSE_ENVIRONMENT_DATA_GREENHOUSE_OTHER: {
    data: {
      name: 'Other',
      description: '',
      score: 0,
      isOther: true
    },
  },
  PUBLIC_DISCLOSE_SOCIAL_DATA_DIVERSE_POLITICS: {
    data: {
      name: 'Diversity policies',
      description: '',
      score: 0
    },
  },
  PUBLIC_DISCLOSE_SOCIAL_DATA_MANAGER: {
    data: {
      name: 'Board, executive, and manager diversity',
      description: '',
      score: 0
    },
  },
  PUBLIC_DISCLOSE_SOCIAL_DATA_SUPPLIER: {
    data: {
      name: 'Supplier diversity',
      description: '',
      score: 0
    },
  },
  PUBLIC_DISCLOSE_SOCIAL_DATA_LOCAL_SUPPLIER: {
    data: {
      name: 'Local supplier',
      description: '',
      score: 0
    },
  },
  PUBLIC_DISCLOSE_SOCIAL_DATA_COMMUNITY_ENGAGEMENT: {
    data: {
      name: 'Community engagement',
      description: '',
      score: 0
    },
  },
  CODE_OF_ETHICS_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  CODE_OF_ETHICS_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ESG_OVERSIGHT_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ESG_OVERSIGHT_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  ENVIRONMENTAL_SOCIAL_INTEGRATED_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENVIRONMENTAL_SOCIAL_INTEGRATED_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  INCORPORATE_ESG_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  INCORPORATE_ESG_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  LONG_TERM_GOALS_ESG_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  LONG_TERM_GOALS_ESG_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  EXPENSE_SAVINGS_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  EXPENSE_SAVINGS_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  MAINSTREAM_ANNUAL_REPORT_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  MAINSTREAM_ANNUAL_REPORT_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  PUBLIC_POLICY_ESG_GOALS_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  PUBLIC_POLICY_ESG_GOALS_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  DEI_INTIATIVE_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  DEI_INTIATIVE_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  BOARD_DIVERSITY_POLICY_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  BOARD_DIVERSITY_POLICY_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  NON_WHITE_LESS_THAN_TEN: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  NON_WHITE_TEN_TWENTY: {
    data: {
      name: '10-20%',
      description: '',
      score: 0.25
    },
  },
  NON_WHITE_TWENTY_THIRTY: {
    data: {
      name: '20-30%',
      description: '',
      score: 0.5
    },
  },
  NON_WHITE_THIRTY_FOURTY: {
    data: {
      name: '30-40%',
      description: '',
      score: 0.75
    },
  },
  NON_WHITE_GREATER_FOURTY: {
    data: {
      name: '>40%',
      description: '',
      score: 1
    },
  },
  NON_WHITE_DONT_KNOW: {
    data: {
      name: "I don't know",
      description: '',
      score: 0
    },
  },
  WOMEN_MANAGERS_LESS_THAN_TEN: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  WOMEN_MANAGERS_TEN_TWENTY_FIVE: {
    data: {
      name: '10-25%',
      description: '',
      score: 0.25
    },
  },
  WOMEN_MANAGERS_TWENTY_FIVE_FOURTY: {
    data: {
      name: '25-40%',
      description: '',
      score: 0.5
    },
  },
  WOMEN_MANAGERS_FOURTY_FIFTY: {
    data: {
      name: '40-50%',
      description: '',
      score: 0.75
    },
  },
  WOMEN_MANAGERS_GREATER_FIFTY: {
    data: {
      name: '>50%',
      description: '',
      score: 1
    },
  },
  WOMEN_MANAGERS_DONT_KNOW: {
    data: {
      name: "I don't know",
      description: '',
      score: 0
    },
  },
  SUPPLIER_DIVERSITY_POLICY_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SUPPLIER_DIVERSITY_POLICY_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  PERCENTAGE_SUPPLIER_DIVERSITY_LESS_THAN_TWENTY: {
    data: {
      name: '<20%',
      description: '',
      score: 0
    },
  },
  PERCENTAGE_SUPPLIER_DIVERSITY_TWENTY_FOURTY: {
    data: {
      name: '20-40%',
      description: '',
      score: 0
    },
  },
  PERCENTAGE_SUPPLIER_DIVERSITY_GREATER_FOURTY: {
    data: {
      name: '>40%',
      description: '',
      score: 1
    },
  },
  SAFETY_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  SAFETY_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  INVEST_IN_COMMUNITY_ORGANISATION_REGULAR: {
    data: {
      name: 'Regularly scheduled and reoccuring contributions',
      description: '',
      score: 1
    },
  },
  INVEST_IN_COMMUNITY_ORGANISATION_OCCASSIONAL: {
    data: {
      name: 'Occassional, non-regular contributions',
      description: '',
      score: 0.5
    },
  },
  INVEST_IN_COMMUNITY_ORGANISATION_NO: {
    data: {
      name: 'No contributions',
      description: '',
      score: 0
    },
  },
  ENGAGE_STAKEHOLDERS_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  ENGAGE_STAKEHOLDERS_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  TOWN_HALL_MEETINGS_REGULAR: {
    data: {
      name: 'Regularly scheduled (once a quarter or more) with leadership',
      description: '',
      score: 1
    },
  },
  TOWN_HALL_MEETINGS_OCCASSIONAL: {
    data: {
      name: 'Occassional, not regularly schedule or less then once a quarter',
      description: '',
      score: 0.5
    },
  },
  TOWN_HALL_MEETINGS_NO: {
    data: {
      name: 'No town hall meetings or employee stakeholder meetings with leadership',
      description: '',
      score: 0
    },
  },
  STAKEHOLDER_MEETINGS_REGULAR: {
    data: {
      name: 'Regularly scheduled (once a quarter or more) with leadership',
      description: '',
      score: 1
    },
  },
  STAKEHOLDER_MEETINGS_OCCASSIONAL: {
    data: {
      name: 'Occassional, not regularly schedule or less then once a quarter',
      description: '',
      score: 0.5
    },
  },
  STAKEHOLDER_MEETINGS_NO: {
    data: {
      name: 'No town hall meetings or community stakeholder meetings with leadership',
      description: '',
      score: 0
    },
  },
  LABOR_WORKPLACE_FAIRNESS_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  LABOR_WORKPLACE_FAIRNESS_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  EMPLOYEEMENT_OUTSIDE_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  EMPLOYEEMENT_OUTSIDE_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  LABOR_GOALS_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  LABOR_GOALS_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  EMPLOYEE_TRANSPORTATION_YES: {
    data: {
      name: 'Yes',
      description: '',
      score: 1
    },
  },
  EMPLOYEE_TRANSPORTATION_NO: {
    data: {
      name: 'No',
      description: '',
      score: 0
    },
  },
  BOARD_CEO_PRESIDENT: {
    data: {
      name: 'Board, CEO, President',
      description: '',
      score: 1
    }
  },
  VP: {
    data: {
      name: 'VP',
      description: '',
      score: 0.75
    }
  },
  DIRECTOR: {
    data: {
      name: 'Director',
      description: '',
      score: 0.5
    }
  },
  MANAGER: {
    data: {
      name: 'Manager',
      description: '',
      score: 0.25
    }
  },
  ENVIRONMENT_DATA_VERIFIED_ENERGY: {
    data: {
      name: 'Energy data',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_DATA_VERIFIED_GREENHOUSE: {
    data: {
      name: 'Greenhouse Gas Emissions data',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_DATA_VERIFIED_CARBON_OFFSET: {
    data: {
      name: 'Carbon offset data',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_DATA_VERIFIED_WATER: {
    data: {
      name: 'Water data',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_DATA_VERIFIED_WASTE: {
    data: {
      name: '  Waste data',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_DATA_VERIFIED_RECYCLING: {
    data: {
      name: 'Recylcing data',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_DATA_VERIFIED_BUILDING: {
    data: {
      name: 'Building data',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_DATA_VERIFIED_GREENHOUSE_TECHNOLOGY: {
    data: {
      name: 'Diversity policies',
      description: '',
      score: 0
    },
  },
  ENVIRONMENT_DATA_VERIFIED_GREENHOUSE_OTHER: {
    data: {
      name: 'Other',
      description: '',
      score: 0,
      isOther: true
    },
  },
  SOCIAL_DATA_VERIFIED_DIVERSE_POLITICS: {
    data: {
      name: 'Diversity policies',
      description: '',
      score: 0
    },
  },
  SOCIAL_DATA_VERIFIED_MANAGER: {
    data: {
      name: 'Board, executive, and manager diversity',
      description: '',
      score: 0
    },
  },
  SOCIAL_DATA_VERIFIED_SUPPLIER: {
    data: {
      name: 'Supplier diversity',
      description: '',
      score: 0
    },
  },
  SOCIAL_DATA_VERIFIED_LOCAL_SUPPLIER: {
    data: {
      name: 'Local supplier',
      description: '',
      score: 0
    },
  },
  SOCIAL_DATA_VERIFIED_COMMUNITY_ENGAGEMENT: {
    data: {
      name: 'Community engagement',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_AEROSPACE: {
    data: {
      name: 'Aerospace',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_AGRICULTURE_FISHING: {
    data: {
      name: 'Agriculture - Fishing',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_AGRICULTURE_LIVESTOCK: {
    data: {
      name: 'Agriculture - Livestock',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_AGRICULTURE_MEAT: {
    data: {
      name: 'Agriculture - Meat & Dairy',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_AGRICULTURE_TIMBER: {
    data: {
      name: 'Agriculture - Timber',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_AGRICULTURE_TOBACCO: {
    data: {
      name: 'Agriculture - Tobacco',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_CE: {
    data: {
      name: 'Chemical Manufacturing',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_CP: {
    data: {
      name: 'Computers - Peripherals',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_CR: {
    data: {
      name: 'Computers - Repair',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_CRT: {
    data: {
      name: 'Computers - Retail',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_CS: {
    data: {
      name: 'Computers - Software',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_CONSTRUCTION: {
    data: {
      name: 'Construction',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_DEFENCE: {
    data: {
      name: 'Defense',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_EDUCATION_ALT: {
    data: {
      name: 'Education - Alternative',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_EDUCATION_HIGH: {
    data: {
      name: 'Education - Higher',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_EDUCATION_PRE: {
    data: {
      name: 'Education - Preschools/Daycares',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_EDUCATION_PRI: {
    data: {
      name: 'Education - Primary & Secondary',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_EDUCATION_SP: {
    data: {
      name: 'Education - Special',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_EDUCATION_VOC: {
    data: {
      name: 'Education - Vocational',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_ENERGY_COAL: {
    data: {
      name: 'Energy - Coal',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_ENERGY_EP: {
    data: {
      name: 'Energy - Electrical Power',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_ENERGY_NU: {
    data: {
      name: 'Energy - Nuclear',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_ENERGY_PET: {
    data: {
      name: 'Energy - Petroleum/Oil',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_ENERGY_RENEW: {
    data: {
      name: 'Energy - Renewable',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_ENTERTAINMENT_AMUSE: {
    data: {
      name: 'Entertainment - Amusement Parks',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_ENTERTAINMENT_ANI: {
    data: {
      name: 'Entertainment - Animation',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_ENTERTAINMENT_CIR: {
    data: {
      name: 'Entertainment - Circus',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_ENTERTAINMENT_EM: {
    data: {
      name: 'Entertainment - Event Management',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_ENTERTAINMENT_FILM: {
    data: {
      name: 'Entertainment - Film',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_ENTERTAINMENT_GAMBLING: {
    data: {
      name: 'Entertainment - Gambling',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_ENTERTAINMENT_GAME: {
    data: {
      name: 'Entertainment - Game Manufacturing',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_ENTERTAINMENT_MEDIA: {
    data: {
      name: 'Entertainment - Media',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_ENTERTAINMENT_MUSIC: {
    data: {
      name: 'Entertainment - Music',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_ENTERTAINMENT_SPORTS: {
    data: {
      name: 'Entertainment - Sports Management and Event Promotion',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_ENTERTAINMENT_TALENT: {
    data: {
      name: 'Entertainment - Talent Agency',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_ENTERTAINMENT_THEATRE: {
    data: {
      name: 'Entertainment - Theatre Production',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_FINANCIAL_ACCOUNT: {
    data: {
      name: 'Financial - Accountancy',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_FINANCIAL_BANKS: {
    data: {
      name: 'Financial - Banks and Credit Unions',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_FINANCIAL_INSURANCE: {
    data: {
      name: 'Financial - Insurance',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_FINANCIAL_INVEST: {
    data: {
      name: 'Financial - Investment Funds',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_FINANCIAL_STOCK: {
    data: {
      name: 'Financial - Stock Brokerages',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_FOOD_AGRI: {
    data: {
      name: 'Food - Agriculture',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_FOOD_PROCESS: {
    data: {
      name: 'Food - Food Processing',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_FOOD_SER: {
    data: {
      name: 'Food - Food Service',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_FOOD_TECH: {
    data: {
      name: 'Food - Food Technology',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_FOOD_GROC: {
    data: {
      name: 'Food - Grocery',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_FOOD_HORTI: {
    data: {
      name: 'Food – Horticulture',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_FOOD_MANU: {
    data: {
      name: 'Food - Manufacturing',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_HEALTH: {
    data: {
      name: 'Health Care',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_HOSPITALITY: {
    data: {
      name: 'Hospitality',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_INFO: {
    data: {
      name: 'Information',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_MANUFACTURE_END: {
    data: {
      name: 'Manufacturing - End Products',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_MANUFACTURE_MACHINE: {
    data: {
      name: 'Manufacturing - Machining',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_MANUFACTURE_RAW: {
    data: {
      name: 'Manufacturing - Raw Materials',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_MASS_MEDIA_BROAD: {
    data: {
      name: 'Mass Media - Broadcasting',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_MASS_MEDIA_FILM: {
    data: {
      name: 'Mass Media - Film',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_MASS_MEDIA_INTERNET: {
    data: {
      name: 'Mass Media - Internet',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_MASS_MEDIA_MUSIC: {
    data: {
      name: 'Mass Media - Music',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_MASS_MEDIA_NEWS: {
    data: {
      name: 'Mass Media - News',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_MASS_MEDIA_PUB: {
    data: {
      name: 'Mass Media - Publishing',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_MUNCI: {
    data: {
      name: 'Municipality',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_OTHER: {
    data: {
      name: 'Other',
      description: '',
      score: 0,
      isOther: true
    },
  },
  INDUSTRY_TYPE_PHARMA: {
    data: {
      name: 'Pharmaceuticals',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_SOV_NAT: {
    data: {
      name: 'Sovereign Nation',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_TELE: {
    data: {
      name: 'Telecommunications',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_TRANSPORT: {
    data: {
      name: 'Transport',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_WATER_DRINK: {
    data: {
      name: 'Water - Drinking Water',
      description: '',
      score: 0
    },
  },
  INDUSTRY_TYPE_WATER_WASTE: {
    data: {
      name: 'Water - Wastewater',
      description: '',
      score: 0
    },
  },
  PERCENT_ONSITE_ENGERY_TEN: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  PERCENT_ONSITE_ENGERY_TEN_THIRTY: {
    data: {
      name: '10-30%',
      description: '',
      score: 0.3
    },
  },
  PERCENT_ONSITE_ENGERY_THIRTY_FIFTY: {
    data: {
      name: '30-50%',
      description: '',
      score: 0.5
    },
  },
  PERCENT_ONSITE_ENGERY_FIFTY_SEVENTY: {
    data: {
      name: '50-70%',
      description: '',
      score: 0.7
    },
  },
  PERCENT_ONSITE_ENGERY_SEVENTY_NINETY: {
    data: {
      name: '70-90%',
      description: '',
      score: 0.9
    },
  },
  PERCENT_ONSITE_ENGERY_HUNDRED: {
    data: {
      name: '>90%',
      description: '',
      score: 1
    },
  },
  PERCENTAGE_OF_WASTE_TEN: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  PERCENTAGE_OF_WASTE_TEN_THIRTY: {
    data: {
      name: '10-30%',
      description: '',
      score: 0.3
    },
  },
  PERCENTAGE_OF_WASTE_THIRTY_FIFTY: {
    data: {
      name: '30-50%',
      description: '',
      score: 0.5
    },
  },
  PERCENTAGE_OF_WASTE_FIFTY_SEVENTY: {
    data: {
      name: '50-70%',
      description: '',
      score: 0.7
    },
  },
  PERCENTAGE_OF_WASTE_SEVENTY_NINETY: {
    data: {
      name: '70-90%',
      description: '',
      score: 0.9
    },
  },
  PERCENTAGE_OF_WASTE_HUNDRED: {
    data: {
      name: '>90%',
      description: '',
      score: 1
    },
  },
  LOCAL_SUPPLY_CHAIN_TEN: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  LOCAL_SUPPLY_CHAIN_TEN_THIRTY: {
    data: {
      name: '10-30%',
      description: '',
      score: 0.3
    },
  },
  LOCAL_SUPPLY_CHAIN_THIRTY_FIFTY: {
    data: {
      name: '30-50%',
      description: '',
      score: 0.5
    },
  },
  LOCAL_SUPPLY_CHAIN_FIFTY_SEVENTY: {
    data: {
      name: '50-70%',
      description: '',
      score: 0.7
    },
  },
  LOCAL_SUPPLY_CHAIN_SEVENTY_NINETY: {
    data: {
      name: '70-90%',
      description: '',
      score: 0.9
    },
  },
  LOCAL_SUPPLY_CHAIN_HUNDRED: {
    data: {
      name: '>90%',
      description: '',
      score: 1
    },
  },
  CARBON_OFFSETS_INVEST_PERCENT_TEN: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  CARBON_OFFSETS_INVEST_PERCENT_TEN_THIRTY: {
    data: {
      name: '10-30%',
      description: '',
      score: 0.3
    },
  },
  CARBON_OFFSETS_INVEST_PERCENT_THIRTY_FIFTY: {
    data: {
      name: '30-50%',
      description: '',
      score: 0.5
    },
  },
  CARBON_OFFSETS_INVEST_PERCENT_FIFTY_SEVENTY: {
    data: {
      name: '50-70%',
      description: '',
      score: 0.7
    },
  },
  CARBON_OFFSETS_INVEST_PERCENT_SEVENTY_NINETY: {
    data: {
      name: '70-90%',
      description: '',
      score: 0.9
    },
  },
  CARBON_OFFSETS_INVEST_PERCENT_HUNDRED: {
    data: {
      name: '>90%',
      description: '',
      score: 1
    },
  },
  LEED_CERTIFIATION_TEN: {
    data: {
      name: '<10%',
      description: '',
      score: 0
    },
  },
  LEED_CERTIFIATION_TEN_THIRTY: {
    data: {
      name: '10-30%',
      description: '',
      score: 0.3
    },
  },
  LEED_CERTIFIATION_THIRTY_FIFTY: {
    data: {
      name: '30-50%',
      description: '',
      score: 0.5
    },
  },
  LEED_CERTIFIATION_FIFTY_SEVENTY: {
    data: {
      name: '50-70%',
      description: '',
      score: 0.7
    },
  },
  LEED_CERTIFIATION_SEVENTY_NINETY: {
    data: {
      name: '70-90%',
      description: '',
      score: 0.9
    },
  },
  LEED_CERTIFIATION_HUNDRED: {
    data: {
      name: '>90%',
      description: '',
      score: 1
    },
  },
  WATER_FOOTPRINTS_GREEN_WATER: {
    data: {
      name: 'Green Water',
      description: '',
      score: 0
    },
  },
  WATER_FOOTPRINTS_GREY_WATER: {
    data: {
      name: 'Grey Water',
      description: '',
      score: 0
    },
  },
  WATER_FOOTPRINTS_BLUE_WATER: {
    data: {
      name: 'Blue Water',
      description: '',
      score: 0
    },
  },
  WATER_FOOTPRINTS_TOTAL_WATER: {
    data: {
      name: 'Total Water',
      description: '',
      score: 0
    },
  },
  WATER_FOOTPRINTS_NONE: {
    data: {
      name: 'None',
      description: '',
      score: 0
    },
  },
};
