
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from './Modal'

const modalDefaultProps = {
  show: true,
  title: 'Create contact',
  onModalClose: jest.fn(),
  onModalConfirm: jest.fn(),
  isConfirmBtnDisabled: false
}

describe('Modal component', () => {
  
  test('shows children', () => {
    render(
      <Modal {...modalDefaultProps}>
        <div>test</div>
      </Modal>
    )

    expect(screen.getByText('test')).toBeTruthy()
  })

  test('closes when click on backdrop', () => {
    
    render(<Modal {...modalDefaultProps} />)

    const backdrop = screen.getByLabelText('backdrop')
    userEvent.click(backdrop)

    expect(modalDefaultProps.onModalClose).toHaveBeenCalled()
  })

  test('closes when click on cancel button', () => {
    
    render(<Modal {...modalDefaultProps} />)

    const cancelButton = screen.getByRole('button', {name: /cancel/i})
    userEvent.click(cancelButton)

    expect(modalDefaultProps.onModalClose).toHaveBeenCalled()
  })

  test('invokes onModalConfirm when click on confirm button', () => {
    
    render(<Modal {...modalDefaultProps} />)

    const confirmButton = screen.getByRole('button', {name: /Confirm/i})
    userEvent.click(confirmButton)

    expect(modalDefaultProps.onModalConfirm).toHaveBeenCalled()
  })

  test('does not invoke onModalConfirm if confirm button is disabled', () => {
    
    render(<Modal {...modalDefaultProps} isConfirmBtnDisabled={true} />)

    const confirmButton = screen.getByRole('button', {name: /Confirm/i})
    userEvent.click(confirmButton)

    expect(modalDefaultProps.onModalConfirm).not.toHaveBeenCalled()
  })
})
