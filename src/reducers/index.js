import {combineReducers} from 'redux';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
} from '../actions';

const isLoading = (state = false, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return true;
    case FETCH_USERS_FAILURE:
    case FETCH_USERS_SUCCESS:
      return false;
    default:
      return state;
  }
};

const isError = (state = false, action) => {
  switch (action.type) {
    case FETCH_USERS_FAILURE:
      return true;
    case FETCH_USERS_SUCCESS:
    case FETCH_USERS_REQUEST:
      return false;
    default:
      return state;
  }
};

const users = (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return action.results;
    default:
      return state;
  }
};

export default combineReducers({
  isLoading,
  isError,
  users,
});
