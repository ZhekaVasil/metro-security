import React, { useCallback, useState, useEffect } from 'react';
import classes from './UsersInput.module.scss'
import useFetch from 'use-http';
import {getApiUrl} from '../../utils/apiUtils';
import {Input} from 'semantic-ui-react';
import Autosuggest from 'react-autosuggest';
import { SuggestionsContainer } from './components/SuggestionsContainer';
import { SuggestionsItem } from './components/SuggestionsItem';

export const UsersInput = ({ onSuggestionSelected }) => {
  const { loading, error, data: users } = useFetch(getApiUrl('users'), {cachePolicy: 'no-cache'}, []);
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (users) {
      setSuggestions(users.data);
    }
  }, [users])

  const onSuggestionsFetchRequested = useCallback(({ value }) => {
    if (value && value.length) {
      const filteredSuggestions = users.data.filter(user => user.fullName.toLowerCase().includes(value.trim().toLowerCase()));
      setSuggestions(filteredSuggestions);
    }
  }, [users]);

  const onSuggestionsClearRequested = useCallback(() => {
    setSuggestions([]);
  }, [])

  const getSuggestionValue = useCallback(suggestion => suggestion, []);

  const onChange = useCallback((event, { newValue }) => {
    if (newValue.fullName) {
      setValue(newValue.fullName)
    } else {
      setValue(newValue)
    }
  }, []);

  const renderInputComponent = useCallback(inputProps => <Input {...inputProps} />, []);

  const inputProps = {
    value,
    onChange
  };

  return (
    <div className={classes.container}>
      {error && 'Упс... Произошла ошибка. Невозможно загрузить список работников'}
      {loading && 'Загрузка...'}
      {!error && !loading && users && (
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={SuggestionsItem}
          inputProps={inputProps}
          renderInputComponent={renderInputComponent}
          onSuggestionSelected={onSuggestionSelected}
          renderSuggestionsContainer={SuggestionsContainer}
        />
      )}
    </div>
  )
};

