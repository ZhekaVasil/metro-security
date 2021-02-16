import React, { useCallback, useState } from 'react';
import classes from './Management.module.scss';
import {UsersInput} from '../UsersInput';
import useFetch from 'use-http';
import {getApiUrl} from '../../utils/apiUtils';
import {Button, Form} from 'semantic-ui-react';
import { AnswerHistory } from '../AnswerHistory';


export const Management = ({ setPageType }) => {
  const {get, response, loading, error} = useFetch(getApiUrl('answers'));
  const [selectedUser, setSelectedUser] = useState(null);

  const onSuggestionSelected = useCallback((event, { suggestionValue }) => {
    get(suggestionValue.id);
    setSelectedUser(suggestionValue);
  }, [get]);

  const answers = (response.data && response.data.data) || [];
  const reversedAnswers = [...answers].reverse();
  return (
    <div className={classes.container}>
      <Form className={classes.form}>
        <Form.Field>
          <label>Выберете работника</label>
          <UsersInput onSuggestionSelected={onSuggestionSelected} />
        </Form.Field>
      </Form>
      {error && 'Упс... Произошла ошибка. Невозможно загрузить список ответов'}
      {loading && 'Загрузка...'}
      {selectedUser && (
        <div className={classes.userContainer}>
          <h3 className={classes.userFullName}>{selectedUser.fullName}</h3>
          <h4 className={classes.userPosition}>{selectedUser.position}</h4>
        </div>
      )}
      {!!reversedAnswers.length && reversedAnswers.map((answer, index) =>
        <AnswerHistory key={index} activity={answer.activity} date={answer.date} className={classes.answerHistory} />
      )}
      <Button primary size="medium" onClick={() => setPageType('home')}>Назад</Button>
    </div>
  )
};


