import React from 'react';
import T from 'prop-types';

const AppHeader = ({onModalOpen}) => (
  <header className="border-bottom">
    <div className="container">
      <div className="row row-cols-2 align-items-center py-3">
        <div className="col">
          <h1>Users</h1>
        </div>
        <div className="col text-right">
          <button
            className="btn btn-primary"
            onClick={() => onModalOpen('create', null)}
          >
            Create User
          </button>
        </div>
      </div>
    </div>
  </header>
);

AppHeader.propTypes = {
  onModalOpen: T.func.isRequired,
};

export default AppHeader;
