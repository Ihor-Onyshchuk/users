import {getUsers, createUser, updateUser, deleteUser} from '../api';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = result => ({
  type: FETCH_USERS_SUCCESS,
  result,
});

export const fetchUsersFailure = () => ({
  type: FETCH_USERS_FAILURE,
});

export const fetchUsers = () => dispatch => {
  dispatch(fetchUsersRequest());
  getUsers()
    .then(response => dispatch(fetchUsersSuccess(response.data || [])))
    .catch(() => dispatch(fetchUsersFailure()));
};

export const createUserRequest = () => ({
  type: CREATE_USER_REQUEST,
});

export const createUserSuccess = user => ({
  type: CREATE_USER_SUCCESS,
  user,
});

export const createUserFailure = error => ({
  type: CREATE_USER_FAILURE,
  error,
});

export const addUser = user => dispatch => {
  dispatch(createUserRequest());
  createUser(user)
    .then(response => dispatch(createUserSuccess(response.data || [])))
    .catch(
      error =>
        error.response.status === 422 &&
        dispatch(createUserFailure(error.response.data.errors))
    );
};

export const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST,
});

export const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  user,
});

export const updateUserFailure = error => ({
  type: UPDATE_USER_FAILURE,
  error,
});

export const editUser = user => dispatch => {
  dispatch(updateUserRequest());
  updateUser(user)
    .then(response => dispatch(updateUserSuccess(response.data || [])))
    .catch(
      err => {
        let error;
        if (err.response.status === 422) error = err.response.data.errors
        else error = true
        dispatch(updateUserFailure(error))
      }
    );
};

export const deleteUserRequest = () => ({
  type: DELETE_USER_REQUEST,
});

export const deleteUserSuccess = userId => ({
  type: DELETE_USER_SUCCESS,
  userId,
});

export const deleteUserFailure = (error) => ({
  type: DELETE_USER_FAILURE,
  error
});

export const removeUser = userId => dispatch => {
  dispatch(deleteUserRequest());
  deleteUser(userId)
    .then(() => dispatch(deleteUserSuccess(userId)))
    .catch(() => dispatch(deleteUserFailure({error: true})));
};

export const modalOpen = (name, user) => ({
  type: OPEN_MODAL,
  name,
  user,
});

export const modalClose = (name, user) => ({
  type: CLOSE_MODAL,
  name,
  user,
});
