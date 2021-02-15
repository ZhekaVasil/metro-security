import React, { useCallback } from 'react';
import classes from './Users.module.scss';
import {UsersInput} from '../UsersInput';
import useFetch from 'use-http';
import {getApiUrl} from '../../utils/apiUtils';
import {QuestionsAccordion} from '../QuestionsAccordion';


export const Users = ({ setPageType }) => {
  const {get, response, loading, error} = useFetch(getApiUrl('answers'));

  const onSuggestionSelected = useCallback((event, { suggestionValue }) => {
    get(suggestionValue.id);
  }, [get]);

  const answers = (response.data && response.data.data) || [];
  const reversedAnswers = [...answers].reverse();
  return (
    <div className={classes.container}>
      <UsersInput onSuggestionSelected={onSuggestionSelected} />
      {error && 'Упс... Произошла ошибка. Невозможно загрузить список ответов'}
      {loading && 'Загрузка...'}
      {!!reversedAnswers.length && reversedAnswers.map((answer, index) => (
        <>
          <br />
          <div>{new Date(answer.date).toLocaleString()}</div>
          <QuestionsAccordion key={index} answers={answer.activity} />
          <br />
        </>
      ))}
    </div>
  )
};


