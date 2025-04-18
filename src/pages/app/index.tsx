import React, { useEffect } from "react";
import { MessageInput } from "@/components/inputs/messageInput";
import Messages from "@/components/messages";
import useModalContext, { ModalsMap } from "@/store/modalContext";
import useQueryParams from "@/hooks/useQueryParams";
import styled from "styled-components";
import { SideBar } from "@/components/sidebar";
import Modal from "@/components/modal";
import { ProfileModal } from "@/components/modal/modalsOptions/profileModal";
import { AddContactModal } from "@/components/modal/modalsOptions/addContactModal";
import { ContactOption } from "@/components/modal/modalsOptions/contactOption";
import useConversationContext from "@/store/conversationContext";

const modalsMap: ModalsMap = {
  profile: <ProfileModal />,
  contact: <AddContactModal />,
  contactOption: <ContactOption />,
};

const App = () => {
  const { modals, closeModal } = useModalContext();
  const queryParams = useQueryParams();
  const conversationId = Number(queryParams.get("conversation_id"));

  const { setActiveConversationId } = useConversationContext();

  useEffect(() => {
    setActiveConversationId(conversationId);
  }, [conversationId, setActiveConversationId]);
  return (
    <>
      <Container className={modals.length > 0 ? "blur-background" : ""}>
        <SidebarWrapper>
          <SideBar />
        </SidebarWrapper>

        <MessagesWrapper>
          {!conversationId ? (
            <StyledH2>choose or create a contact</StyledH2>
          ) : (
            <>
              <Messages />
              <MessageInput />
            </>
          )}
        </MessagesWrapper>
      </Container>
      {modals.map((modal) => (
        <Modal
          key={modal.key}
          onModalClose={() => closeModal(modal.key)}
          Content={modalsMap[modal.component]}
        />
      ))}
    </>
  );
};

const Container = styled.main`
  width: 100%;
  height: 88%;
  max-width: 1280px;
  background-color: ${({ theme }) => theme.palette.background.appBg};
  border-radius: 12px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  transition: filter 0.3s ease-in-out;

  &.blur-background {
    filter: blur(5px);
  }
`;
const SidebarWrapper = styled.div`
  width: 30%;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    display: none;
  }
`;

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  background-color: ${({ theme }) => theme.palette.background.chatBg};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 50%;
  }

   @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 60%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%; 
  }
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const StyledH2 = styled.h2`
  margin-top: 16px;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  color: ${({ theme }) => theme.palette.text.mainColor};
`;

export default App;
