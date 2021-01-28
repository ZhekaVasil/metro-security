import React from 'react';
import classes from './Container.module.scss';
import cx from 'classnames';

export const Container = ({ className, children }) => {
  return (
    <div className={cx(classes.container, className)}>
      {children}
    </div>
  )
};

