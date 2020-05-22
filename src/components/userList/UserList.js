import React, {PureComponent} from 'react';
import T from 'prop-types';
import Pagination from 'react-js-pagination';

import ErrorMessage from '../common/errorMessage/ErrorMessage';
import loadingIndicator from '../../assets/load-indicator-md.gif';
import {pagination} from '../../config';
import avatarSrc from '../../assets/img/user.png';
import './UserList.scss';

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
            {!loading && error && <ErrorMessage />}
            {!loading && !users.length && 'No users, create a new one'}
            {users.map(user => (
              <div key={user.id} className="card user-card">
                <div className="row">
                  <div className="d-flex justify-content-center col-3">
                    <img
                      src={avatarSrc}
                      className="card-img"
                      alt="user avatar"
                    />
                  </div>
                  <div className="col-9">
                    <div className="card-body p-0">
                      <h5 className="card-title">
                        {user.name} {user.surname}
                      </h5>
                      <p className="card-text">{user.desc}</p>
                      <button
                        className="btn btn btn-outline-danger"
                        onClick={() => onModalOpen('delete', user)}
                      >
                        <i className="far fa-trash-alt" />
                      </button>
                      <button
                        className="btn btn-outline-warning ml-2"
                        onClick={() => onModalOpen('create', user)}
                      >
                        <i className="fas fa-pencil-alt" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {allUsers.length > pagination.perPage && (
              <div className="d-flex justify-content-center">
                <Pagination
                  itemClass="page-item"
                  linkClass="page-link"
                  activePage={activePage}
                  itemsCountPerPage={pagination.perPage}
                  totalItemsCount={allUsers.length}
                  pageRangeDisplayed={pagination.rangePage}
                  onChange={this.handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
        {loading && (
          <div className="d-inline-block load-indicator">
            <img className="load-img" src={loadingIndicator} />
            <div className="load-bg"></div>
          </div>
        )}
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
