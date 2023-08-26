import { Collection, Entity, OneToMany, Property, QueryOrder } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { QuizSection } from './quiz-section.entity';

@Entity()
export class Quiz extends BaseEntity<Quiz> {
  @Property()
  public name!: string;

  @OneToMany(() => QuizSection, (qs) => qs.quiz)
  sections: Collection<QuizSection> = new Collection<QuizSection>(this);
}
