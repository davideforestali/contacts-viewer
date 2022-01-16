import styles from './ContactsLister.module.css'

const ContactsLister: React.FC = ({ children }) => (
  <ul className={styles.contactsLister}>
    {children}
  </ul>
)

export default ContactsLister