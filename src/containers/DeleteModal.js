import React from 'react';
import {connect} from 'react-redux';
import T from 'prop-types';

import {removeUser, modalClose} from '../actions';
import ConfirmForm from '../components/confirmForm/ConfirmForm';
import Modal from '../components/common/modal/Modal';

const DeleteModal = ({
  user,
  settings,
  isModalOpen,
  onUserDelete,
  onModalClose,
}) => {
  return (
    <Modal
      onClose={onModalClose}
      isOpen={isModalOpen}
      loading={settings.loading}
    >
      {user && (
        <ConfirmForm
          user={user}
          settings={settings}
          onUserDelete={onUserDelete}
          onModalClose={onModalClose}
        />
      )}
    </Modal>
  );
};

DeleteModal.propTypes = {
  user: T.object,
  settings: T.object,
  isModalOpen: T.bool.isRequired,
  onModalClose: T.func.isRequired,
  onUserDelete: T.func.isRequired,
};

const mapStateToProps = ({currentUser, modal, modalSettings}) => ({
  user: currentUser,
  settings: modalSettings,
  isModalOpen: modal.delete,
});

const mapDispatchToProps = dispatch => ({
  onUserDelete: userId => dispatch(removeUser(userId)),
  onModalClose: () => dispatch(modalClose('delete')),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
