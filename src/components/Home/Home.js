import React from 'react';
import classes from './Home.module.scss'
import {Button} from 'semantic-ui-react';
import {Container} from '../Container';

export const Home = ({ setPageType }) => {
  return (
    <Container className={classes.container}>
      <div className={classes.innerContainer}>
        <Button className={classes.adminButton} primary size="big" onClick={() => setPageType('admin-login')}>Администрирование</Button>
        <Button primary size="big" onClick={() => setPageType('user-selection-for-testing')}>Тестирование</Button>
      </div>
    </Container>
  )
};

