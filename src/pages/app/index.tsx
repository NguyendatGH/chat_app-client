import React from "react";
import { MessageInput } from "@/components/inputs/messageInput";
import Messages from "@/components/messages";
import useModalContext, { ModalsMap } from "@/store/modalContext";
import useQueryParams from "@/hooks/useQueryParams";
import styled from "styled-components";
import { SideBar } from "@/components/sidebar";
import Modal from "@/components/modal";
import { ProfileModal } from "@/components/modal/modalsOptions/profileModal";
import { AddContactModal } from "@/components/modal/modalsOptions/addContactModal";

const modalsMap: ModalsMap = {
  profile: <ProfileModal />,
  contact: <AddContactModal />,
};

const App = () => {
  const { isModalOpen, closeModal, currentModal } = useModalContext();
  const queryParams = useQueryParams();
  const conversationId = Number(queryParams.get("conversation_id"));

  return (
    <>
      <Container>
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
      {isModalOpen && currentModal && (
        <Modal onModalClose={closeModal} Content={modalsMap[currentModal]} />
      )}
    </>
  );
};

const Container = styled.main`
  width: 100%;
  height: 95%;
  max-width: 1280px;
  background-color: ${({ theme }) => theme.palette.background.dark};
  border-radius: 4px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;
const SidebarWrapper = styled.div`
  width: 30%;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 50%;
  }
`;

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 50%;
  }
`;

const StyledH2 = styled.h2`
  margin-top: 16px;
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

export default App;
