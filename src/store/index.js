import {createStore, applyMiddleware} from 'redux';
import {logger} from 'redux-logger';
import reducers from '../reducers/index';
import thunk from 'redux-thunk';

const initialState = {
  isLoading: false,
  isError: false,
  users: [],
};

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk, logger)
);
