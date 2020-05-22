import React from 'react';
import {createPortal} from 'react-dom';

import T from 'prop-types';
import cx from 'classnames';

import './Modal.scss';
import Animation from '../../animation/Animation';

const Modal = ({isOpen, onClose, loading, children, className}) => {
  const handleModalClose = () => loading ? null : onClose(false);
  return createPortal(
    <Animation show={isOpen}>
      <div className={cx('modal', {'d-block': isOpen}, className)}>
        <div className="modal-backdrop" onClick={handleModalClose} />
        <div className="modal-content bg-light">
          <button
            type="button"
            className="close close-modal"
            onClick={handleModalClose}
          >
            <span>&times;</span>
          </button>
          <div className="container">
            <div className="row">
              <div className="col-12 layout-offset">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </Animation>,
    document.getElementById('modal-root')
  );
};

Modal.propTypes = {
  onClose: T.func.isRequired,
  isOpen: T.bool.isRequired,
  children: T.element,
  loading: T.bool,
  className: T.string,
};

export default Modal;
