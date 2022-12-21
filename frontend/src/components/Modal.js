import React, { useContext } from 'react'
import ReactDOM from 'react-dom';
import './Modal.css'
import { ModalContext } from './ModalContext';

function Modal({ children }) {
    const { modalState, setModalState } = useContext(ModalContext);
    const JSX_MODAL = (
        <div className="modal-container" onClick={(e) => e.target.className !== 'modal' ? setModalState(false) : ''}>
            <div className="modal">Thanush</div>
        </div>
    )

    return modalState ? ReactDOM.createPortal(JSX_MODAL, document.querySelector('#modal')) : '';
}

export default Modal