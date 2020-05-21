import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import T from 'prop-types';
import {fetchUsers, modalOpen, addUser, editUser, removeUser} from './actions';
import UsersList from './components/usersList/UsersList';
import Modal from './components/modal/Modal';
import Form from './components/Form/Form';
import ModalDelete from './components/modalDelete/ModalDelete';
import CreateModal from './components/createModal/CreateModal';

class App extends PureComponent {
  state = {
    createModal: false,
    deleteModal: false,
    currentUser: undefined,
  };

  componentDidMount() {
    this.props.onFetchUsers();
  }

  updateCurrentUser = currentUser => {
    this.setState({currentUser});
  };

  toggleModal = (modalType, isOpen) => {
    this.setState({[`${modalType}Modal`]: isOpen});
  };

  handleModalClose = modalType => {
    this.updateCurrentUser();
    this.toggleModal(modalType, false);
  };

  render() {
    const {currentUser, createModal, deleteModal} = this.state;
    const {onUserDelete, onUserEdit, onUserCreate, onModalOpen} = this.props;
    return (
      <div className="container">
        <button onClick={() => onModalOpen('create')}>Create User</button>
        <UsersList />
        <CreateModal />
        <ModalDelete />
      </div>
    );
  }
}

App.propTypes = {
  onFetchUsers: T.func.isRequired,
  users: T.array.isRequired,
  loading: T.bool,
  error: T.bool,
};

const mapStateToProps = ({users, loading, error}) => ({
  users,
  loading,
  error,
});

const mapDispatchToProps = dispatch => ({
  onFetchUsers: () => dispatch(fetchUsers()),
  onModalOpen: modalName => dispatch(modalOpen(modalName, {})),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
