import { ContactProps } from "./interfaces/shared"

export const getContactById = (contacts: ContactProps[], id: string) => {
  return contacts.find((contact) => contact.id === id)
}
