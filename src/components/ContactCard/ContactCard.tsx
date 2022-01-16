import { ContactProps } from '../../interfaces/shared'
import styles from './ContactCard.module.css'

interface ContactCardProps {
  contact: ContactProps,
  onUpdateContact: (contactId: string) => void
}

const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  onUpdateContact
}) => {
  return (
    <div className={styles.ContactCard}>
      <div className={styles.details}>
        <img src={contact.avatar} alt={`${contact.name} avatar`} />
        <p>{contact.name}</p>
      </div>

      <button
        className='edit-button'
        aria-label='Edit button'
        onClick={() => onUpdateContact(contact.id)}
      >
        ✎
      </button>
    </div>
  )
}

export default ContactCard