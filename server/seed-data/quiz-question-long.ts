import { QuestionType } from '../enums';
import { SeedData } from './interface';
import { SeedQuizQuestion } from './quiz-question';

export const QUIZ_QUESTIONS_LONG: SeedData<SeedQuizQuestion> = {
  ENVIRONMENT_QUESTION_1: {
    data: {
      name: 'Does your company track non-greenhouse gas emissions produced (like particulate matter, nitrous oxide, sulfur oxide, volatile organic compounds)?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 1,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_1_OPTION_1',
        'ENVIRONMENT_QUESTION_1_OPTION_2'
      ]
    },
  },
  ENVIRONMENT_QUESTION_137: {
    data: {
      name: 'How much percentage was reduced for particulate matter in the last 5 years?',
      description: '',
      questionType: QuestionType.NUMBER,
      sortOrder: 2,
      lowerLimit: 0,
      upperLimit: 100
    },
    relationships: {
      dependencies: ['ENVIRONMENT_QUESTION_1_OPTION_1']
    },
  },
  ENVIRONMENT_QUESTION_138: {
    data: {
      name: 'How much percentage was reduced for nitrous oxide in the last 5 years?',
      description: '',
      questionType: QuestionType.NUMBER,
      sortOrder: 3,
      lowerLimit: 0,
      upperLimit: 100
    },
    relationships: {
      dependencies: ['ENVIRONMENT_QUESTION_1_OPTION_1']
    },
  },
  ENVIRONMENT_QUESTION_139: {
    data: {
      name: 'How much percentage was reduced for sulfur oxide in the last 5 years?',
      description: '',
      questionType: QuestionType.NUMBER,
      sortOrder: 4,
      lowerLimit: 0,
      upperLimit: 100
    },
    relationships: {
      dependencies: ['ENVIRONMENT_QUESTION_1_OPTION_1']
    },
  },
  ENVIRONMENT_QUESTION_140: {
    data: {
      name: 'How much percentage was reduced for volatile organic compounds in the last 5 years?',
      description: '',
      questionType: QuestionType.NUMBER,
      sortOrder: 5,
      lowerLimit: 0,
      upperLimit: 100
    },
    relationships: {
      dependencies: ['ENVIRONMENT_QUESTION_1_OPTION_1']
    },
  },
  ENVIRONMENT_QUESTION_2: {
    data: {
      name: 'Does your company have an air pollution reduction target?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 6,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_2_OPTION_1',
        'ENVIRONMENT_QUESTION_2_OPTION_2'
      ]
    },
  },
  ENVIRONMENT_QUESTION_141: {
    data: {
      name: 'How much percentage for air pollution was reduced in the last 5 years',
      description: '',
      questionType: QuestionType.NUMBER,
      sortOrder: 7,
      lowerLimit: 0,
      upperLimit: 100
    },
    relationships: {
      dependencies: ['ENVIRONMENT_QUESTION_4_OPTION_1']
    },
  },
  ENVIRONMENT_QUESTION_3: {
    data: {
      name: 'How many incidents of non-compliance associated with air quality permits, standards, and regulations have occurred?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 8,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_3_OPTION_1',
        'ENVIRONMENT_QUESTION_3_OPTION_2'
      ]
    },
  },
  ENVIRONMENT_QUESTION_4: {
    data: {
      name: 'What percent of your buildings have LEED or other green building certifications? ',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 9,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_4_OPTION_1',
        'ENVIRONMENT_QUESTION_4_OPTION_2',
        'ENVIRONMENT_QUESTION_4_OPTION_3',
        'ENVIRONMENT_QUESTION_4_OPTION_4',
        'ENVIRONMENT_QUESTION_4_OPTION_5',
        'ENVIRONMENT_QUESTION_4_OPTION_6'
      ],
    }
  },
  ENVIRONMENT_QUESTION_5: {
    data: {
      name: 'What percentage of space is occupied in your building? [in sq. meters/person in the office]',
      description: '',
      questionType: QuestionType.NUMBER,
      sortOrder: 10,
      upperLimit: 100,
      lowerLimit: 0
    },
  },
  ENVIRONMENT_QUESTION_6: {
    data: {
      name: 'Have your building operations (energy use, water use, etc.) changed due to a shift in remote workers? How?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 11,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_6_OPTION_1',
        'ENVIRONMENT_QUESTION_6_OPTION_2'
      ]
    },
  },
  ENVIRONMENT_QUESTION_7: {
    data: {
      name: 'Do you invest in carbon offsets?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 12,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_7_OPTION_1',
        'ENVIRONMENT_QUESTION_7_OPTION_2'
      ]
    },
  },
  ENVIRONMENT_QUESTION_8: {
    data: {
      name: 'What percentage of your GHG emissions are offset by carbon offset investments?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 13,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_8_OPTION_1',
        'ENVIRONMENT_QUESTION_8_OPTION_2',
        'ENVIRONMENT_QUESTION_8_OPTION_3',
        'ENVIRONMENT_QUESTION_8_OPTION_4',
        'ENVIRONMENT_QUESTION_8_OPTION_5',
        'ENVIRONMENT_QUESTION_8_OPTION_6'
      ],
      dependencies: ['ENVIRONMENT_QUESTION_7_OPTION_1']
    },
  },
  ENVIRONMENT_QUESTION_9: {
    data: {
      name: 'Do you have company policies around carbon offset investments?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 14,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_9_OPTION_1',
        'ENVIRONMENT_QUESTION_9_OPTION_2'
      ]
    },
  },
  ENVIRONMENT_QUESTION_10: {
    data: {
      name: 'Do you have a carbon price for your carbon emissions?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 15,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_10_OPTION_1',
        'ENVIRONMENT_QUESTION_10_OPTION_2'
      ]
    },
  },
  ENVIRONMENT_QUESTION_11: {
    data: {
      name: 'Has your company analyzed climate-related opportunities with the potential to have a substantive financial or strategic impact on your business?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 16,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_11_OPTION_1',
        'ENVIRONMENT_QUESTION_11_OPTION_2'
      ]
    },
  },
  ENVIRONMENT_QUESTION_133: {
    data: {
      name: 'Select climate-related opportunities your company has analyzed',
      description: '',
      questionType: QuestionType.MULTI_SELECT,
      sortOrder: 17,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_133_OPTION_1',
        'ENVIRONMENT_QUESTION_133_OPTION_2',
        'ENVIRONMENT_QUESTION_133_OPTION_3',
        'ENVIRONMENT_QUESTION_133_OPTION_4'
      ]
    },
  },
  ENVIRONMENT_QUESTION_12: {
    data: {
      name: 'Does your organization describe targets used by the organization to manage climate-related risks and opportunities and performance against targets?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 18,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_12_OPTION_1',
        'ENVIRONMENT_QUESTION_12_OPTION_2'
      ]
    },
  },
  ENVIRONMENT_QUESTION_134: {
    data: {
      name: 'Select the targets used by the organization',
      description: '',
      questionType: QuestionType.MULTI_SELECT,
      sortOrder: 19,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_134_OPTION_1',
        'ENVIRONMENT_QUESTION_134_OPTION_2',
        'ENVIRONMENT_QUESTION_134_OPTION_3',
        'ENVIRONMENT_QUESTION_134_OPTION_4'
      ]
    },
  },
  ENVIRONMENT_QUESTION_13: {
    data: {
      name: 'Does your organization supports populations, communities or ecosystems that are vulnerable to climate change?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 20,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_13_OPTION_1',
        'ENVIRONMENT_QUESTION_13_OPTION_2'
      ]
    },
  },
  ENVIRONMENT_QUESTION_135: {
    data: {
      name: 'Select the ways in which your organization supports',
      description: '',
      questionType: QuestionType.MULTI_SELECT,
      sortOrder: 21,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_135_OPTION_1',
        'ENVIRONMENT_QUESTION_135_OPTION_2',
        'ENVIRONMENT_QUESTION_135_OPTION_3',
        'ENVIRONMENT_QUESTION_135_OPTION_4'
      ]
    },
  },
  ENVIRONMENT_QUESTION_14: {
    data: {
      name: 'Does your organization use climate-related scenario analysis to inform its business strategy?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 22,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_14_OPTION_1',
        'ENVIRONMENT_QUESTION_14_OPTION_2'
      ]
    },
  },
  ENVIRONMENT_QUESTION_136: {
    data: {
      name: 'Select the climate-related scenarios',
      description: '',
      questionType: QuestionType.MULTI_SELECT,
      sortOrder: 23,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_136_OPTION_1',
        'ENVIRONMENT_QUESTION_136_OPTION_2',
        'ENVIRONMENT_QUESTION_136_OPTION_3',
        'ENVIRONMENT_QUESTION_136_OPTION_4']
    },
  },
  ENVIRONMENT_QUESTION_15: {
    data: {
      name: 'Has your company established a 100% renewable energy or net-zero use target?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 24,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_15_OPTION_1', 'ENVIRONMENT_QUESTION_15_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_16: {
    data: {
      name: 'Do you power your own buildings with onsite energy [solar panels, etc.]?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 25,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_16_OPTION_1',
        'ENVIRONMENT_QUESTION_16_OPTION_2',
        'ENVIRONMENT_QUESTION_16_OPTION_3',
        'ENVIRONMENT_QUESTION_16_OPTION_4'
      ]
    },
  },
  ENVIRONMENT_QUESTION_17: {
    data: {
      name: 'What is your onsite energy source?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 26,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_17_OPTION_1', 'ENVIRONMENT_QUESTION_17_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_18: {
    data: {
      name: 'What percentage of your energy use is covered by onsite energy production?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 27,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_18_OPTION_1',
        'ENVIRONMENT_QUESTION_18_OPTION_2',
        'ENVIRONMENT_QUESTION_18_OPTION_3',
        'ENVIRONMENT_QUESTION_18_OPTION_4',
        'ENVIRONMENT_QUESTION_18_OPTION_5',
        'ENVIRONMENT_QUESTION_18_OPTION_6'
      ],
    },
  },
  ENVIRONMENT_QUESTION_19: {
    data: {
      name: 'How much energy did your company use in the past year? How much energy did your company use over the past 5 years annually? [in kWh/year]',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 28,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_19_OPTION_1',
        'ENVIRONMENT_QUESTION_19_OPTION_2',
        'ENVIRONMENT_QUESTION_19_OPTION_3',
        'ENVIRONMENT_QUESTION_19_OPTION_4',
        'ENVIRONMENT_QUESTION_19_OPTION_5',
        'ENVIRONMENT_QUESTION_19_OPTION_6'
      ],
    },
  },
  ENVIRONMENT_QUESTION_20: {
    data: {
      name: 'What is the energy intensity per unit of your company\'s output(baseline)?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 29,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_20_OPTION_1',
        'ENVIRONMENT_QUESTION_20_OPTION_2',
        'ENVIRONMENT_QUESTION_20_OPTION_3'
      ]
    },
  },
  ENVIRONMENT_QUESTION_21: {
    data: {
      name: 'What percent of your energy use is sourced from grid electricity?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 30,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_21_OPTION_1',
        'ENVIRONMENT_QUESTION_21_OPTION_2',
        'ENVIRONMENT_QUESTION_21_OPTION_3',
        'ENVIRONMENT_QUESTION_21_OPTION_4',
        'ENVIRONMENT_QUESTION_21_OPTION_5',
        'ENVIRONMENT_QUESTION_21_OPTION_6'
      ],
    },
  },
  ENVIRONMENT_QUESTION_22: {
    data: {
      name: 'Does your company measure or calculate scope 1 and 2 emissions?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 31,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_22_OPTION_1', 'ENVIRONMENT_QUESTION_22_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_23: {
    data: {
      name: 'Has your company set a separate or combined scope 1 and scope 2 emissions reduction target?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 32,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_23_OPTION_1', 'ENVIRONMENT_QUESTION_23_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_24: {
    data: {
      name: 'Does your company recieve third-party verification for its scope 1 and 2 emissions?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 33,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_24_OPTION_1', 'ENVIRONMENT_QUESTION_24_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_25: {
    data: {
      name: 'Has your company set scope 1 emission reduction targets?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 34,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_25_OPTION_1', 'ENVIRONMENT_QUESTION_25_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_142: {
    data: {
      name: 'What are your company\'s scope 1 emission reduction targets(how much by when) ',
      description: '',
      questionType: QuestionType.TEXT,
      sortOrder: 35,
    },
    relationships: {
      dependencies: ['ENVIRONMENT_QUESTION_25_OPTION_1']
    },
  },
  ENVIRONMENT_QUESTION_26: {
    data: {
      name: 'Has your company set scope 2 emission reduction targets?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 36,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_26_OPTION_1', 'ENVIRONMENT_QUESTION_26_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_143: {
    data: {
      name: 'What are your company\'s scope 2 emission reduction targets(how much by when) ',
      description: '',
      questionType: QuestionType.TEXT,
      sortOrder: 37,
    },
    relationships: {
      dependencies: ['ENVIRONMENT_QUESTION_26_OPTION_1']
    },
  },
  ENVIRONMENT_QUESTION_27: {
    data: {
      name: 'Has your company set scope 3 emission reduction targets??',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 38,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_27_OPTION_1', 'ENVIRONMENT_QUESTION_27_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_144: {
    data: {
      name: 'What are your company\'s scope 3 emission reduction targets(how much by when) ',
      description: '',
      questionType: QuestionType.TEXT,
      sortOrder: 39,
    },
    relationships: {
      dependencies: ['ENVIRONMENT_QUESTION_27_OPTION_1']
    },
  },
  ENVIRONMENT_QUESTION_28: {
    data: {
      name: 'Has your company met scope 1 emissions target for the past year?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 40,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_28_OPTION_1', 'ENVIRONMENT_QUESTION_28_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_145: {
    data: {
      name: 'What are your company\'s scope 1 emissions for the past year?',
      description: '',
      questionType: QuestionType.TEXT,
      sortOrder: 41,
    },
    relationships: {
      dependencies: ['ENVIRONMENT_QUESTION_28_OPTION_1']
    },
  },
  ENVIRONMENT_QUESTION_29: {
    data: {
      name: 'Has your company met scope 2 emissions target for the past year?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 42,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_29_OPTION_1', 'ENVIRONMENT_QUESTION_29_OPTION_2']
    },
  },

  ENVIRONMENT_QUESTION_146: {
    data: {
      name: 'What are your company\'s scope 2 emissions for the past year',
      description: '',
      questionType: QuestionType.TEXT,
      sortOrder: 43,
    },
    relationships: {
      dependencies: ['ENVIRONMENT_QUESTION_29_OPTION_1']
    },
  },
  ENVIRONMENT_QUESTION_30: {
    data: {
      name: 'Has your company set a scope 3 reduction target?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 44,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_30_OPTION_1', 'ENVIRONMENT_QUESTION_30_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_31: {
    data: {
      name: 'Does your company measure or calculate scope 3 emissions?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 45,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_31_OPTION_1', 'ENVIRONMENT_QUESTION_31_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_32: {
    data: {
      name: 'Does your company recieve third-party verification for its scope 3 emissions?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 46,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_32_OPTION_1', 'ENVIRONMENT_QUESTION_32_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_33: {
    data: {
      name: 'Does your organization disclose Scope 1, Scope 2, and if appropriate Scope 3 greenhouse gas emissions and the related risks?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 47,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_33_OPTION_1', 'ENVIRONMENT_QUESTION_33_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_34: {
    data: {
      name: 'How much hazardous waste do you produce?',
      description: '',
      questionType: QuestionType.TEXT,
      sortOrder: 48,
    },
  },
  ENVIRONMENT_QUESTION_35: {
    data: {
      name: 'What percent of hazardous waste produced is recycled?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 49,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_35_OPTION_1',
        'ENVIRONMENT_QUESTION_35_OPTION_2',
        'ENVIRONMENT_QUESTION_35_OPTION_3',
        'ENVIRONMENT_QUESTION_35_OPTION_4',
        'ENVIRONMENT_QUESTION_35_OPTION_5',
        'ENVIRONMENT_QUESTION_35_OPTION_6'
      ],
    },
  },
  ENVIRONMENT_QUESTION_36: {
    data: {
      name: 'Do you own land?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 50,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_36_OPTION_1', 'ENVIRONMENT_QUESTION_36_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_37: {
    data: {
      name: 'Do you have a land management plan?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 51,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_37_OPTION_1', 'ENVIRONMENT_QUESTION_37_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_38: {
    data: {
      name: 'Does your company require mining raw materials for its product or operations?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 52,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_38_OPTION_1', 'ENVIRONMENT_QUESTION_38_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_39: {
    data: {
      name: 'Has your raw material sourcing been verified by Standard for Responsible Mining?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 53,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_39_OPTION_1', 'ENVIRONMENT_QUESTION_39_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_40: {
    data: {
      name: 'What percent of raw materials sourcing has been third-party certified to an environmental and/or social sustianability standard?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 54,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_40_OPTION_1',
        'ENVIRONMENT_QUESTION_40_OPTION_2',
        'ENVIRONMENT_QUESTION_40_OPTION_3',
        'ENVIRONMENT_QUESTION_40_OPTION_4',
        'ENVIRONMENT_QUESTION_40_OPTION_5',
        'ENVIRONMENT_QUESTION_40_OPTION_6'
      ],
    },
  },
  ENVIRONMENT_QUESTION_41: {
    data: {
      name: 'Does your company assess the climate impacts of major suppliers and engage them on climate-related issues?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 55,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_41_OPTION_1', 'ENVIRONMENT_QUESTION_41_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_42: {
    data: {
      name: 'Do you engage with your value chain on water-related issues?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 56,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_42_OPTION_1', 'ENVIRONMENT_QUESTION_42_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_43: {
    data: {
      name: 'What proportion of suppliers do you request to report on their water use, risks and/or management information and what proportion of your procurement spend does this represent?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 57,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_43_OPTION_1',
        'ENVIRONMENT_QUESTION_43_OPTION_2',
        'ENVIRONMENT_QUESTION_43_OPTION_3',
        'ENVIRONMENT_QUESTION_43_OPTION_4'
      ]
    },
  },
  ENVIRONMENT_QUESTION_44: {
    data: {
      name: 'Do you employees have alternative transportation options to on-site workplaces?',
      description: '',
      questionType: QuestionType.MULTI_SELECT,
      sortOrder: 58,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_44_OPTION_1',
        'ENVIRONMENT_QUESTION_44_OPTION_2',
        'ENVIRONMENT_QUESTION_44_OPTION_3',
        'ENVIRONMENT_QUESTION_44_OPTION_4',
        'ENVIRONMENT_QUESTION_44_OPTION_5'
      ]
    },
  },
  ENVIRONMENT_QUESTION_45: {
    data: {
      name: 'Choose the transportation you provide to and from work',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 59,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_45_OPTION_1', 'ENVIRONMENT_QUESTION_45_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_46: {
    data: {
      name: 'Do you incentivize carpooling, bussing, or biking as means to get to and from work?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 60,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_46_OPTION_1', 'ENVIRONMENT_QUESTION_46_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_47: {
    data: {
      name: 'What percent of your employees work remotely?',
      description: '',
      questionType: QuestionType.NUMBER,
      sortOrder: 61,
      upperLimit: 100,
      lowerLimit: 0
    },
  },
  ENVIRONMENT_QUESTION_48: {
    data: {
      name: 'Do you have waste management or recycling policies in place?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 62,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_48_OPTION_1', 'ENVIRONMENT_QUESTION_48_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_49: {
    data: {
      name: 'What types of waste do you produce?',
      description: '',
      questionType: QuestionType.MULTI_SELECT,
      sortOrder: 63,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_49_OPTION_1',
        'ENVIRONMENT_QUESTION_49_OPTION_2',
        'ENVIRONMENT_QUESTION_49_OPTION_3',
        'ENVIRONMENT_QUESTION_49_OPTION_4',
        'ENVIRONMENT_QUESTION_49_OPTION_5',
        'ENVIRONMENT_QUESTION_49_OPTION_6',
        'ENVIRONMENT_QUESTION_49_OPTION_7',
        'ENVIRONMENT_QUESTION_49_OPTION_8',
      ]
    },
  },
  ENVIRONMENT_QUESTION_50: {
    data: {
      name: 'Do you measure percentage of waste that is recycled or reused?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 64,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_50_OPTION_1', 'ENVIRONMENT_QUESTION_50_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_51: {
    data: {
      name: 'What percentage of your waste is recycled or reused?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 65,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_51_OPTION_1',
        'ENVIRONMENT_QUESTION_51_OPTION_2',
        'ENVIRONMENT_QUESTION_51_OPTION_3',
        'ENVIRONMENT_QUESTION_51_OPTION_4',
        'ENVIRONMENT_QUESTION_51_OPTION_5',
        'ENVIRONMENT_QUESTION_51_OPTION_6'
      ],
      dependencies: ['ENVIRONMENT_QUESTION_50_OPTION_1']
    },
  },
  ENVIRONMENT_QUESTION_52: {
    data: {
      name: 'Do you measure how much waste you produce?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 66,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_52_OPTION_1', 'ENVIRONMENT_QUESTION_52_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_53: {
    data: {
      name: 'How much waste [in metric tons/year] do you produce annually?',
      description: '',
      questionType: QuestionType.TEXT,
      sortOrder: 67,
    },
  },
  ENVIRONMENT_QUESTION_54: {
    data: {
      name: 'Do you share your waste recycling ratio?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 68,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_54_OPTION_1', 'ENVIRONMENT_QUESTION_54_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_55: {
    data: {
      name: 'Do you have oil spill disclosures?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 69,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_55_OPTION_1', 'ENVIRONMENT_QUESTION_55_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_56: {
    data: {
      name: 'Has your company set a water use reduction target?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 70,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_56_OPTION_1', 'ENVIRONMENT_QUESTION_56_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_57: {
    data: {
      name: 'Which water footprints do you track for your organization?',
      description: '',
      questionType: QuestionType.MULTI_SELECT,
      sortOrder: 71,
    },
    relationships: {
      options: [
        'ENVIRONMENT_QUESTION_57_OPTION_1',
        'ENVIRONMENT_QUESTION_57_OPTION_2',
        'ENVIRONMENT_QUESTION_57_OPTION_3',
        'ENVIRONMENT_QUESTION_57_OPTION_4',
        'ENVIRONMENT_QUESTION_57_OPTION_5'
      ]
    },
  },
  ENVIRONMENT_QUESTION_58: {
    data: {
      name: 'What proportion of your total water use do you recycle or reuse? Is this information disclosed?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 72,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_58_OPTION_1', 'ENVIRONMENT_QUESTION_58_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_59: {
    data: {
      name: 'What is your company\'s total water use?(Water intensity) ',
      description: '',
      questionType: QuestionType.TEXT,
      sortOrder: 73,
    },
  },
  ENVIRONMENT_QUESTION_60: {
    data: {
      name: 'What are the total volumes of water withdrawn, discharged, and consumed across all your operations?',
      description: '',
      questionType: QuestionType.TEXT,
      sortOrder: 74,
    },
  },
  ENVIRONMENT_QUESTION_61: {
    data: {
      name: 'How do these volumes for the most recent reported year compare to the previous reporting year?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 75,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_61_OPTION_1', 'ENVIRONMENT_QUESTION_61_OPTION_2', 'ENVIRONMENT_QUESTION_61_OPTION_3', 'ENVIRONMENT_QUESTION_61_OPTION_4']
    },
  },
  ENVIRONMENT_QUESTION_62: {
    data: {
      name: 'Provide the proportion of your total withdrawals sourced from water stressed areas (% of water withdrawal and consumption with High or Extremely High Baseline Water Stress based on WRI)',
      description: '',
      questionType: QuestionType.NUMBER,
      sortOrder: 76,
      upperLimit: 100,
      lowerLimit: 0
    },
  },
  ENVIRONMENT_QUESTION_63: {
    data: {
      name: 'Does your organization undertake a water-related risk assessment?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 77,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_63_OPTION_1', 'ENVIRONMENT_QUESTION_63_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_64: {
    data: {
      name: 'For each facility referenced provide coordinates, total water accounting data and comparisons with the previous reporting year.',
      description: '',
      questionType: QuestionType.TEXT,
      sortOrder: 78,
    },
  },
  ENVIRONMENT_QUESTION_65: {
    data: {
      name: 'Does your company use an internal price on water?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 79,
    },
    relationships: {
      options: ['ENVIRONMENT_QUESTION_65_OPTION_1', 'ENVIRONMENT_QUESTION_65_OPTION_2']
    },
  },
  ENVIRONMENT_QUESTION_66: {
    data: {
      name: 'What is the annual change in land cover type for your company?',
      description: '',
      questionType: QuestionType.NUMBER,
      sortOrder: 80,
      upperLimit: 100,
      lowerLimit: 0
    },
  },
  SOCIAL_QUESTION_67: {
    data: {
      name: 'Do you invest in the communities local to your organization?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 81,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_67_OPTION_1', 'SOCIAL_QUESTION_67_OPTION_2', 'SOCIAL_QUESTION_67_OPTION_3']
    },
  },
  SOCIAL_QUESTION_68: {
    data: {
      name: 'Do you have a plan to regularly engage all stakeholders?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 82,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_68_OPTION_1', 'SOCIAL_QUESTION_68_OPTION_2']
    },
  },
  SOCIAL_QUESTION_69: {
    data: {
      name: 'Do you have town hall meetings to engage and communicate with employees?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 83,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_69_OPTION_1', 'SOCIAL_QUESTION_69_OPTION_2', 'SOCIAL_QUESTION_69_OPTION_3']
    },
  },
  SOCIAL_QUESTION_70: {
    data: {
      name: 'Do you have stakeholder meetings to engage community stakeholders?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 84,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_70_OPTION_1', 'SOCIAL_QUESTION_70_OPTION_2', 'SOCIAL_QUESTION_70_OPTION_3']
    },
  },
  SOCIAL_QUESTION_71: {
    data: {
      name: 'Discuss your investments to local communities.',
      description: '',
      questionType: QuestionType.TEXT,
      sortOrder: 85,
    },
  },
  SOCIAL_QUESTION_72: {
    data: {
      name: 'Discuss your plan to regularly engage all stakeholders.',
      description: '',
      questionType: QuestionType.TEXT,
      sortOrder: 86,
    },
  },
  SOCIAL_QUESTION_73: {
    data: {
      name: 'Discuss your engagement with employees.',
      description: '',
      questionType: QuestionType.TEXT,
      sortOrder: 87,
    },
  },
  SOCIAL_QUESTION_74: {
    data: {
      name: 'Discuss your engagement with community stakeholders.',
      description: '',
      questionType: QuestionType.TEXT,
      sortOrder: 88,
    },
  },
  SOCIAL_QUESTION_75: {
    data: {
      name: 'Do you have a company-wide diversity, equity and inclusion (DEI) initiative?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 89,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_75_OPTION_1', 'SOCIAL_QUESTION_75_OPTION_2']
    },
  },
  SOCIAL_QUESTION_76: {
    data: {
      name: 'What percentage of your board, executives, and managers are non-white?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 90,
    },
    relationships: {
      options: [
        'SOCIAL_QUESTION_76_OPTION_1',
        'SOCIAL_QUESTION_76_OPTION_2',
        'SOCIAL_QUESTION_76_OPTION_3',
        'SOCIAL_QUESTION_76_OPTION_4',
        'SOCIAL_QUESTION_76_OPTION_5'
      ]
    },
  },
  SOCIAL_QUESTION_77: {
    data: {
      name: 'What percentage of your board, executives, and managers are women or non-binary?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 91,
    },
    relationships: {
      options: [
        'SOCIAL_QUESTION_77_OPTION_1',
        'SOCIAL_QUESTION_77_OPTION_2',
        'SOCIAL_QUESTION_77_OPTION_3',
        'SOCIAL_QUESTION_77_OPTION_4',
        'SOCIAL_QUESTION_77_OPTION_5'
      ]
    },
  },
  SOCIAL_QUESTION_78: {
    data: {
      name: 'Do you have an executive diversity policy?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 92,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_78_OPTION_1', 'SOCIAL_QUESTION_78_OPTION_2']
    },
  },
  SOCIAL_QUESTION_79: {
    data: {
      name: 'Do you have a manager diversity policy?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 93,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_79_OPTION_1', 'SOCIAL_QUESTION_79_OPTION_2']
    },
  },
  SOCIAL_QUESTION_80: {
    data: {
      name: 'Do you have a hiring diversity policy?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 94,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_80_OPTION_1', 'SOCIAL_QUESTION_80_OPTION_2']
    },
  },
  SOCIAL_QUESTION_81: {
    data: {
      name: 'Do you have a board diversity policy?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 95,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_81_OPTION_1', 'SOCIAL_QUESTION_81_OPTION_2']
    },
  },
  SOCIAL_QUESTION_82: {
    data: {
      name: 'Is the retention rate for non-white employees is less than retention rate for white employees',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 96,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_82_OPTION_1', 'SOCIAL_QUESTION_82_OPTION_2']
    },
  },
  SOCIAL_QUESTION_83: {
    data: {
      name: 'Is the retention rate for women or non-binary employees is less than retention rate for men',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 97,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_83_OPTION_1', 'SOCIAL_QUESTION_83_OPTION_2']
    },
  },
  SOCIAL_QUESTION_84: {
    data: {
      name: 'Does your board work with human resources to develop DEI metrics to report to the board?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 98,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_84_OPTION_1', 'SOCIAL_QUESTION_84_OPTION_2']
    },
  },
  SOCIAL_QUESTION_85: {
    data: {
      name: 'Does the company have goals related to labor rights and workplace fairness?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 99,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_85_OPTION_1', 'SOCIAL_QUESTION_85_OPTION_2']
    },
  },
  SOCIAL_QUESTION_86: {
    data: {
      name: 'Is any of your employment outside of its headquartered country?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 100,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_86_OPTION_1', 'SOCIAL_QUESTION_86_OPTION_2']
    },
  },
  SOCIAL_QUESTION_87: {
    data: {
      name: 'Does the company apply goals related to labor rights and workplace fairness to foreign employees?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 101,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_87_OPTION_1', 'SOCIAL_QUESTION_87_OPTION_2']
    },
  },
  SOCIAL_QUESTION_88: {
    data: {
      name: 'What percent of active workforce are covered under collective bargaining agreements?',
      description: '',
      questionType: QuestionType.NUMBER,
      sortOrder: 102,
      upperLimit: 100,
      lowerLimit: 0
    },
  },
  SOCIAL_QUESTION_89: {
    data: {
      name: 'Do you require safety training for all employees?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 103,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_89_OPTION_1', 'SOCIAL_QUESTION_89_OPTION_2']
    },
  },
  SOCIAL_QUESTION_90: {
    data: {
      name: 'What is the total number of recalls issued in the past 5 years?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 104,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_90_OPTION_1', 'SOCIAL_QUESTION_90_OPTION_2']
    },
  },
  SOCIAL_QUESTION_91: {
    data: {
      name: 'What is the total recordable incident rate among workers?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 105,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_91_OPTION_1', 'SOCIAL_QUESTION_91_OPTION_2', 'SOCIAL_QUESTION_91_OPTION_3']
    },
  },
  SOCIAL_QUESTION_92: {
    data: {
      name: 'What is the fatality rate among workers?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 106,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_92_OPTION_1', 'SOCIAL_QUESTION_92_OPTION_2', 'SOCIAL_QUESTION_92_OPTION_3']
    },
  },
  SOCIAL_QUESTION_93: {
    data: {
      name: 'Do you have a supplier diversity policy?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 107,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_93_OPTION_1', 'SOCIAL_QUESTION_93_OPTION_2']
    },
  },
  SOCIAL_QUESTION_94: {
    data: {
      name: 'What percentage of your supply chain is from diverse suppliers?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 108,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_94_OPTION_1', 'SOCIAL_QUESTION_94_OPTION_2', 'SOCIAL_QUESTION_94_OPTION_3']
    },
  },
  SOCIAL_QUESTION_95: {
    data: {
      name: 'What percentage of your supply chain is local [within the same country as your company\'s headquarters]?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 109,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_95_OPTION_1', 'SOCIAL_QUESTION_95_OPTION_2', 'SOCIAL_QUESTION_95_OPTION_3', 'SOCIAL_QUESTION_95_OPTION_4', 'SOCIAL_QUESTION_95_OPTION_5', 'SOCIAL_QUESTION_95_OPTION_6']
    },
  },
  SOCIAL_QUESTION_96: {
    data: {
      name: 'Do you suppliers have a stakeholder engagement process?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 110,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_96_OPTION_1', 'SOCIAL_QUESTION_96_OPTION_2']
    },
  },
  SOCIAL_QUESTION_97: {
    data: {
      name: 'Does your board/organization have corporate strategy that identifies and capitalizes on innovative ESG-enabled revenue streams and expense savings?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 111,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_97_OPTION_1', 'SOCIAL_QUESTION_97_OPTION_2']
    },
  },
  SOCIAL_QUESTION_98: {
    data: {
      name: 'Does your company track where air pollution is emitted, and who is impacted by it (demographics of people impacted)?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 112,
    },
    relationships: {
      options: ['SOCIAL_QUESTION_98_OPTION_1', 'SOCIAL_QUESTION_98_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_99: {
    data: {
      name: 'Does your board have a system for ESG oversight (i.e. standing commeees, auditing etc)?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 113,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_99_OPTION_1', 'GOVERNANCE_QUESTION_99_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_100: {
    data: {
      name: 'Are environmental and social issues integrated into any aspects of your long-term strategic business plan and corporate strategy?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 114,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_100_OPTION_1', 'GOVERNANCE_QUESTION_100_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_101: {
    data: {
      name: 'Does the Board/management incorporate ESG in the organization’s purpose, mission, vision, values and Corporate Code of Conduct?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 115,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_101_OPTION_1', 'GOVERNANCE_QUESTION_101_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_102: {
    data: {
      name: 'Are ESG issues part of every company board agenda?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 116,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_102_OPTION_1', 'GOVERNANCE_QUESTION_102_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_103: {
    data: {
      name: 'How ofted do directors get updates from management on ESG related topics?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 117,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_103_OPTION_1', 'GOVERNANCE_QUESTION_103_OPTION_2', 'GOVERNANCE_QUESTION_103_OPTION_3', 'GOVERNANCE_QUESTION_103_OPTION_4']
    },
  },
  GOVERNANCE_QUESTION_104: {
    data: {
      name: 'How often does the board review their ESG priorities or goals?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 118,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_104_OPTION_1', 'GOVERNANCE_QUESTION_104_OPTION_2', 'GOVERNANCE_QUESTION_104_OPTION_3', 'GOVERNANCE_QUESTION_104_OPTION_4']
    },
  },
  GOVERNANCE_QUESTION_105: {
    data: {
      name: 'Does the board have an agreed upon definition of ESG?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 119,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_105_OPTION_1', 'GOVERNANCE_QUESTION_105_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_106: {
    data: {
      name: 'What time periods should be presented in their ESG disclosures? For example will the company on present current year data or present a one or two-year comparative',
      description: '',
      questionType: QuestionType.TEXT,
      sortOrder: 120,
    },
  },
  GOVERNANCE_QUESTION_107: {
    data: {
      name: 'Does your board conduct regular employee surveys of corporate culture?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 121,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_107_OPTION_1', 'GOVERNANCE_QUESTION_107_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_108: {
    data: {
      name: 'How often does your board review and discuss the results of employee surveys?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 122,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_108_OPTION_1', 'GOVERNANCE_QUESTION_108_OPTION_2', 'GOVERNANCE_QUESTION_108_OPTION_3']
    },
  },
  GOVERNANCE_QUESTION_109: {
    data: {
      name: 'Are corporate culture goals included into annual or long-term incentives for the board?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 123,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_109_OPTION_1', 'GOVERNANCE_QUESTION_109_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_110: {
    data: {
      name: 'Does your company have an internal audit to develop culture metrics to report to the board?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 124,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_110_OPTION_1', 'GOVERNANCE_QUESTION_110_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_111: {
    data: {
      name: 'Does your company engage a third party/advisory board to evaluate corporate culture?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 125,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_111_OPTION_1', 'GOVERNANCE_QUESTION_111_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_112: {
    data: {
      name: 'Is there a senior executives\' Code of Ethics?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 126,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_112_OPTION_1', 'GOVERNANCE_QUESTION_112_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_113: {
    data: {
      name: 'Provide the highest management-level position(s) or committee(s) with responsibility for ESG',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 127,
    },
    relationships: {
      options: [
        'GOVERNANCE_QUESTION_113_OPTION_1',
        'GOVERNANCE_QUESTION_113_OPTION_2',
        'GOVERNANCE_QUESTION_113_OPTION_3',
        'GOVERNANCE_QUESTION_113_OPTION_4'
      ]
    },
  },
  GOVERNANCE_QUESTION_114: {
    data: {
      name: 'Does the CEO position description and annual performance plan incorporate ESG? Is Compensation for the CEO and management linked to performance on short and long-term ESG goals?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 128,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_114_OPTION_1', 'GOVERNANCE_QUESTION_114_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_115: {
    data: {
      name: 'Does your board/organization have corporate strategy that identifies and capitalizes on innovative ESG-enabled revenue streams and expense savings?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 129,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_115_OPTION_1', 'GOVERNANCE_QUESTION_115_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_116: {
    data: {
      name: 'Do you engage in activities that could either directly or indirectly influence public policy on environmental or social issues that follow your ESG goals?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 130,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_116_OPTION_1', 'GOVERNANCE_QUESTION_116_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_117: {
    data: {
      name: 'Does your board review the environmental impacts of the company\'s products and services?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 131,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_117_OPTION_1', 'GOVERNANCE_QUESTION_117_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_118: {
    data: {
      name: 'Does your board evaluate the comany relative to benchmark data for industry/size/geography?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 132,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_118_OPTION_1', 'GOVERNANCE_QUESTION_118_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_119: {
    data: {
      name: 'Does the company\'s existing risk process include identification of any ESG risks?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 133,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_119_OPTION_1', 'GOVERNANCE_QUESTION_119_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_120: {
    data: {
      name: 'Does the Enterprise Risk Management process include assessment mitigation plans for all ESG-related risks that have been identified?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 134,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_120_OPTION_1', 'GOVERNANCE_QUESTION_120_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_121: {
    data: {
      name: 'How does managment prioritize ESG risks and opportunities?',
      description: '',
      questionType: QuestionType.TEXT,
      sortOrder: 135,
    },
  },
  GOVERNANCE_QUESTION_122: {
    data: {
      name: 'Are these ESG risks and opportunities inlcuded in capital allocation decisions?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 136,
    },
    relationships: {
      options: [
        'GOVERNANCE_QUESTION_122_OPTION_1',
        'GOVERNANCE_QUESTION_122_OPTION_2'
      ]
    },
  },
  GOVERNANCE_QUESTION_123: {
    data: {
      name: 'Has the company considered its legal liability when including ESG information in SEC filings?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 137,
    },
    relationships: {
      options: [
        'GOVERNANCE_QUESTION_123_OPTION_1',
        'GOVERNANCE_QUESTION_123_OPTION_2'
      ]
    },
  },
  GOVERNANCE_QUESTION_124: {
    data: {
      name: 'How often is there board-level training and enrichment on ESG related topics?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 138,
    },
    relationships: {
      options: [
        'GOVERNANCE_QUESTION_124_OPTION_1',
        'GOVERNANCE_QUESTION_124_OPTION_2',
        'GOVERNANCE_QUESTION_124_OPTION_3'
      ]
    },
  },
  GOVERNANCE_QUESTION_125: {
    data: {
      name: 'What environmental data do you publicly disclose?',
      description: '',
      questionType: QuestionType.MULTI_SELECT,
      sortOrder: 139,
    },
    relationships: {
      options: [
        'GOVERNANCE_QUESTION_125_OPTION_1',
        'GOVERNANCE_QUESTION_125_OPTION_2',
        'GOVERNANCE_QUESTION_125_OPTION_3',
        'GOVERNANCE_QUESTION_125_OPTION_4',
        'GOVERNANCE_QUESTION_125_OPTION_5',
        'GOVERNANCE_QUESTION_125_OPTION_6',
        'GOVERNANCE_QUESTION_125_OPTION_7',
        'GOVERNANCE_QUESTION_125_OPTION_8',
        'GOVERNANCE_QUESTION_125_OPTION_9'
      ],
    },
  },
  GOVERNANCE_QUESTION_126: {
    data: {
      name: 'What proportion of environmental data has been externally verified?',
      description: '',
      questionType: QuestionType.MULTI_SELECT,
      sortOrder: 140,
    },
    relationships: {
      options: [
        'GOVERNANCE_QUESTION_126_OPTION_1',
        'GOVERNANCE_QUESTION_126_OPTION_2',
        'GOVERNANCE_QUESTION_126_OPTION_3',
        'GOVERNANCE_QUESTION_126_OPTION_4',
        'GOVERNANCE_QUESTION_126_OPTION_5',
        'GOVERNANCE_QUESTION_126_OPTION_6',
        'GOVERNANCE_QUESTION_126_OPTION_7',
        'GOVERNANCE_QUESTION_126_OPTION_8',
        'GOVERNANCE_QUESTION_126_OPTION_9'
      ],
    },
  },
  GOVERNANCE_QUESTION_127: {
    data: {
      name: 'What social data do you publicly disclose?',
      description: '',
      questionType: QuestionType.MULTI_SELECT,
      sortOrder: 141,
    },
    relationships: {
      options: [
        'GOVERNANCE_QUESTION_127_OPTION_1',
        'GOVERNANCE_QUESTION_127_OPTION_2',
        'GOVERNANCE_QUESTION_127_OPTION_3',
        'GOVERNANCE_QUESTION_127_OPTION_4',
        'GOVERNANCE_QUESTION_127_OPTION_5',
      ],
    },
  },
  GOVERNANCE_QUESTION_128: {
    data: {
      name: 'What proportion of social data has been externally verified?',
      description: '',
      questionType: QuestionType.MULTI_SELECT,
      sortOrder: 142,
    },
    relationships: {
      options: [
        'GOVERNANCE_QUESTION_128_OPTION_1',
        'GOVERNANCE_QUESTION_128_OPTION_2',
        'GOVERNANCE_QUESTION_128_OPTION_3',
        'GOVERNANCE_QUESTION_128_OPTION_4',
        'GOVERNANCE_QUESTION_128_OPTION_5',
      ],
    }
  },
  GOVERNANCE_QUESTION_129: {
    data: {
      name: 'Did your organization include information about its response to environmental and social priorities in its most recent mainstream annual report?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 143,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_129_OPTION_1', 'GOVERNANCE_QUESTION_129_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_130: {
    data: {
      name: 'Does your board require the company to report on sustainability accounting stands board (SASB) metrics for industry and/or follow the recommendations from the Task force on Cliamte-related financial disclosures?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 144,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_130_OPTION_1', 'GOVERNANCE_QUESTION_130_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_131: {
    data: {
      name: 'Is a company transparency tracking their performance against milestone goals, as well as long-term goals, so stakeholders and others can monitor progress?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 145,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_131_OPTION_1', 'GOVERNANCE_QUESTION_131_OPTION_2']
    },
  },
  GOVERNANCE_QUESTION_132: {
    data: {
      name: 'Is the messaging being incorporated in operational discussions, such as quarterly analyst calls?',
      description: '',
      questionType: QuestionType.RADIO,
      sortOrder: 146,
    },
    relationships: {
      options: ['GOVERNANCE_QUESTION_132_OPTION_1', 'GOVERNANCE_QUESTION_132_OPTION_2']
    },
  }
};
