import React from 'react';
import cx from 'classnames';
import classes from './Result.module.scss'
import { Container } from '../Container';
import { Icon, Header } from 'semantic-ui-react';
import { QuestionsAccordion } from '../QuestionsAccordion';

export const Result = ({ questions }) => {
  const incorrectAnswersCount = questions.reduce((prev, curr) => {
    const correctAnswers = curr.answers.filter(({ isCorrect }) => isCorrect);
    const hasIncorrectAnswer = correctAnswers.some(({ id: correctAnswerId }) => !curr.answeredIds.includes(correctAnswerId))
    if (correctAnswers.length !== curr.answeredIds.length || hasIncorrectAnswer) {
      return prev + 1;
    }
    return prev;
  }, 0)

  return (
    <Container className={classes.container}>
      {incorrectAnswersCount ? (
        <>
          <div className={cx(classes.iconContainer, classes.incorrectIconContainer)}>
            <Icon name="cancel" size="massive" className={cx(classes.icon, classes.cancelIcon)} />
            <Header as="h3" className={classes.description}>
              Количество неправельных ответов: <span className={classes.incorrectCount}>{incorrectAnswersCount}</span>
            </Header>
          </div>
          {<QuestionsAccordion questions={questions} />}
        </>
      ) : (
        <div className={classes.iconContainer}>
          <Icon name="check" size="massive" className={cx(classes.icon, classes.checkIcon)} />
          <Header as="h3" className={classes.description}>Все вопросы отвечены правильно</Header>
        </div>
      )}
    </Container>
  )
};

