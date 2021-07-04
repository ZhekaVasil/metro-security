import React, {useCallback, useState, useEffect} from 'react';
import useFetch from 'use-http';
import classes from './LoadFile.module.scss';
import {shuffle} from '../../utils';
import {getApiUrl} from '../../utils/apiUtils';
import {Form, Checkbox, Input, Button} from 'semantic-ui-react';
import {UserInfoHeading} from '../UserInfoHeading';

export const LoadFile = ({setQuestions, setPageType, userForTesting}) => {
  const {loading, error, data: sheets} = useFetch(getApiUrl('questions'), {cachePolicy: 'no-cache'}, []);
  const [questionsAmount, setQuestionsAmount] = useState(10);
  const [selectedSheets, setSelectedSheets] = useState([]);
  const [filteredSheets, setFilteredSheets] = useState(null);

  useEffect(() => {
    if (sheets) {
      const position = (userForTesting.position || '').trim().toLowerCase();
      const filteredData = sheets.data.reduce((prev, curr) => {
        const filteredQuestions = curr.questions.filter(question => (question.positions || []).includes(position));
        if (filteredQuestions.length) {
          return [...prev, {...curr, questions: filteredQuestions} ]
        } else {
          return prev;
        }
      }, []);
      setFilteredSheets({data: filteredData});
    }
  }, [sheets, userForTesting]);

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
    const questions = shuffle(filteredSheets.data
      .filter(i => selectedSheets.includes(i.id))
      .reduce((prev, curr) => {
        const questions = curr.questions.map(i => ({...i, answeredIds: []}));
        return ([...prev, ...questions]);
      }, []))
      .slice(0, questionsAmount)
    setQuestions(questions);
    console.log(questions);
    setPageType('questions');
  }, [setQuestions, setPageType, selectedSheets, filteredSheets, questionsAmount])

  const maxQuestionsAmount = selectedSheets.reduce((prev, curr) => prev + filteredSheets.data.find(i => i.id === curr).questions.length, 0)
  return (
    <div className={classes.container}>
      <UserInfoHeading  user={userForTesting}/>
      {error && 'Упс... Произошла ошибка. Невозможно загрузить список вопросов'}
      {loading && 'Загрузка...'}
      {filteredSheets && (
        <>
          <h4>Выбеоите категории вопросов</h4>
          {filteredSheets.data.map(sheet => (
            <Form.Field key={sheet.sheetName} className={classes.checkBox}>
              <Checkbox label={sheet.sheetName} name="sheet" checked={selectedSheets.includes(sheet.id)} value={sheet.id} onChange={handleCheckboxChange}/>
            </Form.Field>
          ))}
          <Form className={classes.amountForm}>
            <Form.Field>
              <label>Количество вопросов:</label>
              <Input className={classes.amountInput} placeholder='Количество задаваемых вопросов' min={0} max={maxQuestionsAmount} value={maxQuestionsAmount < questionsAmount ? maxQuestionsAmount : questionsAmount} onChange={handleQuestionsAmount} type="number" />
            </Form.Field>
          </Form>
          <br />
          <div className={classes.buttons}>
            <Button className={classes.backButton} primary size="medium" onClick={() => setPageType('home')}>Назад</Button>
            <Button primary size="medium" onClick={goNext} disabled={!maxQuestionsAmount || !questionsAmount}>Далее</Button>
          </div>
        </>
      )}
    </div>
  )
};

