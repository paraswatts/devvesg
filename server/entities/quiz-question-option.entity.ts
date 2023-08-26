import { Entity, ManyToOne, Property, OneToMany } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';

import { QuizQuestion } from './quiz-question.entity';
import { QuizInstanceAnswer } from './quiz-instance-answer.entity';

@Entity()
export class QuizQuestionOption extends BaseEntity<QuizQuestionOption> {
  @Property()
  public name!: string;

  @Property({ columnType: 'text', default: '' })
  public description!: string;

  @Property({ default: 0 })
  public score: number;

  @Property({ default: false })
  public isOther: boolean

  @Property({ default: 0 })
  public sortOrder: number;

  @ManyToOne(() => QuizQuestion)
  quizQuestion!: QuizQuestion;

  @OneToMany(() => QuizInstanceAnswer, (quizInstanceAnswer) => quizInstanceAnswer.quizQuestionOption)
  quizInstanceAnswer!: QuizInstanceAnswer;
}
