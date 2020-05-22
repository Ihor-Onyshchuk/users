import React from 'react';
import T from 'prop-types';

import ErrorMessage from '../common/errorMessage/ErrorMessage'

const ConfirmForm = ({user, onModalClose, onUserDelete, settings: {loading, error} }) => {
  const handleSubmit = e => {
    e.preventDefault();
    onUserDelete(user.id)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div> Are you sure {user.name} {user.surname}? </div>
      <div>
        <button className="btn btn-light"  type="button" onClick={() => onModalClose()}>Cancel</button>
        <button className="btn btn-danger" type="submit" disabled={loading}>Confirm</button> {loading && 'Loading...'}
      </div>
      {error && <ErrorMessage />}
    </form>
  )
}

ConfirmForm.propTypes = {
  user: T.object,
  settings: T.object.isRequired,
  onModalClose: T.func.isRequired,
  onUserDelete: T.func.isRequired,
}

export default ConfirmForm;
