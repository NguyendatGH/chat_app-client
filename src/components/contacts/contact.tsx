import { Contact as ContactI } from "@/interfaces";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useQueryParams from "@/hooks/useQueryParams";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import useModalContext from "@/store/modalContext";
// import { ConfirmationModal } from "../modal/modalsOptions/confirmationModal";

export const Contact: React.FC<{ contact: ContactI }> = React.memo((props) => {
  const {
    photo,
    username,
    conversationId,
    unreadMessages: inititalUnreadMessages,
    lastMessage,
  } = props.contact;

  const [unreadMessages, setUnreadMessages] = useState(inititalUnreadMessages);
  // const [isVisible, setIsModalVisible] = useState<boolean>(false);

  const queryParams = useQueryParams();
  const navigate = useNavigate();

  const activeConversationId = Number(queryParams.get("conversation_id"));

  const isActiveChat = conversationId === activeConversationId;

  useEffect(() => {
    if (isActiveChat) {
      setUnreadMessages(0);
    }
  }, [isActiveChat]);

  const onClick = useCallback(() => {
    navigate(`/?conversation_id=${conversationId}`);
  }, [conversationId, navigate]);

  const {openModal} = useModalContext();


  const toggleModal = () => {
    openModal("contactoption", "contactOption");
  };

  return (
    <Container isActiveChat={isActiveChat}>
      <Avatar onClick={onClick} alt="Avatar image" src={photo} />
      <InfoSection onClick={onClick}>
        <h3>{username}</h3>
        <LastMessage>
          {lastMessage ? lastMessage?.text : "No messages yet"}
        </LastMessage>
        <LastMessageDate>
          {lastMessage
            ? `Last message: ${moment(lastMessage.updateAt).format("L")}`
            : null}
        </LastMessageDate>
      </InfoSection>

      {unreadMessages ? (
        <UnreadMessages>{unreadMessages}</UnreadMessages>
      ) : null}
      <StyledIcon onClick={toggleModal} />     
    </Container>
  );
});

const Container = styled.div<{ isActiveChat: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 10px 8px;
  transition: all 0.2s;
  background-color: ${({ theme, isActiveChat }) =>
    isActiveChat ? theme.palette.background.light : null};

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.light};
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 6px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2px 8px;
  flex: 1;
  cursor: pointer;
`;

const LastMessage = styled.p`
  color: ${({ theme }) => theme.palette.text};
  margin-top: 4px;
`;
const LastMessageDate = styled.p`
  color: ${({ theme }) => theme.palette.primary.light};
  font-size: 14px;
`;

const UnreadMessages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.palette.primary.light};
  font-size: 14px;
`;

const StyledIcon = styled(BsThreeDots)`
  fill: ${({ theme }) => theme.palette.text};
  width: 20px;
  height: 20px;
  margin: 0 10px;
  cursor: pointer;
`;
