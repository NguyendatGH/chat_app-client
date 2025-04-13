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
      // console.log("contacts to set: /(store)", contacts);
      set((state) => {
        if (!Array.isArray(contacts)) {
          console.error("invalid contact data: ", contacts);
          return;
        }
        state.contacts = contacts;
        // console.log("contact context: ", state.contacts);
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
        console.log(state.contacts);
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
        let filtered = state.contacts.filter(
          (contact) =>
            contact.username && contact.username.includes(state.filterKey)
        );
        // console.log("filtered " + filtered);
        if (!state.filterKey) {
          filtered = state.contacts;
        }
        state.filteredContacts = filtered;
      });
    },
    setFilterKey: (key: string) => {
      set((state) => {
        // console.log("filtered key: ", key);
        state.filterKey = key;
      });
    },
  }))
);

export default useContactsContext;
