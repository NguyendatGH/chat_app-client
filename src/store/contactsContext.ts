import { Contact } from "@/interfaces";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ContactsContext {
  contacts: Contact[];
  filteredContact: Contact[];
  filterKey: string;
  setContacts: (contacts: Contact[]) => void;
  clearContacts: () => void;
  addContact: (contact: Contact) => void;
  updateContactValues: (contact: Contact) => void;
  filterContacts: () => void;
  setFilterKey: (key: string) => void;
}

const useContactsContext = create<ContactsContext>()(
  immer((set) => ({
    contacts: [],
    filteredContact: [],
    filterKey: "",
    setContacts: (contacts) => {
        set((state) => {
            state.contacts = contacts;
          });
    }, 
    clearContacts: () => {
        set((state) => {
          state.contacts = [];
        });
      },
      addContact: (contact) => {
        set((state) => {
          state.contacts.unshift(contact);
        });
      },
      updateContactValues: (updatedContact) => {
        set((state) => {
          const contactPosition = state.contacts.findIndex(
            (contact) => contact.id === updatedContact.id
          );
          if (contactPosition === -1) {
            return;
          }
          state.contacts[contactPosition] = updatedContact;
        });
      },
      filterContacts: () => {
        set((state) => {
          let filtered = state.contacts.filter((contact) =>
            contact.username.includes(state.filterKey)
          );
          if (!state.filterKey) {
            filtered = state.contacts;
          }
          state.filteredContact = filtered;
        });
      },
      setFilterKey: (key: string) => {
        set((state) => {
          state.filterKey = key;
        });
      },
  }))
);

export default useContactsContext;