import React, { createContext, useEffect, useState } from 'react'

export const ModalContext = createContext();

function ModalProvider({ children }) {
    const [modalState, setModalState] = useState(false);
    const [modalType, setModalType] = useState('');


    useEffect(() => {
        const rootDiv = document.querySelector('#root');
        modalState ? rootDiv.classList.add('scoll-lock') : rootDiv.classList.remove('scoll-lock');
    }, [modalState])

    return (
        <ModalContext.Provider value={{ modalState, setModalState, modalType, setModalType }}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider