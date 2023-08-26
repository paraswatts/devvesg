import { useEffect, useState } from 'react';

import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import { Api, useLazyQuery } from 'src/api';
import { LinkButton } from 'src/common/interactions/Button';
import { Card, CardBody, CardSubtitle, CardTitle, CardTitles } from 'src/common/layout/cards';
import { sortArray } from 'src/common/util';
import { BaselineTabBar } from 'src/routes/clients/analyze/baseline/common';
import { CreateQuizInstance, SectionScoresArray } from 'src/routes/clients/analyze/baseline/common/__gql__/GetQuiz';
import { BaselineScoreBreakdown } from 'src/routes/clients/analyze/baseline/common/BreakdownCard/BaselineScoreBreakdown';
import { BaselineDisplayComponent } from 'src/routes/clients/analyze/baseline/common/ScoreCard/BaselineScores';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

import GetStartedImage from 'src/assets/images/baseline-get-started.png';

import styles from './BaselineOverviewContainer.module.scss';

export const BaselineOverviewContainer = () => {
  const { client } = useClient();
  const [latestQuizData, setLatestQuizData] = useState<CreateQuizInstance>();
  const [previousQuizData, setPreviousQuizData] = useState<CreateQuizInstance>();
  const [currentSectionScores, setCurrentSectionsScores] = useState<SectionScoresArray[] | undefined>();
  const [previousSectionScores, setPreviousSectionsScores] = useState<SectionScoresArray[] | undefined>();

  const [loaded, setLoaded] = useState<boolean>(false);

  const { t } = useTranslation();
  const [getScoresRequest] = useLazyQuery<null, { data: CreateQuizInstance[] }>(Api.quiz.getScores, {
    onSuccess: (response: any) => {
      const quizInstances = response?.data || []
      setTimeout(() => {
        setLoaded(true)
      }, 500)
      if (quizInstances && quizInstances.length) {
        setLatestQuizData(quizInstances[0])
        if (quizInstances.length === 2) {
          setPreviousQuizData(quizInstances[1])
        }
      }
    }
  });

  useEffect(() => {
    getScoresRequest(null)
  }, [getScoresRequest])

  useEffect(() => {
    const currentSectionScores = latestQuizData?.sectionScores
    let arr: SectionScoresArray[] = []
    for (const key in currentSectionScores) {
      const current = currentSectionScores[key]
      arr.push(current)
    }
    arr = sortArray(arr, 'sortOrder')
    setCurrentSectionsScores(arr)
  }, [latestQuizData])

  useEffect(() => {
    const previousSectionScores = previousQuizData?.sectionScores
    let arr: SectionScoresArray[] = []
    for (const key in previousSectionScores) {
      const current = previousSectionScores[key]
      arr.push(current)
    }
    arr = sortArray(arr, 'sortOrder')
    setPreviousSectionsScores(arr)
  }, [previousQuizData])

  return (
    <>
      <Card>
        <BaselineTabBar />
        <CardBody className={'mx-16'}>
          {loaded ?
            <>
              {latestQuizData ? <>
                <div className="flex flex-row justify-between gap-4">
                  <div className="flex flex-col">
                    <CardTitles>
                      <CardTitle className={styles.quiz_title}>{t('questionnaire.your-esg-scores')}</CardTitle>
                      <CardSubtitle className={`mt-3 ${styles.quiz_subtitle}`}>{t('questionnaire.see-scores-improving')}</CardSubtitle>
                    </CardTitles>
                  </div>
                </div>

                <div className="flex flex-row mt-4 -mx-2">
                  <BaselineDisplayComponent title={t("questionnaire.current-esg-score")} value={latestQuizData?.score || 0} lastUpdated={latestQuizData?.updatedAt} />
                  {previousQuizData && <BaselineDisplayComponent title={t("questionnaire.previous-esg-score")} value={previousQuizData?.score || 0} lastUpdated={previousQuizData?.updatedAt} />}
                </div>

                <div className="flex flex-col mt-4">
                  <CardTitles>
                    <CardTitle className={styles.quiz_title}>{t('questionnaire.score-breakdown')}</CardTitle>
                    <CardSubtitle className={`mt-3 ${styles.quiz_subtitle}`}>{t('questionnaire.individual-scores')}</CardSubtitle>
                  </CardTitles>
                </div>

                <div className="flex flex-row mt-6 -mx-2">
                  {currentSectionScores?.map((obj, index) => (
                    <BaselineScoreBreakdown key={obj?.key} title={obj?.name || ''} value={Math.round(obj?.score || 0)} previousValue={Math.round((previousSectionScores && previousSectionScores[index]?.score) || 0)} hasPreviousScores={previousSectionScores?.length ? true : false} />
                  ))}
                </div>

                <p className="text-xs mb-0 mt-10 text-[#6a6a6a]">
                  *{t("questionnaire.scores-disclaimer")}
                </p>
              </> :
                <div className='relative'>
                  <img src={GetStartedImage} alt="Get started" className="" />
                  <div className='absolute left-64 top-3'>
                    <CardTitles>
                      <CardTitle className={styles.getting_started_title}>{t('questionnaire.secret-getting-started')}</CardTitle>
                      <CardSubtitle className={`${styles.getting_started_subtitle} mt-2.5`}>{t('questionnaire.click-get-started')}</CardSubtitle>
                    </CardTitles>
                    <LinkButton.Primary
                      className='mt-8'
                      to={generatePath(ClientAbsoluteRoutes.BASELINE_QUESTIONAIRE, { clientUuid: client.uuid })}
                    >
                      {t("buttons.get-started")}
                    </LinkButton.Primary>
                  </div>
                </div>}
            </> : <Skeleton />}
        </CardBody>
      </Card>
    </>
  );
};
