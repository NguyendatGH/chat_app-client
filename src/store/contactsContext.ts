import { Contact } from "@/interfaces";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ContactsContext {
  contacts: Contact[];
  filteredContacts: Contact[];
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
    filteredContacts: [],
    filterKey: "",
    setContacts: (contacts) => {
      // console.log("contacts to set: /(store)", contacts)
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
          console.log("Current contacts:", [...state.contacts]);
          console.log("Updated contact ID:", updatedContact.id);
          
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
          // console.log("filter key in filterContacts: " +state.filterKey);
          let filtered = state.contacts.filter((contact) =>
            contact.username.includes(state.filterKey)
          );
          console.log("filtered " + filtered);
          if (!state.filterKey) {
            filtered = state.contacts;
          }
          state.filteredContacts = filtered;
        });
      },
      setFilterKey: (key: string) => {
        set((state) => {
          state.filterKey = key;
        });
        console.log("filter key value: " +key);
      },
  }))
);

export default useContactsContext;