import React from 'react';
import classes from './SuggestionsItem.module.scss'

export const SuggestionsItem = suggestion => {
  return (
    <div className={classes.container}>{suggestion.fullName}</div>
  )
};

