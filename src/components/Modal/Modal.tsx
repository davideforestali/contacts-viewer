import React from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

interface ModalProps {
  show: boolean,
  title: string,
  onModalClose: () => void,
  onModalConfirm: () => void
  isConfirmBtnDisabled: boolean
}

const Modal: React.FC<ModalProps> = ({
  show,
  title,
  onModalClose,
  onModalConfirm,
  isConfirmBtnDisabled,
  children
}) => {
  const visibilityModifier = show ? ` ${styles.show}` : ''

  return createPortal(
    <>
      <div
        className={styles.backdrop + visibilityModifier}
        onClick={onModalClose}
        aria-label='backdrop'
      />

      <aside
        className={styles.modal + visibilityModifier}
        role='dialog'
        aria-modal='true'
      >
        <header>
          <h2>{title}</h2>
        </header>

        {children}

        <div className={styles.actions}>
          <button
            onClick={onModalClose}
            className='btn btn-secondary'
          >
            Cancel
          </button>
          <button
            onClick={onModalConfirm}
            className='btn btn-primary'
            disabled={isConfirmBtnDisabled}
          >
            Confirm
          </button>
        </div>
      </aside>
    </>,
    document.body // with createPortal we append modal to end of page (a11y best practice)
  )
}

export default Modal
