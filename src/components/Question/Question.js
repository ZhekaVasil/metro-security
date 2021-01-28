import React, { useCallback } from 'react';
import cx from 'classnames';
import classes from './Question.module.scss';
import { Header, Form, Radio } from 'semantic-ui-react';

export const Question = ({ questionId, setQuestions, questions, className }) => {
  const { question, answers, answeredId } = questions.find(({ id }) => id === questionId)

  const handleRadioChange = useCallback((event, { value }) => {
    const updatedQuestions = questions.map(item => {
      const updatedQuestion = {...item};
      if (item.id === questionId) {
        updatedQuestion.answeredId = value
      }
      return updatedQuestion;
    });

    setQuestions(updatedQuestions);
  }, [questions, setQuestions, questionId])

  return (
    <div className={cx(className, classes.container)}>
      <Header as="h3">{question}</Header>
      <Form>
        {answers.map(({ id, answer }) => (
          <Form.Field key={id}>
            <Radio label={answer} name="radioGroup" value={id} checked={id === answeredId} onChange={handleRadioChange} />
          </Form.Field>
        ))}
      </Form>
    </div>
  )
};

