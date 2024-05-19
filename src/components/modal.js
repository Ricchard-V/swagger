import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next');
const ModalUsuario = ({ isOpen, onRequestClose}) => {
    return(
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className="modal"
    overlayClassName="overlay"
  >
    {children}
  </Modal>
    );
}
