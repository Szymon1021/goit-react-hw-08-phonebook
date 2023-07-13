import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/contactsSlice';
import { filterReducer } from './filter/filterSlice';
import { authReducer } from './auth/slice';
import PropTypes from 'prop-types';

const propTypes = {
  reducer: PropTypes.shape({
    contacts: PropTypes.func.isRequired,
    filter: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired,
  }).isRequired,
};

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
    auth: authReducer,
  },
});

store.propTypes = propTypes;
