import React from 'react';
import classes from './AnswerHistory.module.scss'
import {QuestionsAccordion} from '../QuestionsAccordion';
import {Icon} from 'semantic-ui-react';
import cx from 'classnames';

export const AnswerHistory = ({date, activity, className}) => {
  const hasActivity = activity.length;
  return (
    <div className={cx(classes.container, className)}>
      <div className={classes.dateContainer}>
        <span className={classes.date}>
          {new Date(date).toLocaleString()}
        </span>
        <span>
          {
            hasActivity ?
              <Icon className={classes.closeIcon} name="close"/> :
              <Icon className={classes.checkIcon} name="check circle"/>
          }
        </span>
      </div>
      {!!hasActivity && <QuestionsAccordion answers={activity}/>}
    </div>
  )
};

