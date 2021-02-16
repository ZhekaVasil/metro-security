import React, { useCallback } from 'react';
import classes from './UserSelectionForTesting.module.scss';
import { Container } from '../Container';
import { UsersInput } from '../UsersInput';
import {Button, Form} from 'semantic-ui-react';

export const UserSelectionForTesting = ({ setPageType, setUserForTesting }) => {
  const onSuggestionSelected = useCallback((event, { suggestionValue }) => {
    setUserForTesting(suggestionValue);
    setPageType('questions');
  }, [setUserForTesting, setPageType]);
  return (
    <Container className={classes.container} >
      <div className={classes.innerContainer}>
        <Form>
          <Form.Field>
            <label>Работник:</label>
            <UsersInput onSuggestionSelected={onSuggestionSelected}/>
          </Form.Field>
        </Form>
        <Button className={classes.button} primary size="medium" onClick={() => setPageType('home')}>Назад</Button>
      </div>
    </Container>
  )
};

