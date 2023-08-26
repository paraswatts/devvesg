import { Entity, OneToOne } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';

import { QuizQuestionOption } from './quiz-question-option.entity';
import { QuizQuestion } from './quiz-question.entity';

@Entity()
export class QuizQuestionDependencies extends BaseEntity<QuizQuestionDependencies> {
  @OneToOne(() => QuizQuestionOption)
  quizQuestionOption!: QuizQuestionOption;

  @OneToOne(() => QuizQuestion)
  quizQuestion!: QuizQuestion;
}
