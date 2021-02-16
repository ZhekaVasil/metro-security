import React, { useCallback } from 'react';
import classes from './Admin.module.scss';
import { Container } from '../Container';
import {ADMIN_PASS} from '../../constants/common';
import {Button, Form} from 'semantic-ui-react';

export const Admin = ({ setPageType }) => {
  const onChange = useCallback(event => {
    if (event.currentTarget.value === ADMIN_PASS) {
      setPageType('admin-management')
    }
  }, [setPageType])

  return (
    <Container className={classes.container}>
      <div className={classes.innerContainer}>
        <Form>
          <Form.Field>
            <label>Введите пароль</label>
            <input placeholder='Пароль' onChange={onChange} />
          </Form.Field>
        </Form>
        <Button className={classes.button} primary size="medium" onClick={() => setPageType('home')}>Назад</Button>
      </div>
    </Container>
  )
};

