import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers/index';
import thunk from 'redux-thunk';
import {initialState} from '../config';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  const {logger} = require('redux-logger');
  middlewares.push(logger);
}

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middlewares)
);
