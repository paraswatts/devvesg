import { Collection } from '@mikro-orm/core';
import { QuizSection } from '../entities';
import { SeedData } from './interface';

export interface SeedQuiz {
  name: string;
}

export const QUIZZES: SeedData<SeedQuiz> = {
  SHORT_FORM_QUESTIONNAIRE: {
    data: {
      name: 'Long Form Questionnaire',
    },
    relationships: {
      sections: [
        'ENVIRONMENTAL_LONG',
        'GOVERNANCE_LONG',
        'SOCIAL_LONG'
      ],
    },
  }
};
