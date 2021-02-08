import React, { useState, useCallback } from 'react';
import cx from 'classnames';
import classes from './QuestionsAccordion.module.scss'
import {Accordion, Checkbox, Form, Icon} from 'semantic-ui-react';

export const QuestionsAccordion = ({ questions }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const incorrectAnswers = questions.reduce((prev, curr) => {
    const correctAnswers = curr.answers.filter(({ isCorrect }) => isCorrect);
    const hasIncorrectAnswer = correctAnswers.some(({ id: correctAnswerId }) => !curr.answeredIds.includes(correctAnswerId));
    if (correctAnswers.length !== curr.answeredIds.length || hasIncorrectAnswer) {
      return [...prev, {
        question: curr.question,
        answers: curr.answers.map(answer => ({...answer, checked: curr.answeredIds.includes(answer.id)})),
      }];
    }
    return prev;
  }, [])

  const handleClick = useCallback((event, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }, [activeIndex, setActiveIndex])

  return (
    <div className={classes.container}>
      <Accordion fluid styled>
        {incorrectAnswers.map(({ question, answers }, index) => (
          <React.Fragment key={index}>
            <Accordion.Title
              active={activeIndex === index}
              index={index}
              onClick={handleClick}
            >
              <Icon name='dropdown' />
              {question}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === index}>
              <Form>
                {answers.map(({ id, answer, checked, isCorrect }) => (
                  <Form.Field key={id}>
                    <Checkbox label={answer} name="radioGroup" checked={checked} readOnly className={cx({
                      [classes.correctAnswer]: isCorrect,
                      [classes.incorrectAnswer]: !isCorrect
                    })} />
                  </Form.Field>
                ))}
              </Form>
            </Accordion.Content>
          </React.Fragment>
        ))}
      </Accordion>
    </div>
  )
};

