import React, { useState, useCallback } from 'react';
import classes from './QuestionsAccordion.module.scss'
import { Accordion, Icon } from 'semantic-ui-react';

export const QuestionsAccordion = ({ questions }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const incorrectAnswers = questions.reduce((prev, curr) => {
    const correctAnswer = curr.answers.find(({ isCorrect }) => isCorrect);
    const currentAnswer = curr.answers.find(({ id }) => id === curr.answeredId);
    if (curr.answeredId !== correctAnswer.id) {
      return [...prev, {
        question: curr.question,
        currentAnswer: currentAnswer.answer,
        correctAnswer: correctAnswer.answer,
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
        {incorrectAnswers.map(({ question, currentAnswer, correctAnswer }, index) => (
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
              <div className={classes.contentTitle}>Ваш ответ:</div>
              <p>
                <span className={classes.currentAnswer}>{currentAnswer}</span>
              </p>
              <div className={classes.contentTitle}>Правильный ответ:</div>
              <p>
                <span className={classes.correctAnswer}>{correctAnswer}</span>
              </p>
            </Accordion.Content>
          </React.Fragment>
        ))}
      </Accordion>
    </div>
  )
};

