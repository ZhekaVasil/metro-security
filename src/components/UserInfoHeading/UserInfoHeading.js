import React from 'react';
import classes from './UserInfoHeading.module.scss'

export const UserInfoHeading = ({ user }) => {
  return (
    <div className={classes.container}>
      <h3 className={classes.fullName}>{user.fullName}</h3>
      <h4 className={classes.position}>{user.position}</h4>
    </div>
  )
};

