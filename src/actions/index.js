import {getUsers} from '../api';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

export const fetchUsersFailure = () => {
  return {
    type: FETCH_USERS_FAILURE,
  };
};

export const fetchUsersSuccess = results => {
  return {
    type: FETCH_USERS_SUCCESS,
    results,
  };
};

export const fetchUsers = () => dispatch => {
  dispatch(fetchUsersRequest());
  getUsers()
    .then(response => dispatch(fetchUsersSuccess(response.data || [])))
    .catch(() => dispatch(fetchUsersFailure()));
};
