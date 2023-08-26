import { Entity, OneToMany, Collection, Property, QueryOrder, ManyToOne, ManyToMany } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';

import { QuizInstanceAnswer } from './quiz-instance-answer.entity';
import { QuizQuestionDependencies } from './quiz-question-dependencies.entity';
import { QuizQuestionOption } from './quiz-question-option.entity';
import { QuizScoreType } from './quiz-score-type.entity';
import { QuizSection } from './quiz-section.entity';

@Entity()
export class QuizQuestion extends BaseEntity<QuizQuestion> {
  @Property()
  public name!: string;

  @Property({ columnType: 'text', default: '' })
  public description!: string;

  @Property()
  public questionType!: number;

  @Property({ default: 0 })
  public sortOrder: number;

  @ManyToOne(() => QuizScoreType)
  quizScoreType: Collection<QuizScoreType> = new Collection<QuizScoreType>(this);

  @Property({ default: 0 })
  public lowerLimit: number;

  @Property({ default: 0 })
  public upperLimit: number;

  @OneToMany(() => QuizInstanceAnswer, (quizInstanceAnswer) => quizInstanceAnswer.quizQuestion)
  quizInstanceAnswer!: QuizInstanceAnswer;

  @OneToMany(() => QuizQuestionOption, (qqo) => qqo.quizQuestion, { orderBy: { sortOrder: QueryOrder.ASC } })
  options: Collection<QuizQuestionOption> = new Collection<QuizQuestionOption>(this);

  @ManyToOne(() => QuizSection)
  quizSection!: QuizSection;

  @ManyToMany(() => QuizQuestionOption)
  dependencies: Collection<QuizQuestionOption> = new Collection<QuizQuestionOption>(this);
}
