import { combineResolvers, or } from 'apollo-resolvers';
import { QuizStatus } from '../../enums';
import { ApolloForbiddenError } from '../../classes/errors';
import { Quiz, QuizSection, QuizQuestion, QuizQuestionOption, QuizQuestionDependencies, QuizInstance, QuizInstanceAnswer, QuizScoreType } from '../../entities';
import { QuizModel, QuizSectionModel, QuizQuestionModel, QuizQuestionOptionModel, QuizQuestionDependenciesModel, QuizQuestionAnswerModel } from '../../models';
import { GqlMutationQuizInstanceCreateOrGetArgs } from '../types';
import { PaginatedResource } from './interfaces';
import { isAuthenticatedResolver, isClient, ResolverFn } from './utils';
import { QueryOrder, wrap } from '@mikro-orm/core';
import { DI } from '../..';

const resolveAllQuizzes: ResolverFn<PaginatedResource<Quiz>> = async (_, __, { em }) => {
  const quizzes = await new QuizModel(em).fetchAll();

  return {
    items: quizzes,
    pageInfo: {
      page: 0,
      pageSize: quizzes.length,
      totalCount: quizzes.length,
    },
  };
};

const resolveOneQuiz: ResolverFn<Quiz, { quizId: string }> = async (_, { quizId }, { em }) => {
  return await new QuizModel(em).fetch({ quizId });
};


const resolveQuizSection: ResolverFn<QuizSection[], {}, Quiz> = async (quiz, { }, { em }) => {
  return await new QuizSectionModel(em).fetchAll({ quizId: quiz.uuid, orderBy: [{ field: 'sortOrder', direction: 'ASC' }] });
};

const resolveQuizQuestion: ResolverFn<QuizQuestion[], {}, QuizSection> = async (quizSection, { }, { em }) => {
  return await new QuizQuestionModel(em).fetchAll({ quizSectionId: quizSection.uuid, orderBy: [{ field: 'sortOrder', direction: 'ASC' }] }
  );
};

const resolveQuizQuestionOptions: ResolverFn<QuizQuestionOption[], {}, QuizQuestion> = async (quizQuestion, { }, { em }) => {
  return await new QuizQuestionOptionModel(em).fetchAll({ quizQuestionId: quizQuestion.uuid, orderBy: [{ field: 'sortOrder', direction: 'ASC' }] });
};

const resolveQuizDependencies: ResolverFn<PaginatedResource<QuizQuestionDependencies>> = async (_, __, { em }) => {
  const dependencies = await new QuizQuestionDependenciesModel(em).fetchAll();

  return {
    items: dependencies,
    pageInfo: {
      page: 0,
      pageSize: dependencies.length,
      totalCount: dependencies.length,
    },
  };
};

const resolveQuizInstanceCreateOrGet: ResolverFn<QuizInstance, GqlMutationQuizInstanceCreateOrGetArgs> = async (_, payload, { em, user }) => {
  const { id } = payload;
  // verify user is a client
  if (user.type !== 'client') {
    throw new ApolloForbiddenError();
  }
  const quizInstance = await DI.quizInstanceRepo.findOne({ quiz: id, status: QuizStatus.IN_PROGRESS, client: user.clientUuid }, { populate: ['quiz'] });
  if (quizInstance) {
    return quizInstance;
  }
  else {
    const quiz = await DI.quizRepo.findOneOrFail({ uuid: id });
    const client = await DI.clientRepo.findOneOrFail({ uuid: user.clientUuid });
    let parsed = {
      quiz,
      client,
      status: QuizStatus.IN_PROGRESS
    }
    const createQuizInstance = wrap(new QuizInstance()).assign(parsed, { em: em });

    await em.persistAndFlush(createQuizInstance);
    return createQuizInstance;
  }
};

const resolveSingleQuizInstance: ResolverFn<QuizInstance, { quizInstanceId: string }> = async (_, { quizInstanceId }, { em, user }) => {
  const instances = await DI.quizInstanceRepo.findOne({ uuid: quizInstanceId, status: QuizStatus.COMPLETED }, { orderBy: { updatedAt: QueryOrder.DESC }, populate: ['quiz'], fields: ['status', 'quiz', 'updatedAt', 'score'] })
  return instances;
};

const resolveQuizInstanceAnswers: ResolverFn<QuizInstanceAnswer[], { quizInstanceId: string }> = async (_, { quizInstanceId }, { em }) => {
  return await new QuizQuestionAnswerModel(em).fetchAll({ quizInstanceId });
};

const resolveAllScoreTypes: ResolverFn<QuizScoreType[]> = async (_, __, { em, user }) => {
  const scoreTypes = await DI.quizScoreTypeRepo.findAll()
  return scoreTypes;
};

export const resolvers = {
  Query: {
    quizzes: isAuthenticatedResolver.createResolver(resolveAllQuizzes),
    quiz: isAuthenticatedResolver.createResolver(resolveOneQuiz),
    dependencies: isAuthenticatedResolver.createResolver(resolveQuizDependencies),
    answers: isAuthenticatedResolver.createResolver(resolveQuizInstanceAnswers),
    instance: isAuthenticatedResolver.createResolver(resolveSingleQuizInstance),
    scoreTypes: isAuthenticatedResolver.createResolver(resolveAllScoreTypes)
  },
  Quiz: {
    sections: isAuthenticatedResolver.createResolver(resolveQuizSection),
  },
  QuizSection: {
    questions: isAuthenticatedResolver.createResolver(resolveQuizQuestion),
  },
  QuizQuestion: {
    options: isAuthenticatedResolver.createResolver(resolveQuizQuestionOptions),
  },
  Mutation: {
    createOrGetQuizInstance: combineResolvers([or(isClient)])(resolveQuizInstanceCreateOrGet),
  },
};
