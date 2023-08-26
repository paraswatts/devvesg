import { Entity, ManyToOne, OneToMany, Collection, Property, QueryOrder } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { QuizQuestion } from './quiz-question.entity';
import { Quiz } from './quiz.entity';

@Entity()
export class QuizSection extends BaseEntity<QuizSection> {
  @Property()
  public name!: string;

  @Property({ columnType: 'text', default: '' })
  public description!: string;

  @Property()
  public key: string;

  @Property({ default: 0 })
  public sortOrder: number;

  @ManyToOne(() => Quiz)
  quiz!: Quiz;

  @OneToMany(() => QuizQuestion, (qq) => qq.quizSection, { orderBy: { sortOrder: QueryOrder.ASC } })
  questions: Collection<QuizQuestion> = new Collection<QuizQuestion>(this);
}
