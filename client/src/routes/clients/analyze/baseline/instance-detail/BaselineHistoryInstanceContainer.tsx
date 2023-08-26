import dayjs from "dayjs";
import { useTranslation } from 'react-i18next';

import { QuestionType } from 'src/common/enums';
import { MultiSelect, SelectOption, TextNumberInput } from 'src/common/forms';
import { Checkbox } from 'src/common/forms/Checkbox';
import { RadioButton } from 'src/common/forms/RadioButton';
import { Select } from 'src/common/forms/Select';
import { Textarea } from 'src/common/forms/Textarea';
import { Button } from 'src/common/interactions/Button';
import { Card, CardTitle, CardTitles } from 'src/common/layout/cards';
import { BaselineTabBar } from 'src/routes/clients/analyze/baseline/common';
import { QuizQuestion } from 'src/routes/clients/analyze/baseline/common/__gql__/GetQuiz';
import { useQuiz } from "src/routes/clients/analyze/baseline/common/useQuiz";

import styles from './BaselineHistoryInstanceContainer.module.scss'
import { useHistoryInstance } from './useHistoryInstance';

export const BaselineHistoryInstanceContainer = () => {
  const { t } = useTranslation();

  const {
    quizSections,
    quizQuestions,
    jumpToSection,
    quizCompletedAt,
    retakeQuiz,
    quizQuestionAnswers,
    quizQuestionOptions,
  } = useHistoryInstance();

  const {
    findCheckedOptions,
    findAnswers,
    findAnswersMultiSelect,
    isOtherSelected
  } = useQuiz({ quizQuestionAnswers, quizQuestionOptions })

  const renderQuestionOption = (currentQuestion: QuizQuestion) => {
    if (currentQuestion?.questionType === QuestionType.TEXT) {
      return <Textarea
        value={findAnswers(currentQuestion?.uuid)}
        name={currentQuestion?.uuid}
        rows={4}
        disabled
      />
    }

    if (currentQuestion?.questionType === QuestionType.NUMBER) {
      return <TextNumberInput
        name={currentQuestion?.uuid}
        value={findAnswers(currentQuestion?.uuid)}
        type='number'
        max={currentQuestion.upperLimit}
        min={currentQuestion.lowerLimit}
        disabled
      />
    }

    if (currentQuestion?.questionType === QuestionType.RADIO) {
      return currentQuestion?.options?.map((qo) =>
      (<div key={qo?.name} className='text-[#6a6a6a] mt-4'>
        <RadioButton
          name={currentQuestion?.uuid}
          id={currentQuestion?.uuid}
          checked={findCheckedOptions(qo?.uuid)}
          value={qo?.uuid}
          disabled
        />
        {qo?.name}
        {isOtherSelected(qo?.uuid) &&
          <Textarea
            disabled
            className='mt-4'
            value={findAnswers(currentQuestion?.uuid)}
            name={currentQuestion?.uuid}
            rows={4}
          />}
      </div>)
      )
    }

    if (currentQuestion?.questionType === QuestionType.MULTI_SELECT) {
      return currentQuestion?.options?.map((qo) =>
      (<div key={qo?.name} className='text-[#6a6a6a] mt-4'>
        <Checkbox
          disabled
          name={qo?.uuid}
          id={qo?.uuid}
          checked={findCheckedOptions(qo?.uuid)}
        />
        {qo?.name}
        {isOtherSelected(qo?.uuid) &&
          <Textarea
            disabled
            className='mt-4'
            value={findAnswers(currentQuestion?.uuid)}
            name={currentQuestion?.uuid}
            rows={4}
          />}
      </div>)
      )
    }

    if (currentQuestion?.questionType === QuestionType.MULTI_SELECT_DROPDOWN) {
      return <MultiSelect
        disabled
        placeholder={currentQuestion?.name}
        value={findAnswersMultiSelect(currentQuestion?.uuid)}
        optionFilterProp="label"
      >
        {currentQuestion?.options?.map((option) => (
          <SelectOption key={option?.uuid} value={option?.uuid} label={option?.name} >
            {option?.name}
          </SelectOption>
        ))}
      </MultiSelect>
    }

    return null
  }

  return (
    <>
      <Card>
        <BaselineTabBar />
        <div className="px-4 relative" id="questionsContainer"
        >
          <div
            className="flex flex-row justify-between items-center gap-4 pb-2 -mx-4 px-6 -mt-2.5"
            style={{ borderBottom: '1px solid #ccc' }}
          >
            <div className="flex flex-col">
              <CardTitles>
                {quizCompletedAt && <CardTitle className={styles.quiz_title}>{t('table-headers.date-completed')}: {dayjs(quizCompletedAt).format('MMM DD, YYYY')}</CardTitle>}
              </CardTitles>
            </div>

            <div className="flex flex-row">
              <Button.Primary
                className="text-xl font-medium px-5 mr-4"
                onClick={retakeQuiz}
              >
                {t('buttons.retake')}
              </Button.Primary>
              <Select id="project-status" onChange={jumpToSection} className="p-3 pr-8 mr-4 border-gray-300 rounded w-52" name="status" required defaultValue={1}>
                {quizSections?.map((qs, index) => (
                  <option value={index + 1} key={qs?.uuid}>{qs.name}</option>))}
              </Select>
            </div>
          </div>
          <div>
            <div className='pl-6 pr-2 py-6 flex flex-row'>
              <ul className={`${styles.question_list_container} pl-6 pr-64 max-h-[39rem] overflow-auto`}>
                {quizQuestions?.map((qq, index) => (
                  <li key={qq.uuid} className='py-6'>
                    <div className='flex flex-row' id={`#question__${qq.sortOrder}`}>
                      <span>
                        <strong className='text-[#101011]'>
                          {t('questionnaire.question')} {index + 1}:
                        </strong>
                        <span className='text-[#101011] ml-2'>{qq?.name}</span>
                      </span>
                    </div>
                    <div className="mt-4">
                      {renderQuestionOption(qq)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-[white] py-2 px-8"></div>
        </div>
      </Card >
    </>
  );
};
