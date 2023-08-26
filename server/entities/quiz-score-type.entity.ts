import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { QuizQuestion } from './quiz-question.entity';

@Entity()
export class QuizScoreType extends BaseEntity<QuizScoreType> {
  @Property()
  public name!: string;

  @Property({ columnType: 'text', default: '' })
  public description!: string;

  @Property()
  public type!: number;

  @OneToMany(() => QuizQuestion, (qq) => qq.quizScoreType)
  questions: Collection<QuizQuestion> = new Collection<QuizQuestion>(this);
}
