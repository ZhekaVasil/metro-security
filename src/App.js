import React, { useState } from 'react';
import classes from './App.module.scss';
import { LoadFile } from './components/LoadFIle';
import { Questions } from './components/Questions';
import { Result } from './components/Result';

export const App = () => {
  const [pageType, setPageType] = useState('load')
  const [questions, setQuestions] = useState([]);
  let page = null;
  switch (pageType) {
    case 'load': {
      page = <LoadFile setQuestions={setQuestions} setPageType={setPageType} />;
      break;
    }

    case 'questions': {
      page = <Questions questions={questions} setQuestions={setQuestions} setPageType={setPageType}/>;
      break;
    }

    case 'result': {
      page = <Result questions={questions} />;
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




