import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';

import { QuizInstance } from './quiz-instance.entity';
import { QuizQuestion } from './quiz-question.entity';
import { QuizQuestionOption } from './quiz-question-option.entity';

@Entity()
export class QuizInstanceAnswer extends BaseEntity<QuizInstanceAnswer> {
  @Property()
  public status!: string;

  @Property()
  public answerValue: string;

  @ManyToOne(() => QuizInstance)
  quizInstance!: QuizInstance;

  @ManyToOne(() => QuizQuestion)
  quizQuestion!: QuizQuestion;

  @ManyToOne(() => QuizQuestionOption)
  quizQuestionOption!: QuizQuestionOption;
}
