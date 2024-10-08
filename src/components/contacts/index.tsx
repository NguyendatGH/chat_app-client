import {getContact} from "@/api/userApi";
import useAuthContext from "@/store/authContext";
import useContactsContext from "@/store/contactsContext";
import useSocketContext from "@/store/socketContext";
import useQueryParams from "@/hooks/useQueryParams";
import {Contact} from "@/interfaces";
import {useQuery} from "@tanstack/react-query";
import React, {useEffect} from "react";
import styled from "styled-components";
import {Contact as ContactComponent} from "./contact";

export const Contacts: React.FC = () => {
  const {isLoading} = useQuery(["contacts"], getContact, {
    onSuccess: (data) => {
      setContacts(data.contacts);
    },
  });
  const {
    filteredContacts,
    setContacts,
    addContact,
    updateContactValues,
    filterKey,
    filterContacts,
    contacts,
  } = useContactsContext();
  const queryParams = useQueryParams();
  const conversationId = Number(queryParams.get("conversation_id"));
  const {user} = useAuthContext();

  const {socket} = useSocketContext();

  useEffect(() => {
    socket.on("newContact", (contact: Contact) => addContact(contact));
    socket.on("updateContactValues", (contact: Contact) => updateContactValues(contact));
    socket.on("updateMyContact", (contact: Contact) => updateContactValues(contact));
    socket.emit("conversationChange", {conversationId, myUserId: user?.id});

    return () => {
      socket.off();
    };
  }, [conversationId]);

  useEffect(() => {
    filterContacts();
  }, [filterKey, contacts]);

  return (
    <Container>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {filteredContacts && filteredContacts.length > 0 ? (
            filteredContacts?.map((contact) => (
              <ContactComponent key={contact.id} contact={contact} />
            ))
          ) : (
            <StyledParagraph>No contacts found</StyledParagraph>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${({theme}) => theme.palette.background.light};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({theme}) => theme.palette.gray.main};
    border-radius: 10px;
  }
`;

const StyledParagraph = styled.p`
  padding: 12px;
`;
