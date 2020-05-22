import React from 'react';
import {connect} from 'react-redux';
import T from 'prop-types';
import {modalClose, addUser, editUser} from '../actions';
import ManageForm from '../components/manageForm/ManageForm';
import Modal from '../components/common/modal/Modal';

const CreateModal = ({
  user,
  settings,
  isModalOpen,
  onModalClose,
  onUserCreate,
  onUserEdit,
}) => {
  const isEdit = user && !!Object.keys(user).length;
  return (
    <Modal
      onClose={onModalClose}
      isOpen={isModalOpen}
      loading={settings.loading}
    >
      <ManageForm
        user={user}
        isEdit={isEdit}
        settings={settings}
        onUserEdit={onUserEdit}
        onUserCreate={onUserCreate}
      />
    </Modal>
  );
};

CreateModal.propTypes = {
  user: T.object,
  settings: T.object.isRequired,
  isModalOpen: T.bool.isRequired,
  onModalClose: T.func.isRequired,
  onUserCreate: T.func.isRequired,
  onUserEdit: T.func.isRequired,
};

const mapStateToProps = ({currentUser, modal, modalSettings}) => ({
  user: currentUser,
  settings: modalSettings,
  isModalOpen: modal.create,
});

const mapDispatchToProps = dispatch => ({
  onUserCreate: user => dispatch(addUser(user)),
  onUserEdit: user => dispatch(editUser(user)),
  onModalClose: () => dispatch(modalClose('create')),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);
