import { Entity, ManyToOne, OneToMany, Collection, Property, QueryOrder, JsonType } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';

import { Client } from './client.entity';
import { Quiz } from './quiz.entity';
import { QuizInstanceAnswer } from './quiz-instance-answer.entity';

@Entity()
export class QuizInstance extends BaseEntity<QuizInstance> {
  @Property()
  public status!: string;

  @Property({ default: 0 })
  public score!: number;

  @Property()
  sectionScores: JsonType;

  @ManyToOne(() => Quiz)
  quiz!: Quiz;

  @ManyToOne(() => Client)
  client!: Client;

  @OneToMany(() => QuizInstanceAnswer, (p) => p.quizInstance, { orderBy: { name: QueryOrder.ASC } })
  answers: Collection<QuizInstanceAnswer> = new Collection<QuizInstanceAnswer>(this);
}
