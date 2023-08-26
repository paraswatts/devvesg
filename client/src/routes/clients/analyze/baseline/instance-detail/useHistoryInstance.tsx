import { useCallback, useEffect, useState } from 'react';

import { useLazyQuery } from '@apollo/client';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import {
  GetQuizInstance,
  GetQuizInstanceAnswers,
  Quiz,
  QuizQuestion,
  QuizQuestionAnswer,
  QuizQuestionOption,
  QuizSection,
} from 'src/routes/clients/analyze/baseline/common/__gql__/GetQuiz';
import { GET_QUIZ_INSTANCE, GET_QUIZ_INSTANCE_ANSWERS } from 'src/routes/clients/analyze/baseline/common/Baseline.query';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

export const useHistoryInstance = () => {
  const { client } = useClient();
  const { quizInstanceUuid } = useParams<{ quizInstanceUuid: string }>();

  const navigate = useNavigate()
  const [quiz, setQuiz] = useState<Quiz>();
  const [quizSections, setQuizSections] = useState<QuizSection[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizQuestionOptions, setQuizQuestionOptions] = useState<QuizQuestionOption[]>([]);
  const [quizQuestionAnswers, setQuizQuestionAnswers] = useState<QuizQuestionAnswer[]>([]);
  const [quizCompletedAt, setQuizCompletedAt] = useState<string>();

  const [getQuizInstance] = useLazyQuery<GetQuizInstance>(
    GET_QUIZ_INSTANCE,
    {
      variables: {
        quizInstanceId: quizInstanceUuid || ''
      },
      onCompleted: (response) => {
        setQuiz(response?.instance?.quiz);
        setQuizCompletedAt(response?.instance?.updatedAt || new Date().toISOString())
        getQuizInstanceAnswers()
      },
    },
  );

  useEffect(() => {
    getQuizInstance();
  }, [getQuizInstance])

  const [getQuizInstanceAnswers] = useLazyQuery<GetQuizInstanceAnswers>(GET_QUIZ_INSTANCE_ANSWERS, {
    variables: {
      quizInstanceId: quizInstanceUuid || ''
    },
    onCompleted: (response) => {
      setQuizQuestionAnswers(response?.answers);
    },
  });

  useEffect(() => {
    let sections: QuizSection[] = quiz?.sections || [];
    setQuizSections(sections)
    let questions = sections?.map(qs => qs.questions.map((question) => ({ ...question, section_key: qs?.key, section_name: qs?.name, sort_order: qs?.sortOrder }))).flat();
    //Flat sections array with all the questions
    setQuizQuestions(questions || [])
    const options = sections?.map(qs => qs.questions.map((question) => question.options.map((option) => option))).flat().flat() || [];
    setQuizQuestionOptions(options)
  }, [quiz, quizQuestionAnswers,])

  const jumpToSection = useCallback((event: any) => {
    const selectedSection = parseInt(event.target.value || 1);
    const nextSection = quizSections?.find((qs) => qs.sortOrder === selectedSection)
    const nextQuestion = nextSection?.questions?.[0]
    const nextQIndex = `#question__${nextQuestion?.sortOrder}`
    scrollToQuestion(nextQIndex)
  }, [quizSections])

  const scrollToQuestion = (elementId: string) => {
    const element = document.getElementById(elementId);
    setTimeout(() => {
      element?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  }

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

  const retakeQuiz = useCallback(() => {
    navigate(generatePath(ClientAbsoluteRoutes.BASELINE_FORM, { clientUuid: client.uuid, quizUuid: quiz?.uuid }))
  }, [quiz, navigate, client.uuid])

  return {
    quiz,
    quizSections,
    quizQuestionAnswers,
    quizQuestions,
    quizQuestionOptions,
    jumpToSection,
    findCheckedOptions,
    findAnswers,
    findAnswersMultiSelect,
    isOtherSelected,
    quizCompletedAt,
    retakeQuiz,
  }
};
