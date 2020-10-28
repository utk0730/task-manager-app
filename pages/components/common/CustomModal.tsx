import React, { ReactElement } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'

interface ModalSchema {
  isOpen: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  children: ReactElement
}

export default function CustomModal({ isOpen, setShowModal, children }: ModalSchema) {
  function closeModal() {
    setShowModal(false)
  }
  return (
    <StyledModal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal component"
      shouldCloseOnOverlayClick={false}
    >
      <div className="close-btn" onClick={closeModal}>
        Close
      </div>
      {children}
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  position: relative;
  display: flex;
  align-items: center;
  width: 60%;
  height: 70vh;
  max-height: 600px;
  margin: auto;
  margin-top: 10%;
  background: white;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.boxShadow.shadow1};
  border-radius: 4px;
  @media (max-width: 767px) {
    width: 90%;
    margin-top: 30%;
  }
  &:focus {
    outline: none;
  }

  & .close-btn {
    position: absolute;
    right: 0;
    top: 0;
    margin: 1rem;
    cursor: pointer;
  }
`
