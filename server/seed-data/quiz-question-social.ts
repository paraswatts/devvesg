import { QuestionType, ScoreType } from '../enums';
import { SeedData } from './interface';
import { SeedQuizQuestion } from './quiz-question';

export const QUIZ_QUESTIONS_SOCIAL: SeedData<SeedQuizQuestion> = {
  DEI_INTIATIVE: {
    data: {
      name: 'Do you have a company-wide diversity, equity and inclusion (DEI) initiative? ',
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 27,
    },
    relationships: {
      options: [
        'DEI_INTIATIVE_YES',
        'DEI_INTIATIVE_NO'
      ]
    },
  },
  BOARD_DIVERSITY_POLICY: {
    data: {
      name: 'Do you have a board diversity policy? ',
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 28,
    },
    relationships: {
      options: [
        'BOARD_DIVERSITY_POLICY_YES',
        'BOARD_DIVERSITY_POLICY_NO'
      ]
    },
  },
  NON_WHITE: {
    data: {
      name: 'What percentage of your board, executives, and managers are non-white? ',
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 29,
    },
    relationships: {
      options: [
        'NON_WHITE_LESS_THAN_TEN',
        'NON_WHITE_TEN_TWENTY',
        'NON_WHITE_TWENTY_THIRTY',
        'NON_WHITE_THIRTY_FOURTY',
        'NON_WHITE_GREATER_FOURTY',
        'NON_WHITE_DONT_KNOW'
      ]
    },
  },
  WOMEN_MANAGERS: {
    data: {
      name: 'What percentage of your board, executives, and managers are women or non-binary? ',
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 30,
    },
    relationships: {
      options: [
        'WOMEN_MANAGERS_LESS_THAN_TEN',
        'WOMEN_MANAGERS_TEN_TWENTY_FIVE',
        'WOMEN_MANAGERS_TWENTY_FIVE_FOURTY',
        'WOMEN_MANAGERS_FOURTY_FIFTY',
        'WOMEN_MANAGERS_GREATER_FIFTY',
        'WOMEN_MANAGERS_DONT_KNOW'
      ]
    },
  },
  SUPPLIER_DIVERSITY_POLICY: {
    data: {
      name: 'Do you have a supplier diversity policy? ',
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 31,
    },
    relationships: {
      options: [
        'SUPPLIER_DIVERSITY_POLICY_YES',
        'SUPPLIER_DIVERSITY_POLICY_NO',
      ]
    },
  },
  PERCENTAGE_SUPPLIER_DIVERSITY: {
    data: {
      name: 'What percentage of your supply chain is from diverse suppliers? ',
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 32,
    },
    relationships: {
      options: [
        'PERCENTAGE_SUPPLIER_DIVERSITY_LESS_THAN_TWENTY',
        'PERCENTAGE_SUPPLIER_DIVERSITY_TWENTY_FOURTY',
        'PERCENTAGE_SUPPLIER_DIVERSITY_GREATER_FOURTY',
      ]
    },
  },
  LOCAL_SUPPLY_CHAIN: {
    data: {
      name: "What percentage of your supply chain is local [within the same country as your company's headquarters]?",
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 33,
      lowerLimit: 10,
      upperLimit: 80,
    },
    relationships: {
      options: ['LOCAL_SUPPLY_CHAIN_TEN', 'LOCAL_SUPPLY_CHAIN_TEN_THIRTY', 'LOCAL_SUPPLY_CHAIN_THIRTY_FIFTY', 'LOCAL_SUPPLY_CHAIN_FIFTY_SEVENTY', 'LOCAL_SUPPLY_CHAIN_SEVENTY_NINETY', 'LOCAL_SUPPLY_CHAIN_HUNDRED'],
    }
  },
  SAFETY: {
    data: {
      name: "Do you require safety training for all employees? ",
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 34,
    },
    relationships: {
      options: [
        'SAFETY_YES',
        'SAFETY_NO'
      ]
    },
  },
  INVEST_IN_COMMUNITY_ORGANISATION: {
    data: {
      name: "Do you invest in the communities local to your organization?",
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 35,
    },
    relationships: {
      options: [
        'INVEST_IN_COMMUNITY_ORGANISATION_REGULAR',
        'INVEST_IN_COMMUNITY_ORGANISATION_OCCASSIONAL',
        'INVEST_IN_COMMUNITY_ORGANISATION_NO'
      ]
    },
  },
  ENGAGE_STAKEHOLDERS: {
    data: {
      name: "Do you have a plan to regularly engage all stakeholders? ",
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 36,
    },
    relationships: {
      options: [
        'ENGAGE_STAKEHOLDERS_YES',
        'ENGAGE_STAKEHOLDERS_NO'
      ]
    },
  },
  TOWN_HALL_MEETINGS: {
    data: {
      name: "Do you have town hall meetings to engage and communicate with employees? ",
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 37,
    },
    relationships: {
      options: [
        'TOWN_HALL_MEETINGS_REGULAR',
        'TOWN_HALL_MEETINGS_OCCASSIONAL',
        'TOWN_HALL_MEETINGS_NO'
      ]
    },
  },
  STAKEHOLDER_MEETINGS: {
    data: {
      name: "Do you have stakeholder meetings to engage community stakeholders? ",
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 38,
    },
    relationships: {
      options: [
        'STAKEHOLDER_MEETINGS_REGULAR',
        'STAKEHOLDER_MEETINGS_OCCASSIONAL',
        'STAKEHOLDER_MEETINGS_NO'
      ]
    },
  },
  LABOR_WORKPLACE_FAIRNESS: {
    data: {
      name: "Does the company have goals related to labor rights and workplace fairness?",
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 39,
    },
    relationships: {
      options: [
        'LABOR_WORKPLACE_FAIRNESS_YES',
        'LABOR_WORKPLACE_FAIRNESS_NO'
      ]
    },
  },
  EMPLOYEEMENT_OUTSIDE: {
    data: {
      name: "Is any of your employment outside of its headquartered country?",
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 40,
    },
    relationships: {
      options: [
        'EMPLOYEEMENT_OUTSIDE_YES',
        'EMPLOYEEMENT_OUTSIDE_NO'
      ]
    },
  },
  LABOR_GOALS: {
    data: {
      name: "Does the company apply goals related to labor rights and workplace fairness to foreign employees? ",
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 41,
    },
    relationships: {
      options: [
        'LABOR_GOALS_YES',
        'LABOR_GOALS_NO'
      ],
      dependencies: ['EMPLOYEEMENT_OUTSIDE_YES']
    },

  },
};
