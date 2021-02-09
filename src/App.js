import React, { useState } from 'react';
import classes from './App.module.scss';
import { LoadFile } from './components/LoadFIle';
import { Questions } from './components/Questions';
import { Result } from './components/Result';
import { Home } from './components/Home';
import { Users } from './components/Users';
import { Admin } from './components/Admin/Admin';
import { UserSelectionForTesting } from './components/UserSelectionForTesting';

export const App = () => {
  const [pageType, setPageType] = useState('home')
  const [questions, setQuestions] = useState([]);
  const [userForTesting, setUserForTesting] = useState('');
  let page = null;
  switch (pageType) {
    case 'home': {
      page = <Home setPageType={setPageType} />;
      break;
    }

    case 'admin-login': {
      page = <Admin setPageType={setPageType} />;
      break;
    }

    case 'admin-management': {
      page = <Users setPageType={setPageType} />;
      break;
    }

    case 'load': {
      page = <LoadFile setQuestions={setQuestions} setPageType={setPageType} />;
      break;
    }

    case 'questions': {
      page = <Questions userForTesting={userForTesting} questions={questions} setQuestions={setQuestions} setPageType={setPageType}/>;
      break;
    }

    case 'user-selection-for-testing': {
      page = <UserSelectionForTesting setPageType={setPageType} setUserForTesting={setUserForTesting} />;
      break;
    }

    case 'result': {
      page = <Result questions={questions} userForTesting={userForTesting} />;
      break;
    }

    default: {
      page = 'Упс... Произошла ошибка =(';
    }
  }
  return (
    <div className={classes.container}>
      {page}
    </div>
  )
};




