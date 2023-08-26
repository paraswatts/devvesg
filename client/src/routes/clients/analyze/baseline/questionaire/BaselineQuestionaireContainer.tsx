import React, { useCallback, useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import { Api, useLazyQuery } from 'src/api';
import { QuizStatus, QuizStatusText } from 'src/common/enums';
import { Card, CardBody, CardSubtitle, CardTitle, CardTitles } from 'src/common/layout/cards';
import { BaselineTabBar } from 'src/routes/clients/analyze/baseline/common';
import { GetQuizList, Quiz, QuizInstance } from 'src/routes/clients/analyze/baseline/common/__gql__/GetQuiz';
import { GET_QUIZ_LIST } from 'src/routes/clients/analyze/baseline/common/Baseline.query';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

import tableStyles from 'src/common/styles/Table.module.scss';

import styles from './baseline.module.scss';

export const BaselineQuestionaireContainer = () => {
  const { client } = useClient();
  const { t } = useTranslation();
  const [quizList, setQuizList] = useState<Quiz[]>();
  const [quizInstances, setQuizInstances] = useState<QuizInstance[]>();
  const [loaded, setLoaded] = useState<boolean>(false);

  const TableHeader = ({ children }: { children: React.ReactNode }) => {
    return <th className={styles.table_header}>{children}</th>
  }

  useQuery<GetQuizList>(GET_QUIZ_LIST, {
    variables: {
    },
    onCompleted: (response) => {
      setQuizList(response?.quizzes?.items);
    },
  });

  const [getInstancesRequest] = useLazyQuery<null, { data: QuizInstance[] }>(Api.quiz.getInstances, {
    onSuccess: (response: any) => {
      setTimeout(() => {
        setLoaded(true)
      }, 500)
      setQuizInstances(response?.data || [])
    }
  });

  useEffect(() => {
    getInstancesRequest(null)
  }, [getInstancesRequest])

  const findQuizStatus = useCallback((qUuid) => {
    const hasQuizInstances = quizInstances?.filter((qIns) => qIns.quiz === qUuid)
    let status = QuizStatusText.NOT_STARTED;
    if (hasQuizInstances && hasQuizInstances.length) {
      if (hasQuizInstances.find((qIns) => qIns.status === QuizStatus.IN_PROGRESS))
        status = QuizStatusText.IN_PROGRESS
      else if (hasQuizInstances.find((qIns) => qIns.status === QuizStatus.COMPLETED))
        status = QuizStatusText.COMPLETED
    }
    return status
  }, [quizInstances])

  return (
    <>
      <Card>
        <BaselineTabBar />
        <CardBody>
          {loaded ?
            <>
              <div className="flex flex-row justify-between gap-4">
                <div className="flex flex-col">
                  <CardTitles>
                    <CardTitle className={styles.quiz_title}>{t("questionnaire.esg-questionnaire")}</CardTitle>
                    <CardSubtitle className={`${styles.quiz_subtitle} mt-3`} >{t("questionnaire.take-questionnaire")}</CardSubtitle>
                  </CardTitles>
                </div>
              </div>

              <div className="mt-8">
                <table className={tableStyles.devvEsgTable}>
                  <thead>
                    <tr>
                      <TableHeader>{t("questionnaire.esg-questionnaire")}</TableHeader>
                      <TableHeader>{t("common.status")}</TableHeader>
                      {/* <TableHeader>{t("common.progress")}</TableHeader> */}
                      <TableHeader>{t("common.action")}</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {quizList?.map((quiz) => (<tr key={quiz.uuid}>
                      <td>{quiz.name}</td>
                      <td>{findQuizStatus(quiz?.uuid)}</td>
                      {/* <td>Question 1/9</td> */}
                      <td>
                        <a href={generatePath(ClientAbsoluteRoutes.BASELINE_FORM, { clientUuid: client.uuid, quizUuid: quiz.uuid })}>{t("questionnaire.launch")}</a>
                      </td>
                    </tr>))}
                  </tbody>
                </table>
              </div>
            </> :
            <Skeleton />
          }
        </CardBody>
      </Card>
    </>
  );
};
