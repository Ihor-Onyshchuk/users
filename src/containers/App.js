import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import T from 'prop-types';

import {fetchUsers, modalOpen} from '../actions';
import AppHeader from '../components/appHeader/AppHeader';
import UserList from '../components/userList/UserList';
import DeleteModal from './DeleteModal';
import CreateModal from './CreateModal';

class App extends PureComponent {
  componentDidMount() {
    this.props.onFetchUsers();
  }

  render() {
    const {users, usersSettings, onModalOpen} = this.props;

    return (
      <>
        <AppHeader onModalOpen={onModalOpen} />
        <UserList
          users={users}
          settings={usersSettings}
          onModalOpen={onModalOpen}
        />
        <CreateModal />
        <DeleteModal />
      </>
    );
  }
}

App.propTypes = {
  onFetchUsers: T.func.isRequired,
  onModalOpen: T.func.isRequired,
  users: T.array.isRequired,
  usersSettings: T.object.isRequired,
};

const mapStateToProps = ({users, usersSettings}) => ({
  users,
  usersSettings
});

const mapDispatchToProps = dispatch => ({
  onFetchUsers: () => dispatch(fetchUsers()),
  onModalOpen: (modalName, user) => dispatch(modalOpen(modalName, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
