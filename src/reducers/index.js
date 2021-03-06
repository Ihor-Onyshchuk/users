import {combineReducers} from 'redux';
import {modal as defaultModal, settings} from '../config';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../actions';

const updateUsers = (users, user) => {
  const itemIndex = users.findIndex(({id}) => id === user.id);
  return [...users.slice(0, itemIndex), user, ...users.slice(itemIndex + 1)];
};

const users = (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return action.result;
    case CREATE_USER_SUCCESS:
      return [action.user, ...state];
    case UPDATE_USER_SUCCESS:
      return updateUsers(state, action.user);
    case DELETE_USER_SUCCESS:
      return state.filter(({id}) => id !== action.userId);
    default:
      return state;
  }
};

const usersSettings = (state = settings, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {loading: true, error: false};
    case FETCH_USERS_FAILURE:
      return {loading: false, error: true};
    case FETCH_USERS_SUCCESS:
      return {loading: false, error: false};
    default:
      return state;
  }
};

const currentUser = (state = {}, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return action.user;
    case CLOSE_MODAL:
      return {};
    default:
      return state;
  }
};

const modal = (state = defaultModal, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {...state, [action.name]: true};
    case CLOSE_MODAL:
      return {...state, [action.name]: false};
    case DELETE_USER_SUCCESS:
      return {...state, delete: false};
    case CREATE_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {...state, create: false};
    default:
      return state;
  }
};

const modalSettings = (state = settings, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {loading: true, error: false};
    case CLOSE_MODAL:
    case CREATE_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
    case DELETE_USER_SUCCESS:
      return {loading: false, error: false};
    case CREATE_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
      return {loading: false, error: action.error};
    default:
      return state;
  }
};

export default combineReducers({
  users,
  usersSettings,
  currentUser,
  modal,
  modalSettings,
});
