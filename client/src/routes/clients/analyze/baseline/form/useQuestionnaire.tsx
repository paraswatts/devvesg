import { useCallback, useEffect, useRef, useState } from 'react';

import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import { Api, useLazyQuery as useLazyQueryApi } from 'src/api';
import { ScoreType } from 'src/common/enums';
import { sortArray } from 'src/common/util';
import {
  GetDependencies,
  GetOrCreateQuizInstance,
  GetQuizInstanceAnswers,
  GetQuizInstanceVariables,
  GetScoreTypes,
  Quiz,
  QuizAnswersPayload,
  QuizDependency,
  QuizQuestion,
  QuizQuestionAnswer,
  QuizQuestionOption,
  QuizScoreType,
  QuizSection,
  QuizSubmitPayload,
} from 'src/routes/clients/analyze/baseline/common/__gql__/GetQuiz';
import './BaselineFormContainer.module.scss'
import {
  GET_DEPENDENCIES,
  GET_OR_CREATE_QUIZ_INSTANCE,
  GET_QUIZ_INSTANCE_ANSWERS,
  GET_QUIZ_SCORE_TYPES
} from 'src/routes/clients/analyze/baseline/common/Baseline.query';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

let quizQuestionAnswersLocal: QuizQuestionAnswer[] = [];
let currentAnswers: QuizQuestionAnswer[] = [];
export const useQuestionnaire = () => {
  const { client } = useClient();
  const { quizUuid } = useParams<{ quizUuid: string }>();
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState<Quiz>();
  const [quizSections, setQuizSections] = useState<QuizSection[]>([]);
  const [quizSectionsAll, setQuizSectionsAll] = useState<QuizSection[]>([]);
  const [quizPrimaryQuestions, setPrimaryQuestions] = useState<QuizQuestion[]>([]);
  const [quizDependentQuestions, setDependentQuestions] = useState<QuizQuestion[]>([]);
  const [quizQuestionOptions, setQuizQuestionOptions] = useState<QuizQuestionOption[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [quizQuestionAnswers, setQuizQuestionAnswers] = useState<QuizQuestionAnswer[]>([]);
  const [quizQuestionDependencies, setQuizQuestionDependencies] = useState<QuizDependency[]>([]);
  const [quizInstanceId, setQuizInstanceId] = useState<string>('');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isSubmitModalOpened, setIsSubmitModalOpened] = useState<boolean>(false);
  const [allQuestionsAttempted, setAllAttempted] = useState<boolean>(false);
  const [scoreTypes, setScoreTypes] = useState<QuizScoreType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [dependentUUIDs, setDependentUUIDs] = useState<string[]>([]);
  const [dependentOptionUUIDs, setDependentOptionUUIDs] = useState<string[]>([]);
  const [dependentQuestionLoaded, setDependentQuestionsLoaded] = useState<boolean>(false);
  const answersToSave = useRef<QuizAnswersPayload | undefined>();
  const refetchAnswers = useRef<boolean>();

  const [quizInstanceCreateOrGet] = useMutation<GetOrCreateQuizInstance, GetQuizInstanceVariables>(
    GET_OR_CREATE_QUIZ_INSTANCE,
    {
      variables: {
        id: quizUuid || '',
      },
      onCompleted: (response) => {
        setQuiz(response?.createOrGetQuizInstance?.quiz);
        setQuizInstanceId(response?.createOrGetQuizInstance?.uuid)
        getQuizInstanceAnswers()
      },
    },
  );


  useQuery<GetScoreTypes>(GET_QUIZ_SCORE_TYPES, {
    onCompleted: (response) => {
      setScoreTypes(response.scoreTypes)
    },
  });

  const [saveOrModifyAnswersQuery] = useLazyQueryApi<QuizAnswersPayload, { data: QuizQuestionAnswer[] }>(Api.quiz.saveOrModifyAnswers, {
    onSuccess: () => {
      if (refetchAnswers.current) {
        answersToSave.current = undefined
        currentAnswers = []
        getQuizInstanceAnswers()
      }
    }
  });

  const [submitQuizRequest] = useLazyQueryApi<QuizSubmitPayload, { data: QuizQuestionAnswer[] }>(Api.quiz.submitQuiz, {
    onSuccess: () => {
      navigate(generatePath(ClientAbsoluteRoutes.BASELINE_OVERVIEW, { clientUuid: client.uuid }))
    }
  });

  useEffect(() => {
    quizInstanceCreateOrGet();
  }, [quizInstanceCreateOrGet])

  const [getQuizInstanceAnswers] = useLazyQuery<GetQuizInstanceAnswers>(GET_QUIZ_INSTANCE_ANSWERS, {
    variables: {
      quizInstanceId
    },
    onCompleted: (response) => {
      const answersList = [...quizQuestionAnswersLocal];
      const findAnswersNotUploaded = answersList.filter((answer) => !answer.uuid)
      const newAnswers = [...findAnswersNotUploaded, ...response?.answers]
      setQuizQuestionAnswers(newAnswers);
      quizQuestionAnswersLocal = newAnswers
      setIsMounted(true)
    },
  });

  useQuery<GetDependencies>(GET_DEPENDENCIES, {
    onCompleted: (response) => {
      setQuizQuestionDependencies(response?.dependencies?.items || []);
      if (response?.dependencies?.items && response?.dependencies?.items.length) {
        setDependentUUIDs(response?.dependencies?.items.map((d) => d.quizQuestion.uuid).flat());
        setDependentOptionUUIDs(response?.dependencies?.items.map((d) => d.quizQuestionOption.uuid).flat());
      }
      setDependentQuestionsLoaded(true)
    },
  });

  useEffect(() => {
    if (!isMounted && dependentQuestionLoaded) {
      let sections: QuizSection[] = quiz?.sections || [];
      //Save original section with all the questions
      let allSections = quiz?.sections || []
      //Remove all the dependent questions from the sections array
      sections = sections?.map((qs) => {
        return { ...qs, questions: qs?.questions.filter((question) => !dependentUUIDs.includes(question?.uuid)) }
      })
      setQuizSections(sections)
      setQuizSectionsAll(allSections)
      //Filter primary questions
      let primaryQuestions = sections?.map(qs => qs.questions.map((question) => ({ ...question, section_key: qs?.key, section_name: qs?.name, sort_order: qs?.sortOrder }))).flat();
      //Flat original sections array with all the questions
      let dependentQuestions = allSections?.map(qs => qs.questions.map((question) => ({ ...question, section_key: qs?.key, section_name: qs?.name }))).flat();
      primaryQuestions = primaryQuestions?.filter((question) => !dependentUUIDs.includes(question?.uuid))
      //Filter dependent questions
      dependentQuestions = dependentQuestions?.filter((question) => dependentUUIDs.includes(question?.uuid))
      const answerUUIDs = quizQuestionAnswers?.map((answer) => answer?.quizQuestionOption?.uuid).flat();
      const dependentAnswers = dependentQuestions?.filter((question) => quizQuestionDependencies.filter((dependency) => answerUUIDs.includes(dependency.quizQuestionOption.uuid)).some((q) => q?.quizQuestion.uuid === question.uuid)) || []
      primaryQuestions = sortArray([...primaryQuestions, ...dependentAnswers], 'sortOrder')
      setPrimaryQuestions(primaryQuestions || [])
      setCurrentQuestion(primaryQuestions[0])
      setCurrentQuestionIndex(0)
      setDependentQuestions(dependentQuestions)
      const options = allSections?.map(qs => qs.questions.map((question) => question.options.map((option) => option))).flat().flat() || [];
      setQuizQuestionOptions(options)
    }
  }, [quiz, quizQuestionAnswers, isMounted, dependentUUIDs, dependentQuestionLoaded, dependentOptionUUIDs, quizQuestionDependencies])

  useEffect(() => {
    //Whenever any new question is added to the questions array add that to the sections array as well
    const questionUUIDs = quizPrimaryQuestions?.map(qq => qq.uuid).flat();
    let sections = [...quizSectionsAll]
    sections = sections.map((section) => {
      return { ...section, questions: section.questions.filter((question) => questionUUIDs.includes(question?.uuid)) }
    })
    setQuizSections(sections)
  }, [quizPrimaryQuestions, quizSectionsAll])

  useEffect(() => {
    let primaryQuestions = [...quizPrimaryQuestions]
    let nonScoringQuestions = primaryQuestions.filter((question) => scoreTypes.find((type) => type.uuid === question.quizScoreType.uuid)?.type === ScoreType.NO_SCORE)
    primaryQuestions = primaryQuestions.filter((question) => scoreTypes.find((type) => type.uuid === question.quizScoreType.uuid)?.type !== ScoreType.NO_SCORE)
    const questionUUIDs = primaryQuestions.map((question) => question.uuid).flat();
    const nonScoringQuestionUUIDs = nonScoringQuestions.map((question) => question.uuid).flat();
    let attemptedQuestionUUIDs = quizQuestionAnswers.map((answer) => answer.quizQuestion.uuid).flat();
    attemptedQuestionUUIDs = attemptedQuestionUUIDs.filter((item, index, self) => self.indexOf(item) === index);
    attemptedQuestionUUIDs = attemptedQuestionUUIDs.filter((uuid) => !nonScoringQuestionUUIDs.includes(uuid))
    setAllAttempted(attemptedQuestionUUIDs.length === questionUUIDs.length)
  }, [quizQuestionAnswers, quizPrimaryQuestions, scoreTypes])

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>, qId: string) => {
    let answersList = [...quizQuestionAnswersLocal];
    /* 
        ** Check if answer already exist 
        ** Update the value if answer already exist
        ** Push the value into answers if answer does not exist
    */
    const answerIndex = answersList.findIndex((answer) => answer.quizQuestion?.uuid === qId);
    currentAnswers = []
    if (answerIndex > -1) {
      answersList[answerIndex].answerValue = e.target.value;
      currentAnswers.push(answersList[answerIndex])
    } else {
      const answer: QuizQuestionAnswer = {
        quizQuestion: {
          uuid: qId
        },
        quizInstance: {
          uuid: quizInstanceId || ''
        },
        answerValue: e.target.value,
      }
      answersList.push(answer)
      currentAnswers.push(answer)
    }
    answersToSave.current = { questionId: qId, quizInstanceId, answers: currentAnswers }
    quizQuestionAnswersLocal = answersList
    setQuizQuestionAnswers(answersList)
  }

  const onChangeNumberInput = (e: React.ChangeEvent<HTMLInputElement>, qId: string) => {
    const value = e.target.value
    //@ts-ignore
    if (Number(value) > currentQuestion?.upperLimit || Number(value) < currentQuestion?.lowerLimit) {
      setErrorMessage(`Please enter value between ${currentQuestion?.lowerLimit} and ${currentQuestion?.upperLimit}`)
    }
    else {
      setErrorMessage('')
    }

    let answersList = [...quizQuestionAnswersLocal];
    /* 
        ** Check if answer already exist 
        ** Update the value if answer already exist
        ** Push the value into answers if answer does not exist
    */
    const answerIndex = answersList.findIndex((answer) => answer.quizQuestion?.uuid === qId);
    currentAnswers = []
    if (answerIndex > -1) {
      answersList[answerIndex].answerValue = value;
      currentAnswers.push(answersList[answerIndex])
    } else {
      const answer: QuizQuestionAnswer = {
        quizQuestion: {
          uuid: qId
        },
        quizInstance: {
          uuid: quizInstanceId || ''
        },
        answerValue: value,
      }
      answersList.push(answer)
      currentAnswers.push(answer)
    }
    answersToSave.current = { questionId: qId, quizInstanceId, answers: currentAnswers }
    quizQuestionAnswersLocal = answersList
    setQuizQuestionAnswers(answersList)
  }

  const onChangeRadioOption = (e: React.ChangeEvent<HTMLInputElement>, qId: string) => {
    const optionUUID = e.target.value
    let answersList = [...quizQuestionAnswersLocal];
    const answerIndex = answersList.findIndex((answer) => answer.quizQuestion?.uuid === qId);
    /*
        ** Check if answer already exist 
        ** Update the value if answer already exist
        ** Push the value into answers if answer does not exist
    */
    currentAnswers = [];
    if (answerIndex > -1) {
      answersList[answerIndex].quizQuestionOption = { uuid: optionUUID || '' }
      currentAnswers.push(answersList[answerIndex])
    } else {
      const answer: QuizQuestionAnswer = {
        quizQuestion: {
          uuid: qId
        },
        quizInstance: {
          uuid: quizInstanceId || ''
        },
        quizQuestionOption: { uuid: optionUUID || '' }
      }
      answersList.push(answer)
      currentAnswers.push(answer)
    }
    answersToSave.current = { questionId: qId, quizInstanceId, answers: currentAnswers }

    let primaryQuestions = [...quizPrimaryQuestions]
    /*
        ** Check if the selected option has any dependent questions 
        ** If yes push the dependent questions into the array
    */
    const findDependentQuestions = quizDependentQuestions?.filter((question) => quizQuestionDependencies?.filter((dependency) => dependency?.quizQuestionOption?.uuid === optionUUID)?.some((q) => q.quizQuestion.uuid === question.uuid))
    if (findDependentQuestions && findDependentQuestions.length) {
      primaryQuestions.push(...findDependentQuestions)
      //Sort the new quesitons list by sortOrder
      primaryQuestions = sortArray(primaryQuestions, 'sortOrder')
    }
    else {
      /*
          ** Check and remove if any dependent question exist in the primary questions list and
             their depdendency answers does not exist in the answers list
      */
      const findDependentQuestion = primaryQuestions?.filter((question) =>
        dependentUUIDs.includes(question.uuid))
      const dependentAnswerOptions = findDependentQuestion.map((question) => { return { question: question?.uuid, answer: quizQuestionDependencies.filter((d) => question.uuid === d.quizQuestion.uuid) } })
      const currentAnswerOptionUUID = answersList?.map((answer) => answer?.quizQuestionOption?.uuid)

      const questionsToRemove = dependentAnswerOptions?.filter((question) => question?.answer?.find((answer) => !currentAnswerOptionUUID.includes(answer.quizQuestionOption.uuid)))

      const questionUUIDs = questionsToRemove.map((question) => question?.question)
      for (const question of questionUUIDs) {
        refetchAnswers.current = false
        saveOrModifyAnswersQuery({ questionId: question, quizInstanceId, answers: [] })
      }
      answersList = answersList.filter((answer) => !questionUUIDs.includes(answer.quizQuestion.uuid))
      primaryQuestions = primaryQuestions.filter((question) => !questionUUIDs.includes(question?.uuid))
    }
    setPrimaryQuestions(primaryQuestions)
    setQuizQuestionAnswers(answersList)
    quizQuestionAnswersLocal = answersList
  }

  const onChangeMultiOption = (e: React.ChangeEvent<HTMLInputElement>, qId: string, oId: string) => {
    let answersList = [...quizQuestionAnswersLocal];
    const answerIndex = answersList.findIndex((answer) => answer.quizQuestionOption?.uuid === oId);
    if (answerIndex < 0) {
      const answer: QuizQuestionAnswer = {
        quizQuestion: {
          uuid: qId
        },
        quizInstance: {
          uuid: quizInstanceId || ''
        },
        quizQuestionOption: { uuid: oId || '' }
      }
      currentAnswers.push(answer)
      answersList.push(answer)
    } else {
      currentAnswers = currentAnswers.filter((answer) => answer?.quizQuestionOption?.uuid !== oId)
      answersList.splice(answerIndex, 1)
    }
    answersToSave.current = { questionId: qId, quizInstanceId, answers: currentAnswers }
    quizQuestionAnswersLocal = answersList
    setQuizQuestionAnswers(answersList)
  }

  const onChangeMultiSelect = (selectedOptions: string[], qId: string) => {
    let answersList = [...quizQuestionAnswersLocal];
    answersList = answersList.filter((answer) => answer.quizQuestion?.uuid !== qId);
    currentAnswers = []
    selectedOptions.forEach(option => {
      const answer: QuizQuestionAnswer = {
        quizQuestion: {
          uuid: qId
        },
        quizInstance: {
          uuid: quizInstanceId || ''
        },
        quizQuestionOption: { uuid: option || '' }
      }
      answersList.push(answer)
      currentAnswers.push(answer)
    });
    answersToSave.current = { questionId: qId, quizInstanceId, answers: currentAnswers }
    quizQuestionAnswersLocal = answersList
    setQuizQuestionAnswers(answersList)
  }

  const quizQuestionIndex = useCallback((qUuid: string) => {
    const qIndex = quizPrimaryQuestions.findIndex((qq) => qq.uuid === qUuid)
    return qIndex;
  }, [quizPrimaryQuestions])

  const getElementId = useCallback((qId: string) => {
    return `#question${quizQuestionIndex(qId)}`
  }, [quizQuestionIndex])

  const saveAnswersToDb = useCallback(() => {
    if (answersToSave?.current?.answers?.length) {
      refetchAnswers.current = true
      saveOrModifyAnswersQuery(answersToSave.current)
    }
  }, [saveOrModifyAnswersQuery])

  useEffect(() => {
    return () => saveAnswersToDb()
  }, [saveAnswersToDb])

  const setPreviousQuestion = useCallback(() => {
    if (errorMessage && errorMessage.length > 0) return
    const previousQuestion = quizPrimaryQuestions[currentQuestionIndex - 1]
    setCurrentQuestionIndex(currentQuestionIndex => currentQuestionIndex - 1)
    setCurrentQuestion(previousQuestion)
    scrollToQuestion(getElementId(previousQuestion?.uuid || ''))
    saveAnswersToDb()
  }, [quizPrimaryQuestions, currentQuestionIndex, getElementId, saveAnswersToDb, errorMessage])

  const setNextQuestion = useCallback(() => {
    if (errorMessage && errorMessage.length > 0) return
    const nextQuestion = quizPrimaryQuestions[currentQuestionIndex + 1]
    setCurrentQuestionIndex(currentQuestionIndex => currentQuestionIndex + 1)
    setCurrentQuestion(nextQuestion)
    scrollToQuestion(getElementId(nextQuestion?.uuid || ''))
    saveAnswersToDb()
  }, [quizPrimaryQuestions, currentQuestionIndex, getElementId, saveAnswersToDb, errorMessage])


  const jumpToSection = useCallback((event: any) => {
    if (errorMessage && errorMessage.length > 0) return

    const selectedSection = parseInt(event.target.value || 1);
    const nextSection = quizSections?.find((qs) => qs.sortOrder === selectedSection)
    const nextQuestion = nextSection?.questions?.[0]
    const nextQIndex = quizQuestionIndex(nextQuestion?.uuid || '')
    setCurrentQuestionIndex(nextQIndex)
    setCurrentQuestion(nextQuestion)
    scrollToQuestion(getElementId(nextQuestion?.uuid || ''), true)
    saveAnswersToDb()
  }, [quizSections, quizQuestionIndex, getElementId, saveAnswersToDb, errorMessage])

  const scrollToQuestion = (elementId: string, isSection?: boolean) => {
    const element = document.getElementById(elementId);
    const questionsDiv = document.getElementById('questionsDiv')
    const parentBottom = questionsDiv?.getBoundingClientRect().bottom || 0
    const elementBottom = element?.getBoundingClientRect().bottom || 0
    //Scroll to the quesiton if it goes out of view or section has changed
    if (parentBottom < elementBottom || isSection)
      setTimeout(() => {
        element?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
  }

  const jumpToQuestion = useCallback((uuid: string) => {
    if (errorMessage && errorMessage.length > 0) return
    const nextQuestionIndex = quizPrimaryQuestions?.findIndex((qq) => {
      return qq.uuid === uuid
    })
    setCurrentQuestionIndex(nextQuestionIndex)
    setCurrentQuestion(quizPrimaryQuestions[nextQuestionIndex])
    saveAnswersToDb()
  }, [quizPrimaryQuestions, saveAnswersToDb, errorMessage])

  const submitQuestionnaire = () => {
    closeSubmitModal()
    submitQuizRequest({ quizInstanceId, quizData: { quizPrimaryQuestions } })
  }

  const openSubmitModal = () => {
    setIsSubmitModalOpened(true)
    saveAnswersToDb()
  }

  const findIsAttempted = (qId: string) => {
    return quizQuestionAnswers.find((answer) => answer?.quizQuestion?.uuid === qId && answer?.uuid)
  }

  const questionNameClasses = (qId: string) => {
    if (quizQuestionIndex(qId) === currentQuestionIndex)
      return 'text-[#0f66cc] font-semibold'
    if (findIsAttempted(qId))
      return 'text-[#707070] font-semibold'
    return ''
  }

  const closeSubmitModal = () => {
    setIsSubmitModalOpened(false)
  }

  return {
    quizQuestionIndex,
    questionNameClasses,
    findIsAttempted,
    submitQuestionnaire,
    jumpToQuestion,
    scrollToQuestion,
    getElementId,
    jumpToSection,
    setNextQuestion,
    setPreviousQuestion,
    onChangeMultiSelect,
    onChangeRadioOption,
    onChangeTextArea,
    onChangeMultiOption,
    quiz,
    quizSections,
    quizSectionsAll,
    quizPrimaryQuestions,
    quizDependentQuestions,
    quizQuestionOptions,
    currentQuestion,
    currentQuestionIndex,
    quizQuestionAnswers,
    quizQuestionDependencies,
    closeSubmitModal,
    isSubmitModalOpened,
    openSubmitModal,
    allQuestionsAttempted,
    onChangeNumberInput,
    errorMessage
  }
};
