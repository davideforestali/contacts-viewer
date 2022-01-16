import { useEffect, useState } from 'react'
import { ContactProps } from './interfaces/shared'
import { getContactById } from './helpers'
import Modal from './components/Modal/Modal'
import ContactDetailsForm from './components/ContactDetailsForm/ContactDetailsForm'
import ContactCard from './components/ContactCard/ContactCard'
import ContactsLister from './components/ContactsLister/ContactsLister'

const networkErrorMsg = 'Something went wrong'
const placeholderImage = 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'
const contactsApiUrl = 'https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts/'

const App:React.FC = () => {
  const [contacts, setContacts] = useState<ContactProps[] | null>(null)
  const [networkError, setNetworkError] = useState(null)
  const [isModalActive, setIsModalActive] = useState(false)
  const [newContactName, setNewContactName] = useState('')
  const [newContactAvatar, setNewContactAvatar] = useState(placeholderImage)
  const [newContactAvatarInputValue, setNewContactAvatarInputValue] = useState('')
  const [editingContactId, setEditingContactId] = useState<boolean | string>(false)

  useEffect(() => {
    fetchContactHandlers()
  }, [])

  const fetchContactHandlers = () => {
    fetch(contactsApiUrl)
      .then(response => {
        if (!response.ok) {throw new Error (networkErrorMsg)}
        return response.json()
      })
      .then(data => setContacts(data))
      .catch(error => setNetworkError(error))
  }

  const submitContactHandler = () => {
    const newContactBody = {
      avatar: newContactAvatar,
      name: newContactName
    }

    if (newContactName !== '') {
      if (editingContactId) {
        fetch(contactsApiUrl + editingContactId, {
          method: 'PUT',
          body: JSON.stringify(newContactBody),
          headers: { 'Content-Type': 'application/json' }
        })
        .then(() => {
          modalCloseHandler()
          fetchContactHandlers()
        })
  
      } else {
        fetch(contactsApiUrl, {
          method: 'POST',
          body: JSON.stringify(newContactBody),
          headers: { 'Content-Type': 'application/json' }
        })
        .then(() => {
          modalCloseHandler()
          fetchContactHandlers()
        })
      }
    }
  }

  const updateContactHandler = (contactId: string) => {
    if (contacts) {
      setIsModalActive(true)
      setEditingContactId(contactId)
      const selectedContact = getContactById(contacts, contactId)

      if (selectedContact) {
        setNewContactName(selectedContact.name)
        setNewContactAvatar(selectedContact.avatar)
        setNewContactAvatarInputValue(selectedContact.avatar)
      }
    }
  }

  const deleteContactHandler = () => {
    fetch(contactsApiUrl + editingContactId, { method: 'DELETE' })
    .then(() => {
      modalCloseHandler()
      fetchContactHandlers()
    })
  }

  const modalCloseHandler = () => {
    setIsModalActive(false)
    setEditingContactId(false)
    setNewContactName('')
    setNewContactAvatar(placeholderImage)
    setNewContactAvatarInputValue('')
  }

  let contactsToRender: JSX.Element | JSX.Element[] = 
    <p aria-label='loading message' role='alert'>Loading...</p> 

  if (networkError) {
    contactsToRender = 
      <p aria-label='error message' role='alert'>{networkErrorMsg}</p>
  }
  if (contacts && contacts.length) {
    contactsToRender = contacts.map(contact => (
      <li key={contact.id}>
        <ContactCard
          contact={contact}
          onUpdateContact={(contactId) => updateContactHandler(contactId)}
        />
      </li>
    ))
  }
  if (contacts && !contacts.length) {
    contactsToRender = 
      <p aria-label='no results message' role='alert'>No contacts found</p>
  }

  return (
    <div className="container">
      <section>
        <h1>Contacts</h1>
        <ContactsLister>
          {contactsToRender}
        </ContactsLister>
        <button
          onClick={() => setIsModalActive(true)}
          className='btn btn-primary'
        >
          New contact
        </button>
      </section>

      <Modal
        show={isModalActive}
        title={editingContactId ? `Edit ${newContactName}` : 'Create contact'}
        onModalClose={modalCloseHandler}
        onModalConfirm={submitContactHandler}
        isConfirmBtnDisabled={newContactName === ''}
      >
        <ContactDetailsForm
          newContactAvatar={newContactAvatar}
          editingContactId={editingContactId}
          newContactName={newContactName}
          newContactAvatarInputValue={newContactAvatarInputValue}
          onContactAvatarChange={(contactAvatarInputValue) => {
            setNewContactAvatar(contactAvatarInputValue)}
          } 
          onContactAvatarInputValueChange={(contactAvatarInputValue) => {
            setNewContactAvatarInputValue(contactAvatarInputValue)}
          } 
          onContactNameChange={(contactName) => setNewContactName(contactName)}
          onDeleteContact={deleteContactHandler}
        />
      </Modal>
    </div>
  )
}

export default App
