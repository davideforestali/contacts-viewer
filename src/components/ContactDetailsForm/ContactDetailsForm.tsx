import React from "react"
import styles from './ContactDetailsForm.module.css'

interface ContactDetailsFormProps {
  editingContactId: boolean | string,
  newContactAvatar: string,
  newContactName: string,
  newContactAvatarInputValue: string,
  onContactAvatarChange: (contactAvatarInputValue: string) => void,
  onContactAvatarInputValueChange: (contactAvatarInputValue: string) => void,
  onContactNameChange: (contactName: string) => void,
  onDeleteContact: () => void
}

const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({
  editingContactId,
  newContactAvatar,
  newContactName,
  newContactAvatarInputValue,
  onContactAvatarChange,
  onContactAvatarInputValueChange,
  onContactNameChange,
  onDeleteContact
}) => {
  return (
    <>
      <div className={styles.imageUpdate}>
        <img
          src={newContactAvatar}
          alt={editingContactId ? `${newContactName} avatar` : 'placeholder image'}
        />
        <div>
          <input
            type='text'
            value={newContactAvatarInputValue}
            placeholder='Insert image url'
            onChange={(e) =>
              onContactAvatarInputValueChange(e.target.value)
            }
          />
          <button
            className='btn btn-primary' 
            onClick={() => {
              newContactAvatarInputValue !== '' &&
              onContactAvatarChange(newContactAvatarInputValue)
            }}
            disabled={newContactAvatarInputValue === ''}
          >
            Import
          </button>
        </div>
      </div>

      <div className={styles.formContainer}>
        <label>
          Name
          <input
            type="text"
            value={newContactName}
            placeholder='Insert contact name'
            className={styles.nameInput}
            onChange={(e) =>
              onContactNameChange(e.target.value)
            }
          />
        </label>
      </div>
      {editingContactId &&
        <button
          className={`${styles.deleteButton} btn btn-danger`}
          onClick={onDeleteContact}
        >
          Delete contact
        </button>}
    </>
  )
}
export default ContactDetailsForm