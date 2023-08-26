/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL query operation: GetQuiz
// ====================================================


export interface Quiz {
  __typename: "Quiz";
  name: string;
  uuid: string;
  sections: QuizSection[]
}

export interface QuizSection {
  __typename: "QuizSection";
  name: string;
  uuid: string;
  sortOrder: number;
  questions: QuizQuestion[];
  key?: string;
}

export interface QuizQuestion {
  __typename: "QuizQuestion";
  name: string;
  uuid: string;
  sortOrder: number;
  questionType: number;
  upperLimit?: number;
  lowerLimit?: number;
  options: QuizQuestionOption[];
  quizScoreType: QuizScoreType
}

export interface UUID {
  uuid: string;
}

export interface QuizQuestionOption {
  __typename: "QuizQuestionOption";
  name: string;
  uuid: string;
  sortOrder: number;
  score: number;
  isOther: boolean
}

export interface QuizQuestionAnswer {
  __typename?: "QuizQuestionAnswer";
  uuid?: string;
  answerValue?: string;
  quizInstance: UUID;
  quizQuestion: UUID;
  quizQuestionOption?: UUID;
}

export type GetOrCreateQuizInstance = {
  createOrGetQuizInstance: QuizInstance
};

export type GetQuizInstance = {
  instance: QuizInstance
};

export type QuizInstance = {
  quiz: Quiz;
  status: string;
  score: number;
  answers: [QuizQuestionAnswer]
  uuid: string;
  updatedAt?: string;
  sectionScores?: SectionScores
};

export type GetQuizInstanceVariables = {
  id: string;
};

export type GetQuizInstanceAnswers = {
  answers: [QuizQuestionAnswer]
};

export type SectionScores = Record<string, { key: string, name: string, score: number }>

export type QuizAnswersPayload = {
  questionId: string;
  quizInstanceId: string;
  answers: QuizQuestionAnswer[]
};


export interface GetQuizList {
  __typename: "Quiz";
  quizzes: Quizzes
}

export interface Quizzes {
  __typename: "Quizzes";
  items: Quiz[]
}

export interface GetQuizInstanceList {
  __typename: "QuizInstance";
  instances: QuizInstance[]
}

export interface QuizScoreType {
  __typename: "QuizScoreType";
  name: string;
  uuid: string;
  description: string;
  type: number;
}

export interface GetScoreTypes {
  __typename: "GetScoreTypes";
  scoreTypes: QuizScoreType[]
}

export interface QuizDependency {
  __typename: "QuizDependencies";
  quizQuestionOption: QuizQuestionOption
  quizQuestion: QuizQuestion
}

export interface GetDependencies {
  __typename: "QuizDependencies";
  dependencies: {
    items: QuizDependency[]
  }
}

export type QuizSubmitPayload = {
  quizInstanceId: string;
  quizData: {
    quizPrimaryQuestions: QuizQuestion[];
  }
};

export type CreateQuizInstance = {
  quiz: Quiz;
  status: string;
  score: number;
  answers: [QuizQuestionAnswer]
  uuid: string;
  updatedAt?: string;
  sectionScores?: SectionScores
};

export type SectionScoresArray = {
  key: string,
  name: string,
  score: number
}

