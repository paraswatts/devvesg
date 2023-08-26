import { useTranslation } from 'react-i18next';

import { ConfirmationModal } from 'src/common/components';
import { QuestionType } from 'src/common/enums';
import { MultiSelect, SelectOption, TextNumberInput } from 'src/common/forms';
import { Checkbox } from 'src/common/forms/Checkbox';
import { RadioButton } from 'src/common/forms/RadioButton';
import { Select } from 'src/common/forms/Select';
import { Textarea } from 'src/common/forms/Textarea';
import { Button } from 'src/common/interactions/Button';
import { Card, CardTitle, CardTitles } from 'src/common/layout/cards';
import { BaselineTabBar } from 'src/routes/clients/analyze/baseline/common';
import { useQuiz } from 'src/routes/clients/analyze/baseline/common/useQuiz';

import styles from './BaselineFormContainer.module.scss'
import { useQuestionnaire } from './useQuestionnaire';

export const BaselineFormContainer = () => {
  const { t } = useTranslation();

  const {
    quizQuestionIndex,
    questionNameClasses,
    findIsAttempted,
    submitQuestionnaire,
    jumpToQuestion,
    jumpToSection,
    setPreviousQuestion,
    setNextQuestion,
    onChangeMultiSelect,
    onChangeRadioOption,
    onChangeMultiOption,
    onChangeTextArea,
    quizSections,
    quizPrimaryQuestions,
    currentQuestion,
    currentQuestionIndex,
    isSubmitModalOpened,
    closeSubmitModal,
    openSubmitModal,
    allQuestionsAttempted,
    onChangeNumberInput,
    errorMessage,
    quizQuestionAnswers,
    quizQuestionOptions
  } = useQuestionnaire();

  const {
    findAnswers,
    findAnswersMultiSelect,
    findCheckedOptions,
    isOtherSelected
  } = useQuiz({ quizQuestionAnswers, quizQuestionOptions });

  const renderQuestionOption = () => {
    if (currentQuestion?.questionType === QuestionType.TEXT) {
      return <Textarea
        value={findAnswers(currentQuestion?.uuid)}
        name={currentQuestion?.uuid}
        rows={4}
        onChange={(event) => onChangeTextArea(event, currentQuestion?.uuid)}
      />
    }

    if (currentQuestion?.questionType === QuestionType.NUMBER) {
      return <TextNumberInput
        name={currentQuestion?.uuid}
        value={findAnswers(currentQuestion?.uuid)}
        type='number'
        max={currentQuestion.upperLimit}
        min={currentQuestion.lowerLimit}
        onChange={(event) => onChangeNumberInput(event, currentQuestion?.uuid)}
      />
    }

    if (currentQuestion?.questionType === QuestionType.RADIO) {
      return currentQuestion?.options?.map((qo) =>
      (<div key={qo?.name} className='text-[#6a6a6a] mt-4'>
        <RadioButton
          onChange={(event) => onChangeRadioOption(event, currentQuestion?.uuid)}
          name={currentQuestion?.uuid}
          id={currentQuestion?.uuid}
          checked={findCheckedOptions(qo?.uuid)}
          value={qo?.uuid}
        />
        {qo?.name}
        {isOtherSelected(qo?.uuid) &&
          <Textarea className='mt-4' value={findAnswers(currentQuestion?.uuid)} name={currentQuestion?.uuid} rows={4}
            onChange={(event) => onChangeTextArea(event, currentQuestion?.uuid)}
          />}
      </div>)
      )
    }

    if (currentQuestion?.questionType === QuestionType.MULTI_SELECT) {
      return currentQuestion?.options?.map((qo) =>
      (<div key={qo?.name} className='text-[#6a6a6a] mt-4'>
        <Checkbox
          name={qo?.uuid}
          id={qo?.uuid}
          checked={findCheckedOptions(qo?.uuid)}
          onChange={(event) => onChangeMultiOption(event, currentQuestion?.uuid, qo?.uuid)}
        />
        {qo?.name}
        {isOtherSelected(qo?.uuid) &&
          <Textarea className='mt-4' value={findAnswers(currentQuestion?.uuid)} name={currentQuestion?.uuid} rows={4}
            onChange={(event) => onChangeTextArea(event, currentQuestion?.uuid)}
          />}
      </div>)
      )
    }

    if (currentQuestion?.questionType === QuestionType.MULTI_SELECT_DROPDOWN) {
      return <MultiSelect
        placeholder={currentQuestion?.name}
        value={findAnswersMultiSelect(currentQuestion?.uuid)}
        onChange={(event) => onChangeMultiSelect(event, currentQuestion?.uuid)}
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

  const renderButtons = () => {
    return <>
      <Button.Outline
        disabled={currentQuestionIndex === 0 || Boolean(errorMessage)}
        className="mr-4 text-xl font-medium px-6"
        onClick={setPreviousQuestion}
      >
        {t('buttons.previous')}
      </Button.Outline>
      {
        currentQuestionIndex === quizPrimaryQuestions.length - 1 ?
          <Button.Primary
            disabled={Boolean(errorMessage)}
            className="text-xl font-medium px-5"
            onClick={openSubmitModal}
          >
            {t('buttons.submit')}
          </Button.Primary> :
          <Button.Primary
            disabled={Boolean(errorMessage)}
            className="text-xl font-medium px-5"
            onClick={setNextQuestion}
          >
            {t('buttons.next')}
          </Button.Primary>
      }
    </>
  }

  return (
    <>
      <Card>
        <BaselineTabBar />
        <div className="px-4">
          <div
            className="flex flex-row justify-between items-center gap-4 pb-2 -mx-4 px-6 -mt-2.5"
            style={{ borderBottom: '1px solid #ccc' }}
          >
            <div className="flex flex-col">
              <CardTitles>
                <CardTitle className={styles.quiz_title}>{t('questionnaire.take-questionnaire')}</CardTitle>
              </CardTitles>
            </div>

            <div className="flex flex-row">
              <Select id="project-status" onChange={jumpToSection} className="p-3 pr-8 mr-4 border-gray-300 rounded w-52" name="status" required defaultValue={1}>
                {quizSections?.map((qs, index) => (
                  <option value={index + 1} key={qs?.uuid}>{qs.name}</option>))}
              </Select>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="pr-4 py-4">
              <div id="questionsDiv" className={`w-72 ${styles.question_list_container}`}>
                {quizSections?.map((qs) => (
                  <div key={qs?.uuid}>
                    <strong>{qs?.name}</strong>
                    <ol className="pr-4 mt-2 list-decimal">
                      {qs?.questions?.map((qq) => (
                        <li id={`#question${quizQuestionIndex(qq?.uuid)}`} className="truncate mb-4 text-[#101011]" key={qq?.uuid}>
                          <div className={`cursor-pointer flex text-[13px] ${questionNameClasses(qq?.uuid)}`} onClick={() => jumpToQuestion(qq?.uuid)}>
                            <span className='mr-2'>{`${quizQuestionIndex(qq?.uuid) + 1} `}</span>
                            <span className={`whitespace-normal ${findIsAttempted(qq?.uuid) ? styles.question : ''}`}>{qq?.name}</span>
                          </div>
                        </li>))}
                    </ol>
                  </div>))}
              </div>
            </div>
            <div
              className="flex flex-1 flex-col items-center bg-[#EFEFEF] py-8 px-8 rounded-b-xl"
            >
              <div className={`shadow-xl ${styles.rounded_border_radius}`}>
                <Card>
                  <div className="px-16 py-14">
                    <strong><span className='text-[#0f66cc]'>{t('questionnaire.question')} {currentQuestionIndex + 1}</span></strong>{`/${quizPrimaryQuestions?.length}`}
                    <div className='text-[#101011] mt-3.5'>{currentQuestion?.name}</div>
                    <div className="mt-4">
                      {renderQuestionOption()}
                      <div className='text-[#cc0000] mt-2'>{errorMessage}</div>
                    </div>
                    <div className="mt-7">
                      {renderButtons()}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <div className="bg-[white] py-2 px-8"></div>
        </div>
        <ConfirmationModal isOpen={isSubmitModalOpened} onCancelModal={closeSubmitModal} title={t('questionnaire.submit-questionnaire')}>
          <div className="px-20 mt-4">
            <span className="text-500">{t(allQuestionsAttempted ? 'questionnaire.completed-disclaimer' : 'questionnaire.not-completed-disclaimer')}</span>
            <div className="flex justify-center mt-5">
              <Button.Outline type="button" className="mr-4" onClick={closeSubmitModal}>
                {t('buttons.review-again')}
              </Button.Outline>
              <Button.Primary type="submit" onClick={submitQuestionnaire}>
                {t('buttons.submit')}
              </Button.Primary>
            </div>
          </div>
        </ConfirmationModal>
      </Card >
    </>
  );
};
