import React from 'react';
import {connect} from 'react-redux';
import T from 'prop-types';
import {modalClose, addUser, editUser} from '../../actions';
import Form from '../Form/Form';
import Modal from '../modal/Modal';

const CreateModal = ({
  isModalOpen,
  user,
  onModalClose,
  onUserCreate,
  onUserEdit,
  errors,
}) => {
  const isEdit = !!Object.keys(user).length;
  return (
    <Modal onClose={onModalClose} isOpen={isModalOpen}>
      <Form
        onUserEdit={onUserEdit}
        onUserCreate={onUserCreate}
        user={user}
        isEdit={isEdit}
        errors={errors}
      />
    </Modal>
  );
};

CreateModal.propTypes = {
  onModalClose: T.func.isRequired,
  onUserCreate: T.func.isRequired,
  onUserEdit: T.func.isRequired,
  user: T.object.isRequired,
  isModalOpen: T.bool.isRequired,
  errors: T.object,
};

const mapStateToProps = ({currentUser, modal, manageError}) => ({
  user: currentUser,
  isModalOpen: modal.create,
  errors: manageError,
});

const mapDispatchToProps = dispatch => ({
  onUserCreate: user => dispatch(addUser(user)),
  onModalClose: () => dispatch(modalClose('create')),
  onUserEdit: user => dispatch(editUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);

// isOpen={createModal}
// onClose={() => this.handleModalClose('create')}
// user={currentUser}
// onUserEdit={onUserEdit}
// onUserCreate={onUserCreate}
