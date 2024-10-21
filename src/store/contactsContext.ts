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
      // console.log("contacts to set: /(store)", contacts)
        set((state) => {
            state.contacts = contacts;
            console.log(state);
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
          console.log("Current contacts:", [...state.contacts]);
          console.log("Updated contact ID:", updatedContact.id);
          // console.log("contacts to update: /(store)", updatedContact)
          const contactPosition = state.contacts.findIndex(
            (contact) => contact.id === updatedContact.id
          );
          console.log("contact position", contactPosition)
          if (contactPosition === -1) {
            return;
          }
          state.contacts[contactPosition] = updatedContact;
        });
      },
      filterContacts: () => {
        set((state) => {
          console.log("filter : /(store)", state)
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