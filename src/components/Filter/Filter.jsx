import PropTypes from 'prop-types';
import React from 'react';
import css from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { changeFilterAction } from 'redux/filter/filterSlice';
import TextField from '@mui/material/TextField';

export const Filter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = evt => {
    return dispatch(changeFilterAction(evt.currentTarget.value));
  };

  return (
    <div className={css.div}>
      <h3 className={css.p}> Find contacts by name</h3>

      <TextField
        margin="normal"
        onChange={handleFilterChange}
        size="small"
        label="filter"
        name="filter"
        autoComplete="none"
        type="text"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  filterChange: PropTypes.func,
};
