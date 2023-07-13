import axios from 'axios';
import Notiflix from 'notiflix';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/signup', credentials);
      // After successful registration, add the token to the HTTP header
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      Notiflix.Notify.warning(
        `Something went wrong, check your register data and try again`
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/login', credentials);
      // After successful login, add the token to the HTTP header
      setAuthHeader(res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      Notiflix.Notify.success(`Hello`);
      return res.data;
    } catch (error) {
      Notiflix.Notify.warning(`Something went wrong, try again`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/logout
 * cheaders: Authorization: Bearer token
 */
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    clearAuthHeader();
  } catch (error) {
    Notiflix.Notify.error(`Something went wrong`);

    return thunkAPI.rejectWithValue(error.message);
  }
});
