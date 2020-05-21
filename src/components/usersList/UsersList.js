import React from 'react';
import {connect} from 'react-redux';
import T from 'prop-types';
import {modalOpen} from '../../actions';

const UsersList = ({onModalOpen, users}) => (
  <div>
    <h2>Users List</h2>
    {users.map(user => (
      <ul key={user.id}>
        <li>
          <div>Name: {user.name}</div>
          <div>Surname: {user.surname}</div>
          <div>Description: {user.desc}</div>
          <i
            className="far fa-trash-alt"
            onClick={() => onModalOpen('delete', user)}
          />
          <i
            className="fas fa-pencil-alt"
            onClick={() => onModalOpen('create', user)}
          />
        </li>
      </ul>
    ))}
  </div>
);

UsersList.propTypes = {
  users: T.array.isRequired,
  onModalOpen: T.func.isRequired,
};

const mapStateToProps = ({users}) => ({
  users,
});

const mapDispatchToProps = dispatch => ({
  onModalOpen: (modalName, user) => dispatch(modalOpen(modalName, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
