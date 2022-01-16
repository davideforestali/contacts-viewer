
import { render, screen } from '@testing-library/react'
import ContactDetailsForm from './ContactDetailsForm'
import userEvent from '@testing-library/user-event'

const contactDetailsFormDefaultProps = {
  editingContactId: false,
  newContactAvatar: 'https://images.com/image1.jpg',
  newContactName: 'Goofy',
  newContactAvatarInputValue: 'https://images.com/image1.jpg',
  onContactAvatarChange: jest.fn(),
  onContactAvatarInputValueChange: jest.fn(),
  onContactNameChange: jest.fn(),
  onDeleteContact: jest.fn()
}

describe('ContactDetailsForm component', () => {

  test('renders delete button if it is editing contact ', () => {
    render(<ContactDetailsForm {...contactDetailsFormDefaultProps} editingContactId={true}/>)

    const deleteButton = screen.getByRole('button', {name: /delete contact/i})
    userEvent.click(deleteButton)

    expect(contactDetailsFormDefaultProps.onDeleteContact).toHaveBeenCalled()
  })

  test('disables import button for the avatar if url is empty', () => {
    render(<ContactDetailsForm {...contactDetailsFormDefaultProps} newContactAvatarInputValue='' />)

    const importButton = screen.getByRole('button', {name: /import/i})
    userEvent.click(importButton)

    expect(importButton).toBeDisabled()
    expect(contactDetailsFormDefaultProps.onContactAvatarChange).not.toHaveBeenCalled()
  })
})
