import { Collection } from '@mikro-orm/core';
import { QuizQuestionOption } from '../entities';
import { SeedData } from './interface';
import { QUIZ_QUESTIONS_ENVIRONMENTAL } from './quiz-question-environmental';
import { QUIZ_QUESTIONS_GENERAL } from './quiz-question-general';
import { QUIZ_QUESTIONS_GOVERNANCE } from './quiz-question-governance';
import { QUIZ_QUESTIONS_SOCIAL } from './quiz-question-social';

export interface SeedQuizQuestion {
  name: string;
  description: string;
  questionType: number;
  sortOrder?: number;
  scoreType?: number;
  lowerLimit?: number;
  upperLimit?: number;
  questions?: Collection<QuizQuestionOption>;
  [key: string]: string | boolean | number | Collection<QuizQuestionOption>;
}

export const QUIZ_QUESTIONS: SeedData<SeedQuizQuestion> = {
  ...QUIZ_QUESTIONS_GENERAL,
  ...QUIZ_QUESTIONS_ENVIRONMENTAL,
  ...QUIZ_QUESTIONS_GOVERNANCE,
  ...QUIZ_QUESTIONS_SOCIAL
};
