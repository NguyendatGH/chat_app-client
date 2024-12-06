import { getContacts } from "@/api/userApi";
import useAuthContext from "@/store/authContext";
import useContactsContext from "@/store/contactsContext";
import useSocketContext from "@/store/socketContext";
import useQueryParams from "@/hooks/useQueryParams";
import { Contact, GetContactResponse } from "@/interfaces";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Contact as ContactComponent } from "./contact";

export const Contacts: React.FC = () => {
  const queryParams = useQueryParams();
  const conversationId = Number(queryParams.get("conversation_id"));
  const { user } = useAuthContext();
  const { socket } = useSocketContext();
  console.log("running index/contact components: ")
  const {
    filteredContacts,
    // setContacts,
    addContact,
    updateContactValues,
    filterKey,
    filterContacts,
    contacts,
  } = useContactsContext();

  const { isLoading } = useQuery<GetContactResponse, Error>({
    queryKey: ["contacts"],
    queryFn: getContacts,
    onSuccess: (data: GetContactResponse) => {
      useContactsContext.getState().setContacts(data.contacts);
    },
  } as UseQueryOptions<GetContactResponse, Error>); 

  console.log(filteredContacts);

  useEffect(() => {
    console.log("log at contacts component  / useEffect");

    socket.on("newContact", (contact: Contact) => {
      console.log("contact new", contact);
      addContact(contact);
    });
    socket.on("updateContactValues", (contact: Contact) =>{
      updateContactValues(contact)

    }
    );
    socket.on("updateMyContact", (contact: Contact) =>
      updateContactValues(contact)
    );
    socket.emit("conversationChange", { conversationId, myUserId: user?.id });

    return () => {
      socket.off();
    };
  }, [conversationId]);

  useEffect(() => {
    console.log("filaterContacts res : ", filterContacts());
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
    background: ${({ theme }) => theme.palette.background.light};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.palette.gray.main};
    border-radius: 10px;
  }
`;

const StyledParagraph = styled.p`
  padding: 12px;
`;
