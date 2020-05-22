import React, {PureComponent} from 'react';

import ErrorMessage from '../common/errorMessage/ErrorMessage';
import loadingIndicator from '../../assets/load-indicator.gif';
import {defaultUser, errorsList} from '../../config';

class ManageForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user || defaultUser,
      errors: props.settings.errors || false,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      settings: {error},
    } = this.props;
    if (error && error !== prevProps.settings.error) {
      this.setState({errors: error});
    }
  }

  handleInputChange = event => {
    const {
      target: {value, name},
    } = event;
    const {errors, user} = this.state;

    this.setState({
      user: {
        ...user,
        [name]: value,
      },
      errors: errors ? {...errors, [name]: ''} : null,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {isEdit, onUserEdit, onUserCreate} = this.props;
    const {user} = this.state;

    isEdit ? onUserEdit({...user, id: this.props.user.id}) : onUserCreate(user);
  };

  render() {
    const {
      isEdit,
      settings: {loading},
    } = this.props;
    const {
      user: {name, surname, desc},
      errors,
    } = this.state;
    const commonError = typeof errors === 'boolean';

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={name}
            onChange={this.handleInputChange}
          />
          {!commonError && errors?.name && (
            <ErrorMessage message={errorsList[errors.name[0]]} />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            name="surname"
            className="form-control"
            id="surname"
            value={surname}
            onChange={this.handleInputChange}
          />
          {!commonError && errors?.surname && (
            <ErrorMessage message={errorsList[errors.surname[0]]} />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="name">Description</label>
          <textarea
            className="form-control"
            name="desc"
            id="description"
            value={desc}
            onChange={this.handleInputChange}
          />
          {!commonError && errors?.desc && (
            <ErrorMessage message={errorsList[errors.desc[0]]} />
          )}
        </div>
        {commonError && errors && <ErrorMessage />}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {isEdit ? 'Edit' : 'Create'}
        </button>{' '}
        {loading && (
          <div className="d-inline-block">
            <img src={loadingIndicator} />
          </div>
        )}
      </form>
    );
  }
}

export default ManageForm;
