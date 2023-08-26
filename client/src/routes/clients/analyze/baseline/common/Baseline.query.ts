import { gql } from '@apollo/client';

export const GET_QUIZ = gql`
  query GetQuiz($quizId: ID!) {
    quiz(quizId: $quizId) {
      name
      uuid
      sections {
        uuid
        name
        sortOrder
        key
        questions {
          name
          uuid
          sortOrder
          questionType
          upperLimit
          lowerLimit
          quizScoreType {
            uuid
          }
          options {
            uuid
            name
            sortOrder
            score
            isOther
          }
        }
      }
    }
  }
`;

export const GET_DEPENDENCIES = gql`
  query Dependencies {
    dependencies {
      items {
        quizQuestion {
          uuid
        }
        quizQuestionOption {
          uuid
        }
      }
    }
  }
`;

export const GET_OR_CREATE_QUIZ_INSTANCE = gql`
  mutation QuizInstance($id: ID!) {
    createOrGetQuizInstance(id: $id) {
      status
      score
      uuid
      quiz {
        name
        uuid
        sections {
          uuid
          name
          sortOrder
          key
          questions {
            name
          uuid
            sortOrder
            questionType
            upperLimit
            lowerLimit
            quizScoreType {
              uuid
            }
            options {
              uuid
              name
              sortOrder
              score
              isOther
            }
          }
        }
      }
      answers {
        uuid
        quizQuestion {
          uuid
        }
        quizQuestionOption {
          uuid
        }
        answerValue
      }
    }
  }
`;

export const GET_QUIZ_SCORE_TYPES = gql`
  query ScoreTypes {
    scoreTypes {
      name
      uuid
      description
      type
    }
  }
`;


export const GET_QUIZ_INSTANCE = gql`
  query Query($quizInstanceId: ID!) {
  instance(quizInstanceId: $quizInstanceId) {
    uuid
    score
    quiz {
      uuid
      name
      sections {
        uuid
        name
        sortOrder
        questions {
          uuid
          name
          sortOrder
          questionType
          options {
            uuid
            name
            isOther
          }
        }
        key
      }
    }
    updatedAt
  }
}
`;

export const GET_QUIZ_INSTANCE_ANSWERS = gql`
  query Answers($quizInstanceId: ID!) {
    answers(quizInstanceId: $quizInstanceId) {
      uuid
      quizQuestionOption {
        uuid
      }
      quizQuestion {
        uuid
      }
      answerValue
    }
  }
`;

export const GET_QUIZ_LIST = gql`
  query Quiz {
    quizzes {
      items {
        uuid
        name
      }
    }
  }
`;

