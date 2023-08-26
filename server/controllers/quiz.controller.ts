import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import { ApiRes } from '../interfaces';
import { QuizInstance, QuizInstanceAnswer, QuizQuestion, UserTypes } from '../entities';
import { userHasType } from '../lib/util';
import { DI } from '../';
import { QueryOrder, wrap } from '@mikro-orm/core';
import * as z from 'zod';
import { QuizStatus, ScoreType } from '../enums';

const router = Router();

const quizInstanceUpdateFormSchema = z.object({
  status: z.string().min(1),
  score: z.number().nonnegative(),
  sectionScores: z.string().min(1)
});

router.post(
  `/answers/:quizInstanceId/:quizQuestionId`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.CLIENT]),
  async (req: Request, res: Response<ApiRes<QuizInstanceAnswer[]>>, next: NextFunction) => {
    try {
      const em = DI.orm.em.fork(false);
      const answersBody = req.body
      const instanceId = req.params.quizInstanceId;
      const questionId = req.params.quizQuestionId
      const answers = await DI.quizAnswerRepo.find({ quizInstance: instanceId, quizQuestion: questionId });
      if (answers && answers?.length) {
        const answers = await DI.quizAnswerRepo.find({ quizInstance: instanceId, quizQuestion: questionId });
        await em.removeAndFlush(answers);
      }
      const quizQuestion = await DI.quizQuestionRepo.findOneOrFail({ uuid: questionId });
      const quizInstance = await DI.quizInstanceRepo.findOneOrFail({ uuid: instanceId });
      const answersToSave = []
      for (const answer of answersBody) {
        const parsed = {
          quizInstance,
          quizQuestion,
          status: ''
        }
        if (answer?.answerValue) {
          parsed['answerValue'] = answer?.answerValue
        }
        if (answer?.quizQuestionOption) {
          const quizQuestionOption = await DI.quizQuestionOptionRepo.findOneOrFail({ uuid: answer?.quizQuestionOption?.uuid });
          parsed['quizQuestionOption'] = quizQuestionOption
        }
        const createQuizAnswerInstance = wrap(new QuizInstanceAnswer()).assign(parsed, { em: em });
        answersToSave.push(createQuizAnswerInstance)
      }

      await em.persistAndFlush(answersToSave);

      const findQuestionAnswers = await DI.quizAnswerRepo.find({ quizInstance: instanceId, quizQuestion: questionId });
      res.json({ data: findQuestionAnswers });
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  `/submit/:quizInstanceId`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.CLIENT]),
  async (req: Request, res: Response<ApiRes<QuizInstanceAnswer[]>>, next: NextFunction) => {
    try {
      const em = DI.orm.em.fork(false);
      const instanceId = req.params.quizInstanceId;
      const quizPrimaryQuestions = req.body.quizPrimaryQuestions || [];
      const instanceAnswers = await DI.quizAnswerRepo.find({ quizInstance: instanceId });
      const scoreTypes = await DI.quizScoreTypeRepo.findAll();

      let totalBaseScore = 0;
      let totalScoreAchieved = 0;
      let sectionScoresAchieved = {};
      let sectionScoresBaseTotal = {};
      let sectionNames = {};
      let sectionOrders = {};

      for (const question of quizPrimaryQuestions) {
        let section_key = question.section_key;
        let section_name = question.section_name;
        let section_order = question.sort_order;

        if (section_key && !sectionNames[section_key]) {
          sectionNames[section_key] = section_name;
          sectionOrders[section_key] = section_order;
        }
        const scoreType = scoreTypes.find((type) => type.uuid === question.quizScoreType.uuid).type || ScoreType.NO_SCORE;

        switch (scoreType) {
          case ScoreType.PERCENTAGE:
            totalBaseScore = totalBaseScore + 1;
            const currentQuestion = instanceAnswers?.find((answer) => answer.quizQuestion.uuid === question?.uuid);
            const answerValue = currentQuestion?.answerValue || 0;
            const score = (Number(answerValue) / 100);
            totalScoreAchieved = totalScoreAchieved + score;
            break;
          case ScoreType.OPTIONS_TOTAL_PERCENTAGE:
            totalBaseScore = totalBaseScore + 1
            const answers = instanceAnswers?.filter((answer) => answer.quizQuestion.uuid === question?.uuid);
            if (answers && answers.length) {
              const totalOptions = question?.options?.length || 1;
              const questionScore = answers.length / totalOptions;
              totalScoreAchieved = totalScoreAchieved + questionScore;
              if (section_key) {
                if (sectionScoresAchieved[section_key]) {
                  sectionScoresAchieved[section_key] = sectionScoresAchieved[section_key] + questionScore;
                } else {
                  sectionScoresAchieved[section_key] = questionScore;
                }
              }
            }
            if (sectionScoresBaseTotal[section_key]) {
              sectionScoresBaseTotal[section_key] = sectionScoresBaseTotal[section_key] + 1;
            } else {
              sectionScoresBaseTotal[section_key] = 1;
            }
            break;
          case ScoreType.OPTION_SCORE:
            const questionOptions = question?.options.map((option) => option.score).flat();
            const maxScore = Math.max(...questionOptions);
            totalBaseScore = totalBaseScore + maxScore;
            const answer = instanceAnswers?.find((answer) => answer.quizQuestion.uuid === question?.uuid);
            if (answer) {
              const questionOption = question?.options.find((option) => option.uuid === answer.quizQuestionOption?.uuid);
              const questionScore = questionOption?.score || 0;
              totalScoreAchieved = totalScoreAchieved + questionScore;
              if (section_key) {
                if (sectionScoresAchieved[section_key]) {
                  sectionScoresAchieved[section_key] = sectionScoresAchieved[section_key] + questionScore;
                } else {
                  sectionScoresAchieved[section_key] = questionScore;
                }
              }
            }
            if (sectionScoresBaseTotal[section_key]) {
              sectionScoresBaseTotal[section_key] = sectionScoresBaseTotal[section_key] + maxScore;
            } else {
              sectionScoresBaseTotal[section_key] = maxScore;
            }
            break;
          default:
        }
      }


      totalScoreAchieved = totalScoreAchieved * 100 / totalBaseScore;
      const sectionScores = {};
      for (const key in sectionScoresBaseTotal) {
        const base = sectionScoresBaseTotal[key] || 1;
        const achieved = sectionScoresAchieved[key] || 0;
        const name = sectionNames[key] || '';
        const sortOrder = sectionOrders[key] || 1;
        const currentSectionScore = (achieved / base) * 100;
        sectionScores[key] = {
          name,
          score: currentSectionScore,
          key,
          sortOrder
        };
      }

      const instance = await DI.quizInstanceRepo.findOneOrFail({ uuid: instanceId });

      const updatedInstance = {
        score: Math.round((totalScoreAchieved)),
        sectionScores: JSON.stringify(sectionScores),
        status: QuizStatus.COMPLETED
      };
      const parsed = quizInstanceUpdateFormSchema.parse(updatedInstance);
      const newInstance = instance.assign(parsed);

      await em.persistAndFlush(newInstance);

      res.json({ data: [] });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  `/scores`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.CLIENT]),
  async (req: Request, res: Response<ApiRes<QuizInstance[]>>, next: NextFunction) => {
    try {
      const instances = await DI.quizInstanceRepo.find({ client: req.user.clientUuid, status: QuizStatus.COMPLETED }, { orderBy: { updatedAt: QueryOrder.DESC }, limit: 2, fields: ['updatedAt', 'score', 'sectionScores'] })
      res.json({ data: instances });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  `/instances`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.CLIENT]),
  async (req: Request, res: Response<ApiRes<QuizInstance[]>>, next: NextFunction) => {
    try {
      const instances = await DI.quizInstanceRepo.find({ client: req.user.clientUuid }, { orderBy: { updatedAt: QueryOrder.DESC }, fields: ['status', 'quiz', 'updatedAt'] })
      res.json({ data: instances });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  `/history/:page/:size`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.CLIENT]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.params.page)
      const limit: number = parseInt(req.params.size) ?? 10;
      const offset: number = page ? (page - 1) * limit : 0;
      const instances = await DI.quizInstanceRepo.find({ client: req.user.clientUuid, status: QuizStatus.COMPLETED }, {
        populate: ['quiz'],
        offset, limit, orderBy: { updatedAt: QueryOrder.DESC }, fields: ['status', 'quiz', 'updatedAt']
      })
      const total = await DI.quizInstanceRepo.count({ client: req.user.clientUuid, status: QuizStatus.COMPLETED });
      res.json({ data: { instances, pagination: { total, page, limit } } });
    } catch (e) {
      next(e);
    }
  },
);

export const QuizController = router;
