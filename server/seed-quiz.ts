if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import { Collection, MikroORM } from '@mikro-orm/core';
import fs from 'fs';
import path from 'path';

import {
  Quiz,
  QuizQuestion,
  QuizQuestionOption,
  QuizScoreType,
  QuizSection,
} from './entities';
import { MediaEntityTypes } from './interfaces';
import { uploadFile } from './config/s3';
import { RelationshipTypes, SeedData } from './seed-data/interface';
import { QUIZZES, SeedQuiz } from './seed-data/quiz';
import { QUIZ_SECTIONS, SeedQuizSection } from './seed-data/quiz-section';
import { QUIZ_QUESTIONS, SeedQuizQuestion } from './seed-data/quiz-question';
import { QUIZ_QUESTION_OPTIONS, SeedQuizQuestionOptions } from './seed-data/quiz-options';
import { QUIZ_SCORE_TYPES, SeedQuizScoreType } from './seed-data/quiz-score-types';
import { QUIZ_QUESTIONS_LONG } from './seed-data/quiz-question-long';
import { QUIZ_SECTIONS_LONG } from './seed-data/quiz-section-long';
import { QUIZ_QUESTION_OPTIONS_LONG } from './seed-data/quiz-options-long';
seed();

// The super duper magical function to seed our DB, as long as everything's in the right format
async function createItemsAndAssignRelationship(
  JSON_DATA: SeedData<SeedQuiz | SeedQuizSection | SeedQuizQuestion | SeedQuizQuestionOptions | SeedQuizScoreType>,
  ClassName: new () => Quiz | QuizSection | QuizQuestion | QuizQuestionOption | QuizScoreType,
  relationshipKeys: RelationshipTypes[],
  relationshipEntries: any[],
  entityType?: MediaEntityTypes,
) {
  // To be the final items we will persist
  const finalArray: Array<Promise<SeedQuiz | SeedQuizSection | SeedQuizQuestion | SeedQuizQuestionOptions | SeedQuizScoreType>> = [];
  // Pass in one of the seed-data consts
  Object.keys(JSON_DATA).forEach((key, index) => {
    const promise = new Promise<SeedQuiz | SeedQuizSection | SeedQuizQuestion | SeedQuizQuestionOptions | SeedQuizScoreType>(async (res) => {
      // Instantiate a version of the entity class and assign the seed data to it.
      // Give it a special key so we can parse relationships.
      const thisItem = (new ClassName() as any).assign({ ...JSON_DATA[key].data, seedId: key });
      if (JSON_DATA[key].relationships) {
        relationshipKeys.forEach((relationshipKey) => {
          JSON_DATA[key].relationships[relationshipKey]?.length
          const relationships = JSON_DATA[key].relationships ? JSON_DATA[key].relationships[relationshipKey] : [];
          // Parse the relationship and add the relevant entity (relationshipEntries) to the relevant key
          relationships?.length && relationships.forEach((relationship) => {
            const itemToAdd = relationshipEntries.find((item) => item.seedId === relationship);
            (thisItem[relationshipKey] as Collection<any>).add(itemToAdd);
          });
        })

      }
      // If a logo is available, seed it
      if (thisItem.logo && entityType) {
        const fileName = `${key}-logo.png`;
        const file: Express.Multer.File = {
          buffer: fs.readFileSync(path.join(__dirname, 'seed-data', 'images', entityType, fileName)),
          originalname: fileName,
        } as Express.Multer.File;
        const logoUrl = await uploadFile(file, entityType, 'logo', thisItem.mediaUuid);
        thisItem.logo = logoUrl.Location;
      }

      if (thisItem.onboardingLogo && entityType) {
        const fileName = `${key}-onboardingLogo.jpg`;
        const file: Express.Multer.File = {
          buffer: fs.readFileSync(path.join(__dirname, 'seed-data', 'images', entityType, fileName)),
          originalname: fileName,
        } as Express.Multer.File;
        const logoUrl = await uploadFile(file, entityType, 'onboardingLogo', thisItem.mediaUuid);
        thisItem.onboardingLogo = logoUrl.Location;
      }
      res(thisItem);
    });
    finalArray.push(promise);
  });
  return Promise.all(finalArray);
}

async function seed() {
  const orm = await MikroORM.init();
  const quizRepo = orm.em.getRepository(Quiz);
  const quizSectionsRepo = orm.em.getRepository(QuizSection);
  const quizQuestionsRepo = orm.em.getRepository(QuizQuestion);
  const quizQuestionsOptionsRepo = orm.em.getRepository(QuizQuestionOption);
  const quizScoreTypeRepo = orm.em.getRepository(QuizScoreType);

  /**
   * ORDER OF OPERATIONS:
   * 1. Creation quiz question options and persist
   * 2. Create questions
   * 3. Add quiz qution options to question and persist questions
   * 4. Create quiz sections
   * 5. Add questions to quiz sections and persist quiz sections
   * 6. Create quiz
   * 7. Add quiz sections to  quiz and persist quiz
   */

  //1. Quiz Question Options

  const quizQuestionOptions: SeedQuizQuestionOptions[] = (await createItemsAndAssignRelationship(
    {
      ...QUIZ_QUESTION_OPTIONS, ...QUIZ_QUESTION_OPTIONS_LONG
    },
    QuizQuestionOption,
    [RelationshipTypes.quizQuestionDependent],
    [],
    MediaEntityTypes.QUIZ_QUESTION_OPTIONS,
  )) as SeedQuizQuestionOptions[];
  await quizQuestionsOptionsRepo.persist(quizQuestionOptions);

  //3. Quiz Questions

  const quizQuestions: SeedQuizQuestion[] = (await createItemsAndAssignRelationship(
    { ...QUIZ_QUESTIONS, ...QUIZ_QUESTIONS_LONG },
    QuizQuestion,
    [RelationshipTypes.quizQuestionOptions, RelationshipTypes.quizQuestionDependencies],
    quizQuestionOptions,
    MediaEntityTypes.QUIZ_QUESTION,
  )) as SeedQuizQuestion[];
  await quizQuestionsRepo.persist(quizQuestions);

  //2. Quiz Score Types
  const quizScoreTypes: SeedQuizScoreType[] = (await createItemsAndAssignRelationship(
    QUIZ_SCORE_TYPES,
    QuizScoreType,
    [RelationshipTypes.quizQuestions],
    quizQuestions,
    MediaEntityTypes.QUIZ_SCORE_TYPES,
  )) as SeedQuizScoreType[];
  await quizScoreTypeRepo.persist(quizScoreTypes);

  //4. Quiz Sections

  const quizSections: SeedQuizSection[] = (await createItemsAndAssignRelationship(
    { ...QUIZ_SECTIONS, ...QUIZ_SECTIONS_LONG },
    QuizSection,
    [RelationshipTypes.quizQuestions],
    quizQuestions,
    MediaEntityTypes.QUIZ_SECTION,
  )) as SeedQuizSection[];
  await quizSectionsRepo.persist(quizSections);

  //5. Quiz

  const quizzes: SeedQuiz[] = (await createItemsAndAssignRelationship(
    QUIZZES,
    Quiz,
    [RelationshipTypes.quizSection],
    quizSections,
    MediaEntityTypes.QUIZ,
  )) as SeedQuiz[];
  await quizRepo.persist(quizzes);

  // End
  await orm.em.flush();

  process.exit(0);
}
