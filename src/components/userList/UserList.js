import React, {PureComponent} from 'react';
import T from 'prop-types';
import Pagination from 'react-js-pagination';

import ErrorMessage from '../common/errorMessage/ErrorMessage';
import {pagination} from '../../config';

class UserList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1,
      allUsers: props.users || [],
      users: (props.users || []).slice(0, 5),
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.users.length !== prevProps.users.length) {
      this.setState({
        allUsers: this.props.users,
        users: this.getUserChunk(this.props.users),
      });
    }
    console.log('didUpdate');
  }

  getUserChunk = (users, page = 1) => {
    const offset = page - 1;
    return users.slice(offset * pagination.perPage, page * pagination.perPage);
  };

  handlePageChange = page => {
    this.setState({
      activePage: page,
      users: this.getUserChunk(this.state.allUsers, page),
    });
  };

  render() {
    const {activePage, users, allUsers} = this.state;
    const {
      onModalOpen,
      settings: {loading, error},
    } = this.props;

    return (
      <div className="container pt-5">
        <div className="row row-cols-1">
          <div className="col">
            {loading && 'Loading ...'}
            {!loading && error && <ErrorMessage />}
            {!loading && !users.length && 'No users, create a new one'}
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
            {allUsers.length > pagination.perPage && (
              <Pagination
                activePage={activePage}
                itemsCountPerPage={pagination.perPage}
                totalItemsCount={allUsers.length}
                pageRangeDisplayed={pagination.rangePage}
                onChange={this.handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

UserList.propTypes = {
  users: T.arrayOf(T.object).isRequired,
  settings: T.object.isRequired,
  onModalOpen: T.func.isRequired,
};

export default UserList;
