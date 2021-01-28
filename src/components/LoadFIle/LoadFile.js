import React, { useRef, useCallback } from 'react';
import classes from './LoadFile.module.scss';
import { Button, Header } from 'semantic-ui-react';
import Papa from 'papaparse';
import { generateHash } from '../../utils';
import { Container } from '../Container';

export const LoadFile = ({ setQuestions, setPageType }) => {
  const inputRef = useRef();
  const handleFileSelect = useCallback((event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: results => {
        const parsedResult = results.data.map((item, index) => {
          return {
            id: index + 1,
            question: item.question,
            answers: Object.entries(item).reduce((prev, curr) => {
              if (curr[0] && curr[0] !== 'question' && curr[1]) {
                return prev.concat({ id: generateHash(curr[1].toString()), answer:curr[1], isCorrect: Number(curr[0]) === 1 })
              }
              return prev;
            }, [])
          }
        }).filter(item => item.question)
        setQuestions(parsedResult);
        setPageType('questions');
      }
    })
  }, [setQuestions, setPageType])
  return (
    <Container className={classes.container}>
      <div className={classes.innerContainer}>
        <Header as="h3">Загрузите вопросы</Header>
        <input type="file" ref={inputRef} className={classes.fileInput} onChange={handleFileSelect} />
        <Button primary onClick={() => inputRef.current.click()}>Загрузить</Button>
      </div>
    </Container>
  )
};

