import React from 'react';
import {connect} from 'react-redux';
import T from 'prop-types';
import {removeUser, modalClose} from '../../actions';
import Modal from '../modal/Modal';

const ModalDelete = ({isModalOpen, user, onUserDelete, onModalClose}) => {
  return (
    <Modal onClose={onModalClose} isOpen={isModalOpen}>
      <>
        <div>
          Are you sure {user.name} {user.surname}?
        </div>
        <div>
          <button onClick={() => onModalClose()}>Cancel</button>
          <button onClick={() => onUserDelete(user.id)}>Confirm</button>
        </div>
      </>
    </Modal>
  );
};

ModalDelete.propTypes = {
  onModalClose: T.func.isRequired,
  onUserDelete: T.func.isRequired,
  user: T.object.isRequired,
  isModalOpen: T.bool.isRequired,
};

const mapStateToProps = ({currentUser, modal}) => ({
  user: currentUser,
  isModalOpen: modal.delete,
});

const mapDispatchToProps = dispatch => ({
  onUserDelete: userId => dispatch(removeUser(userId)),
  onModalClose: () => dispatch(modalClose('delete')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalDelete);
