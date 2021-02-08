import React, { useCallback } from 'react';
import cx from 'classnames';
import classes from './Question.module.scss';
import { Header, Form, Checkbox } from 'semantic-ui-react';

export const Question = ({ questionId, setQuestions, questions, className }) => {
  const { question, answers, answeredIds } = questions.find(({ id }) => id === questionId)
  const handleCheckboxChange = useCallback((event, { value, checked }) => {
    const updatedQuestions = questions.map(item => {
      const updatedQuestion = {...item};
      if (item.id === questionId) {
        if (checked) {
          updatedQuestion.answeredIds = [...new Set([...updatedQuestion.answeredIds, value])]
        } else {
          updatedQuestion.answeredIds = updatedQuestion.answeredIds.filter(i => i !== value)
        }
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
            <Checkbox label={answer} name="radioGroup" value={id} checked={answeredIds.includes(id)} onChange={handleCheckboxChange} />
          </Form.Field>
        ))}
      </Form>
    </div>
  )
};

