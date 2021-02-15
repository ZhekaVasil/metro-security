import React, { useEffect } from 'react';
import cx from 'classnames';
import classes from './Result.module.scss'
import { Container } from '../Container';
import { Icon, Header } from 'semantic-ui-react';
import { QuestionsAccordion } from '../QuestionsAccordion';
import useFetch from 'use-http';
import {getApiUrl} from '../../utils/apiUtils';

export const Result = ({ questions, userForTesting }) => {
  const {post, response, loading, error} = useFetch(getApiUrl('answers'));

  const incorrectAnswersCount = questions.reduce((prev, curr) => {
    const correctAnswers = curr.answers.filter(({ isCorrect }) => isCorrect);
    const hasIncorrectAnswer = correctAnswers.some(({ id: correctAnswerId }) => !curr.answeredIds.includes(correctAnswerId))
    if (correctAnswers.length !== curr.answeredIds.length || hasIncorrectAnswer) {
      return prev + 1;
    }
    return prev;
  }, 0)

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
  }, []);

  useEffect(() => {
    post({
      userId: userForTesting.id,
      activity: incorrectAnswers,
    })
  }, [])

  return (
    <div className={classes.container}>
      <h3 className={classes.head}>Работник: {userForTesting.fullName}</h3>
      <Container className={classes.containerInner}>
        {incorrectAnswersCount ? (
          <>
            <div className={cx(classes.iconContainer, classes.incorrectIconContainer)}>
              <Icon name="cancel" size="massive" className={cx(classes.icon, classes.cancelIcon)} />
              <Header as="h3" className={classes.description}>
                Количество неправельных ответов: <span className={classes.incorrectCount}>{incorrectAnswersCount}</span>
              </Header>
            </div>
            {<QuestionsAccordion answers={incorrectAnswers} />}
          </>
        ) : (
          <div className={classes.iconContainer}>
            <Icon name="check" size="massive" className={cx(classes.icon, classes.checkIcon)} />
            <Header as="h3" className={classes.description}>Все вопросы отвечены правильно</Header>
          </div>
        )}
      </Container>
    </div>
  )
};

