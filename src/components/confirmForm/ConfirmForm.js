import React from 'react';
import T from 'prop-types';

import ErrorMessage from '../common/errorMessage/ErrorMessage';
import loadingIndicator from '../../assets/load-indicator.gif';

const ConfirmForm = ({
  user,
  onModalClose,
  onUserDelete,
  settings: {loading, error},
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    onUserDelete(user.id);
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      <h5>
        Are you sure want to delete{' '}
        <strong>
          {user.name} {user.surname}
        </strong>{' '}
        form the list?
      </h5>
      <div className="btn-wrapper position-relative">
        <button
          className="btn btn btn-outline-secondary"
          type="button"
          onClick={() => onModalClose()}
        >
          Cancel
        </button>
        <button
          className="btn btn-outline-danger ml-2"
          type="submit"
          disabled={loading}
        >
          Confirm
        </button>{' '}
        {loading && (
          <div className="d-inline-block">
            <img src={loadingIndicator} />
          </div>
        )}
      </div>
      {error && <ErrorMessage />}
    </form>
  );
};

ConfirmForm.propTypes = {
  user: T.object,
  settings: T.object.isRequired,
  onModalClose: T.func.isRequired,
  onUserDelete: T.func.isRequired,
};

export default ConfirmForm;
