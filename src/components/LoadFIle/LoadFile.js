import React, {useCallback, useState} from 'react';
import useFetch from 'use-http';
import classes from './LoadFile.module.scss';
import {shuffle} from '../../utils';
import {getApiUrl} from '../../utils/apiUtils';
import {Form, Checkbox, Input, Button} from 'semantic-ui-react';

export const LoadFile = ({setQuestions, setPageType}) => {
  const {loading, error, data: sheets} = useFetch(getApiUrl('questions'), {}, []);
  const [questionsAmount, setQuestionsAmount] = useState(10);
  const [selectedSheets, setSelectedSheets] = useState([]);

  const handleCheckboxChange = useCallback((event, { value, checked }) => {
    if (checked) {
      setSelectedSheets([...selectedSheets, value]);
    } else {
      setSelectedSheets(selectedSheets.filter(i => i !== value))
    }
  }, [setSelectedSheets, selectedSheets]);

  const handleQuestionsAmount = useCallback((event, { value }) => {
    setQuestionsAmount(Number(value));
  }, [setQuestionsAmount])

  const goNext = useCallback(() => {
    const questions = shuffle(sheets.data
      .filter(i => selectedSheets.includes(i.id))
      .reduce((prev, curr) => {
        const questions = curr.questions.map(i => ({...i, answeredIds: []}));
        return ([...prev, ...questions]);
      }, []))
      .slice(0, questionsAmount)
    setQuestions(questions);
    setPageType('user-selection-for-testing');
  }, [setQuestions, setPageType, selectedSheets, sheets, questionsAmount])

  const maxQuestionsAmount = selectedSheets.reduce((prev, curr) => prev + sheets.data.find(i => i.id === curr).questions.length, 0)
  return (
    <div className={classes.container}>
      {error && 'Упс... Произошла ошибка. Невозможно загрузить список вопросов'}
      {loading && 'Загрузка...'}
      {sheets && (
        <>
          <h1>Выбеоите категории вопросов</h1>
          {sheets.data.map(sheet => (
            <Form.Field key={sheet.sheetName}>
              <Checkbox label={sheet.sheetName} name="sheet" checked={selectedSheets.includes(sheet.id)} value={sheet.id} onChange={handleCheckboxChange}/>
            </Form.Field>
          ))}
          <Input placeholder='Количество задаваемых вопросов' min={0} max={maxQuestionsAmount} value={maxQuestionsAmount < questionsAmount ? maxQuestionsAmount : questionsAmount} onChange={handleQuestionsAmount} type="number" />
          <br />
          <Button primary size="big" onClick={() => setPageType('home')}>Назад</Button>
          <Button primary size="big" onClick={goNext} disabled={!maxQuestionsAmount || !questionsAmount}>Далее</Button>
        </>
      )}
    </div>
  )
};

