import React, { useState, useCallback } from 'react';
import cx from 'classnames';
import classes from './QuestionsAccordion.module.scss'
import {Accordion, Checkbox, Form, Icon} from 'semantic-ui-react';
import Parser from 'html-react-parser';

export const QuestionsAccordion = ({ answers }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = useCallback((event, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }, [activeIndex, setActiveIndex])

  return (
    <div className={classes.container}>
      <Accordion fluid styled>
        {answers.map(({ question, answers }, index) => (
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
                    <Checkbox label={Parser(answer)} name="radioGroup" checked={checked} readOnly className={cx({
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

