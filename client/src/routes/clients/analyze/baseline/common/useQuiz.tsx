import { useCallback } from 'react';

import { QuizQuestionAnswer, QuizQuestionOption } from './__gql__/GetQuiz';

interface quiz {
  quizQuestionAnswers: QuizQuestionAnswer[],
  quizQuestionOptions: QuizQuestionOption[]
}
export const useQuiz = ({ quizQuestionAnswers, quizQuestionOptions }: quiz) => {
  //Method to find checked options for a question
  const findCheckedOptions = useCallback((oId: string) => {
    const checked = quizQuestionAnswers.findIndex((answer) => answer?.quizQuestionOption?.uuid === oId)
    return checked >= 0 ? true : false
  }, [quizQuestionAnswers])

  //Method to find text answer for a question
  const findAnswers = useCallback((qId) => {
    const value = quizQuestionAnswers.find((answer) => answer?.quizQuestion?.uuid === qId)
    return value?.answerValue ?? ''
  }, [quizQuestionAnswers])

  //Method to find multi select dropdown options for a question
  const findAnswersMultiSelect = useCallback((qId) => {
    const options = quizQuestionAnswers.filter((answer) => answer?.quizQuestion?.uuid === qId)
    const optionValues = options.map((o) => o?.quizQuestionOption?.uuid)
    return optionValues ?? []
  }, [quizQuestionAnswers])

  const isOtherSelected = useCallback((oId) => {
    const findAnswerOptionUUID = quizQuestionAnswers.find((answer) => answer?.quizQuestionOption?.uuid === oId)?.quizQuestionOption?.uuid
    const isOtherOption = quizQuestionOptions.find((qqo) => qqo?.uuid === findAnswerOptionUUID)?.isOther;
    return isOtherOption;
  }, [quizQuestionAnswers, quizQuestionOptions])

  return {
    findCheckedOptions,
    findAnswers,
    findAnswersMultiSelect,
    isOtherSelected,
  }
};
