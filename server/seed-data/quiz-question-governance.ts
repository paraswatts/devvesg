import { QuestionType, ScoreType } from '../enums';
import { SeedData } from './interface';
import { SeedQuizQuestion } from './quiz-question';

export const QUIZ_QUESTIONS_GOVERNANCE: SeedData<SeedQuizQuestion> = {
  PUBLIC_DISCLOSE_ENVIRONMENT_DATA: {
    data: {
      name: 'What environmental data do you publicly disclose?',
      description: '',
      hasScore: false,
      questionType: QuestionType.MULTI_SELECT,
      sortOrder: 42,
    },
    relationships: {
      options: [
        'PUBLIC_DISCLOSE_ENVIRONMENT_DATA_ENERGY',
        'PUBLIC_DISCLOSE_ENVIRONMENT_DATA_GREENHOUSE',
        'PUBLIC_DISCLOSE_ENVIRONMENT_DATA_CARBON_OFFSET',
        'PUBLIC_DISCLOSE_ENVIRONMENT_DATA_WATER',
        'PUBLIC_DISCLOSE_ENVIRONMENT_DATA_GREENHOUSE',
        'PUBLIC_DISCLOSE_ENVIRONMENT_DATA_WASTE',
        'PUBLIC_DISCLOSE_ENVIRONMENT_DATA_RECYCLING',
        'PUBLIC_DISCLOSE_ENVIRONMENT_DATA_BUILDING',
        'PUBLIC_DISCLOSE_ENVIRONMENT_DATA_GREENHOUSE_TECHNOLOGY',
        'PUBLIC_DISCLOSE_ENVIRONMENT_DATA_GREENHOUSE_OTHER'
      ],
    },
  },
  ENVIRONMENT_DATA_VERIFIED: {
    data: {
      name: 'What proportion of environmental data has been externally verified? ',
      description: '',
      hasScore: true,
      questionType: QuestionType.MULTI_SELECT,
      sortOrder: 43,
    },
    relationships: {
      options: [
        'ENVIRONMENT_DATA_VERIFIED_ENERGY',
        'ENVIRONMENT_DATA_VERIFIED_GREENHOUSE',
        'ENVIRONMENT_DATA_VERIFIED_CARBON_OFFSET',
        'ENVIRONMENT_DATA_VERIFIED_WATER',
        'ENVIRONMENT_DATA_VERIFIED_GREENHOUSE',
        'ENVIRONMENT_DATA_VERIFIED_WASTE',
        'ENVIRONMENT_DATA_VERIFIED_RECYCLING',
        'ENVIRONMENT_DATA_VERIFIED_BUILDING',
        'ENVIRONMENT_DATA_VERIFIED_GREENHOUSE_TECHNOLOGY',
        'ENVIRONMENT_DATA_VERIFIED_GREENHOUSE_OTHER'
      ],
    },
  },
  PUBLIC_DISCLOSE_SOCIAL_DATA: {
    data: {
      name: 'What social data do you publicly disclose?',
      description: '',
      hasScore: false,
      questionType: QuestionType.MULTI_SELECT,
      sortOrder: 44,
    },
    relationships: {
      options: [
        'PUBLIC_DISCLOSE_SOCIAL_DATA_DIVERSE_POLITICS',
        'PUBLIC_DISCLOSE_SOCIAL_DATA_MANAGER',
        'PUBLIC_DISCLOSE_SOCIAL_DATA_SUPPLIER',
        'PUBLIC_DISCLOSE_SOCIAL_DATA_LOCAL_SUPPLIER',
        'PUBLIC_DISCLOSE_SOCIAL_DATA_COMMUNITY_ENGAGEMENT',
      ],
    },
  },
  SOCIAL_DATA_VERIFIED: {
    data: {
      name: 'What proportion of social data has been externally verified?',
      description: '',
      hasScore: true,
      questionType: QuestionType.MULTI_SELECT,
      sortOrder: 45,
    },
    relationships: {
      options: [
        'SOCIAL_DATA_VERIFIED_DIVERSE_POLITICS',
        'SOCIAL_DATA_VERIFIED_MANAGER',
        'SOCIAL_DATA_VERIFIED_SUPPLIER',
        'SOCIAL_DATA_VERIFIED_LOCAL_SUPPLIER',
        'SOCIAL_DATA_VERIFIED_COMMUNITY_ENGAGEMENT',
      ],
    }
  },
  CODE_OF_ETHICS: {
    data: {
      name: 'Is there a senior executives\' Code of Ethics? ',
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 46,
    },
    relationships: {
      options: [
        'CODE_OF_ETHICS_YES',
        'CODE_OF_ETHICS_NO'
      ],
    },
  },
  HIGHEST_MANAGEMENT_POSITION: {
    data: {
      name: 'Provide the highest management-level position(s) or committee(s) with responsibility for ESG',
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 47,
    },
    relationships: {
      options: ['BOARD_CEO_PRESIDENT', 'VP', 'DIRECTOR', 'MANAGER']
    }
  },
  ESG_OVERSIGHT: {
    data: {
      name: 'Does your board have a system for ESG oversight (i.e. standing commeees, auditing etc)?',
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 48,
    },
    relationships: {
      options: [
        'ESG_OVERSIGHT_YES',
        'ESG_OVERSIGHT_NO'
      ],
    },
  },
  ENVIRONMENTAL_SOCIAL_INTEGRATED: {
    data: {
      name: 'Are environmental and social issues integrated into any aspects of your long-term strategic business plan and corporate strategy?',
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 49,
    },
    relationships: {
      options: [
        'ENVIRONMENTAL_SOCIAL_INTEGRATED_YES',
        'ENVIRONMENTAL_SOCIAL_INTEGRATED_NO'
      ],
    },
  },
  INCORPORATE_ESG: {
    data: {
      name: 'Does the Board/management incorporate ESG in the organization’s purpose, mission, vision, values and Corporate Code of Conduct?',
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 50,
    },
    relationships: {
      options: [
        'INCORPORATE_ESG_YES',
        'INCORPORATE_ESG_NO'
      ],
    },
  },
  LONG_TERM_GOALS_ESG: {
    data: {
      name: 'Does the CEO position description and annual performance plan incorporate ESG? Is Compensation for the CEO and management linked to performance on short and long-term ESG goals? ',
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 51,
    },
    relationships: {
      options: [
        'LONG_TERM_GOALS_ESG_YES',
        'LONG_TERM_GOALS_ESG_NO'
      ],
    },
  },
  EXPENSE_SAVINGS: {
    data: {
      name: 'Does your board/organization have corporate strategy that identifies and capitalizes on innovative ESG-enabled revenue streams and expense savings?',
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 52,
    },
    relationships: {
      options: [
        'EXPENSE_SAVINGS_YES',
        'EXPENSE_SAVINGS_NO'
      ],
    },
  },
  MAINSTREAM_ANNUAL_REPORT: {
    data: {
      name: 'Did your organization include information about its response to environmental and social priorities in its most recent mainstream annual report?',
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 53,
    },
    relationships: {
      options: [
        'MAINSTREAM_ANNUAL_REPORT_YES',
        'MAINSTREAM_ANNUAL_REPORT_NO'
      ],
    },
  },
  PUBLIC_POLICY_ESG_GOALS: {
    data: {
      name: 'Do you engage in activities that could either directly or indirectly influence public policy on environmental or social issues that follow your ESG goals?',
      description: '',
      hasScore: true,
      questionType: QuestionType.RADIO,
      sortOrder: 54,
    },
    relationships: {
      options: [
        'PUBLIC_POLICY_ESG_GOALS_YES',
        'PUBLIC_POLICY_ESG_GOALS_NO'
      ],
    },
  }
};
