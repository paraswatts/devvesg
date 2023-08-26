import { QuestionType, ScoreType } from '../enums';
import { SeedData } from './interface';
import { SeedQuizQuestion } from './quiz-question';

export const QUIZ_QUESTIONS_ENVIRONMENTAL: SeedData<SeedQuizQuestion> = {
  HUNDRED_PERCENT_RENEWABLE_SOURCE: {
    data: {
      name: 'Has your company established a 100% renewable energy or net-zero use target?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 5,
    },
    relationships: {
      options: ['HUNDRED_PERCENT_RENEWABLE_SOURCE_YES', 'HUNDRED_PERCENT_RENEWABLE_SOURCE_NO']
    },
  },
  OWN_ONSITE_ENERGY_SOURCE: {
    data: {
      name: 'Do you power your own buildings with onsite energy [solar panels, etc.]?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 6,
    },
    relationships: {
      options: ['OWN_ONSITE_ENERGY_SOURCE_YES', 'OWN_ONSITE_ENERGY_SOURCE_NO'],
    },
  },
  ONSITE_ENGERY_SOURCE: {
    data: {
      name: 'What is your onsite energy source? ',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 7,
    },
    relationships: {
      options: ['ONSITE_ENGERY_SOURCE_SOLAR', 'ONSITE_ENGERY_SOURCE_WIND', 'ONSITE_ENGERY_SOURCE_COAL', 'ONSITE_ENGERY_SOURCE_NATURAL_GAS', 'ONSITE_ENGERY_SOURCE_OTHER'],
      dependencies: ['OWN_ONSITE_ENERGY_SOURCE_YES']
    },
  },
  PERCENT_ONSITE_ENGERY: {
    data: {
      name: 'What percentage of your energy use is covered by onsite energy production? ',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 8,
    },
    relationships: {
      options: ['PERCENT_ONSITE_ENGERY_TEN', 'PERCENT_ONSITE_ENGERY_TEN_THIRTY', 'PERCENT_ONSITE_ENGERY_THIRTY_FIFTY', 'PERCENT_ONSITE_ENGERY_FIFTY_SEVENTY', 'PERCENT_ONSITE_ENGERY_SEVENTY_NINETY', 'PERCENT_ONSITE_ENGERY_HUNDRED'],
      dependencies: ['OWN_ONSITE_ENERGY_SOURCE_YES']
    },
  },
  SCOPE_ONE_AND_TWO_EMISSIONS: {
    data: {
      name: 'Does your company measure or calculate scope 1 and 2 emissions? ',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 9,
    },
    relationships: {
      options: ['SCOPE_ONE_AND_TWO_EMISSIONS_YES', 'SCOPE_ONE_AND_TWO_EMISSIONS_NO'],
    },
  },
  SCOPE_ONE_AND_TWO_TARGET: {
    data: {
      name: 'Has your company set a separate or combined scope 1 and scope 2 emissions reduction target? ',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 10,
    },
    relationships: {
      options: ['SCOPE_ONE_AND_TWO_TARGET_YES', 'SCOPE_ONE_AND_TWO_TARGET_NO'],
    },
  },
  SCOPE_ONE_AND_TWO_THIRD_PARTY_VERIFICATION: {
    data: {
      name: 'Does your company recieve third-party verification for its scope 1 and 2 emissions?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 11,
    },
    relationships: {
      options: ['SCOPE_ONE_AND_TWO_THIRD_PARTY_VERIFICATION_YES', 'SCOPE_ONE_AND_TWO_THIRD_PARTY_VERIFICATION_NO'],
      dependencies: ['SCOPE_ONE_AND_TWO_TARGET_YES']
    },
  },
  INVEST_IN_CARBON_OFFSETS: {
    data: {
      name: 'Do you invest in carbon offsets? ',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 12,
    },
    relationships: {
      options: ['INVEST_IN_CARBON_OFFSETS_YES', 'INVEST_IN_CARBON_OFFSETS_NO']
    },
  },
  CARBON_OFFSETS_INVEST_PERCENT: {
    data: {
      name: 'What percentage of your CO2 emissions are offset by carbon offset investments? ',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 13,
    },
    relationships: {
      options: ['CARBON_OFFSETS_INVEST_PERCENT_TEN', 'CARBON_OFFSETS_INVEST_PERCENT_TEN_THIRTY', 'CARBON_OFFSETS_INVEST_PERCENT_THIRTY_FIFTY', 'CARBON_OFFSETS_INVEST_PERCENT_FIFTY_SEVENTY', 'CARBON_OFFSETS_INVEST_PERCENT_SEVENTY_NINETY', 'CARBON_OFFSETS_INVEST_PERCENT_HUNDRED'],
      dependencies: ['INVEST_IN_CARBON_OFFSETS_YES']
    },
  },
  WATER_REDUCTION_TARGET: {
    data: {
      name: 'Has your company set a water use reduction target?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 14,
    },
    relationships: {
      options: ['WATER_REDUCTION_TARGET_YES', 'WATER_REDUCTION_TARGET_NO']
    },
  },
  WATER_FOOTPRINTS: {
    data: {
      name: 'Which water footprints do you track for your organization?',
      description: '',
      questionType: QuestionType.MULTI_SELECT,
      sortOrder: 15,
    },
    relationships: {
      options: ['WATER_FOOTPRINTS_GREEN_WATER', 'WATER_FOOTPRINTS_GREY_WATER', 'WATER_FOOTPRINTS_BLUE_WATER', 'WATER_FOOTPRINTS_TOTAL_WATER', 'WATER_FOOTPRINTS_NONE']
    }
  },
  RECYCLING_POLICY: {
    data: {
      name: 'Do you have waste management or recycling policies in place? ',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 16,
    },
    relationships: {
      options: ['RECYCLING_POLICY_YES', 'RECYCLING_POLICY_NO']
    },
  },
  WHAT_TYPE_OF_WASTE: {
    data: {
      name: 'What types of waste do you produce? ',
      description: '',
      questionType: QuestionType.MULTI_SELECT,
      sortOrder: 17,
    },
    relationships: {
      options: [
        'WHAT_TYPE_OF_WASTE_PLASTIC',
        'WHAT_TYPE_OF_WASTE_TOXIC',
        'WHAT_TYPE_OF_WASTE_PAPER',
        'WHAT_TYPE_OF_WASTE_GLASS',
        'WHAT_TYPE_OF_WASTE_METAL',
        'WHAT_TYPE_OF_WASTE_WOOD',
        'WHAT_TYPE_OF_WASTE_RUBBER',
        'WHAT_TYPE_OF_WASTE_OTHER'
      ]
    },
  },
  MEASURE_PERCENTAGE_OF_WASTE: {
    data: {
      name: 'Do you measure percentage of waste that is recycled or reused? ',
      description: '',
      hasScore: false,
      questionType: QuestionType.RADIO,
      sortOrder: 18,
    },
    relationships: {
      options: ['MEASURE_PERCENTAGE_OF_WASTE_YES', 'MEASURE_PERCENTAGE_OF_WASTE_NO']
    },
  },
  PERCENTAGE_OF_WASTE: {
    data: {
      name: 'What percentage of your waste is recycled or reused? ',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 19,
    },
    relationships: {
      options: ['PERCENTAGE_OF_WASTE_TEN', 'PERCENTAGE_OF_WASTE_TEN_THIRTY', 'PERCENTAGE_OF_WASTE_THIRTY_FIFTY', 'PERCENTAGE_OF_WASTE_FIFTY_SEVENTY', 'PERCENTAGE_OF_WASTE_SEVENTY_NINETY', 'PERCENTAGE_OF_WASTE_HUNDRED'],
      dependencies: ['MEASURE_PERCENTAGE_OF_WASTE_YES']
    },
  },
  ASSESS_CLIMATE_IMPACT: {
    data: {
      name: 'Does your company assess the climate impacts of major suppliers and engage them on climate-related issues?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 20,
    },
    relationships: {
      options: ['ASSESS_CLIMATE_IMPACT_YES', 'ASSESS_CLIMATE_IMPACT_NO']
    },
  },
  EMPLOYEE_TRANSPORTATION: {
    data: {
      name: 'Do you employees have alternative transportation options to on-site workplaces?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 21,
    },
    relationships: {
      options: [
        'EMPLOYEE_TRANSPORTATION_YES',
        'EMPLOYEE_TRANSPORTATION_NO',
      ]
    }
  },
  LEED_CERTIFIATION: {
    data: {
      name: 'What percent of your buildings have LEED or other green building certifications? ',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 22,
    },
    relationships: {
      options: ['LEED_CERTIFIATION_TEN', 'LEED_CERTIFIATION_TEN_THIRTY', 'LEED_CERTIFIATION_THIRTY_FIFTY', 'LEED_CERTIFIATION_FIFTY_SEVENTY', 'LEED_CERTIFIATION_SEVENTY_NINETY', 'LEED_CERTIFIATION_HUNDRED'],
    }
  },
  OWN_LAND: {
    data: {
      name: 'Do you own land?',
      description: '',
      hasScore: false,
      questionType: QuestionType.RADIO,
      sortOrder: 23,
    },
    relationships: {
      options: ['OWN_LAND_YES', 'OWN_LAND_NO']
    },
  },
  LAND_MANAGEMENT_PLAN: {
    data: {
      name: 'Do you have a land management plan? ',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 24,
    },
    relationships: {
      options: ['LAND_MANAGEMENT_PLAN_YES', 'LAND_MANAGEMENT_PLAN_NO'],
      dependencies: ['OWN_LAND_YES']
    },
  },
  REQUIRE_RAW_MATERIALS: {
    data: {
      name: 'Does your company require mining raw materials for its product or operations? ',
      description: '',
      hasScore: false,
      questionType: QuestionType.RADIO,
      sortOrder: 25,
    },
    relationships: {
      options: ['REQUIRE_RAW_MATERIALS_YES', 'REQUIRE_RAW_MATERIALS_NO'],
    },
  },
  RAW_MATERIALS_CERIFIED: {
    data: {
      name: 'Has your raw material sourcing been verified by Standard for Responsible Mining?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 26,
    },
    relationships: {
      options: ['RAW_MATERIALS_CERIFIED_YES', 'RAW_MATERIALS_CERIFIED_NO'],
      dependencies: ['REQUIRE_RAW_MATERIALS_YES']
    },
  },
};
