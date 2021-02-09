import React from 'react';
import classes from './SuggestionsContainer.module.scss'

export const SuggestionsContainer = ({ containerProps, children, query }) => {
  return (
    <div {...containerProps} className={classes.container}>
      {children}
    </div>
  )
};

