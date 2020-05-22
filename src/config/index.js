export const modal = {
  create: false,
  delete: false,
};

export const settings = {
  loading: false,
  error: false,
};

export const initialState = {
  users: [],
  usersSettings: settings,
  currentUser: null,
  modal,
  modalSettings: settings,
};

export const defaultUser = {
  name: '',
  surname: '',
  desc: '',
};

export const errorsList = {
  the_name_field_is_required: 'The name field is required',
  the_surname_field_is_required: 'The surname field is required',
  the_desc_field_is_required: 'The desc field is required',
};

export const pagination = {
  perPage: 2,
  rangePage: 3,
};
