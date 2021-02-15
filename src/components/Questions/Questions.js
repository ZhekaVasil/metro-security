import React, { useState, useCallback } from 'react';
import classes from './Questions.module.scss';
import { Button, Icon } from 'semantic-ui-react';
import { Question } from '../Question';
import { Container } from '../Container';

export const Questions = ({ setPageType, questions, setQuestions, userForTesting }) => {
  const [currentQuestionId, setCurrentQuestionId] = useState(questions[0].id);
  const isLastQuestion = currentQuestionId === [...questions].reverse()[0].id;
  const isFirstQuestion = currentQuestionId === questions[0].id;
  const isAnswered = questions.find(({ id }) => id === currentQuestionId).answeredIds.length;

  const goBack = useCallback(() => {
    const index = questions.findIndex(({ id }) => id === currentQuestionId);
    setCurrentQuestionId(questions[index - 1].id)
  }, [currentQuestionId, setCurrentQuestionId, questions]);

  const goNext = useCallback(() => {
    if (isLastQuestion) {
      setPageType('result')
    } else {
      const index = questions.findIndex(({ id }) => id === currentQuestionId);
      setCurrentQuestionId(questions[index + 1].id)

    }
  }, [isLastQuestion, setPageType, currentQuestionId, setCurrentQuestionId, questions]);
  return (
    <div className={classes.container}>
      <h3 className={classes.head}>Работник: {userForTesting.fullName}</h3>
      <Container className={classes.containerInner}>
        <Question questionId={currentQuestionId} setQuestions={setQuestions} questions={questions} className={classes.question} />
        <div className={classes.buttons}>
          <div>
            {!isFirstQuestion && (
              <Button icon labelPosition='left' disabled={currentQuestionId === questions[0].id} onClick={goBack}>
                <Icon name="left arrow" />
                Предыдущий вопрос
              </Button>
            )}
          </div>
          <div>
            <Button icon labelPosition='right' onClick={goNext} disabled={!isAnswered}>
              {isLastQuestion ? 'Результат' : 'Следующий вопрос'}
              <Icon name="right arrow" />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
};

