import React from 'react';
import classes from './Users.module.scss';
import {UsersInput} from '../UsersInput';


export const Users = ({ setPageType }) => {
  return (
    <div className={classes.container}>
      <UsersInput />
    </div>
  )
};


