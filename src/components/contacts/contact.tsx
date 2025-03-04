import { Contact as ContactI } from "@/interfaces";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useQueryParams from "@/hooks/useQueryParams";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import useModalContext from "@/store/modalContext";

export const Contact: React.FC<{ contact: ContactI }> = React.memo((props) => {
  const {
    photo,
    username,
    conversationId,
    unreadMessages: inititalUnreadMessages,
    lastMessage,
  } = props.contact;

  const [unreadMessages, setUnreadMessages] = useState(inititalUnreadMessages);

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

  const { openModal } = useModalContext();

  const toggleModal = () => {
    openModal("contactoption", "contactOption");
  };

  return (
    <Container isActiveChat={isActiveChat}>
      <Avatar onClick={onClick} alt="Avatar image" src={photo} />
      <InfoSection onClick={onClick}>
        <h3 style={{ fontSize: "18px" , fontWeight:"400", fontFamily:"Poppins"}}>{username}</h3>
        <LastMessage>
          {lastMessage ? lastMessage?.text : "No messages yet"}
        </LastMessage>
      </InfoSection>

      {unreadMessages ? (
        <UnreadMessages>{unreadMessages}</UnreadMessages>
      ) : null}
      <UserOption>
        <LastMessageDate>
          {lastMessage
            ? `${moment(lastMessage.updateAt).utcOffset(7).format("hh:mm A")}`
            : null}
        </LastMessageDate>
        <StyledIcon onClick={toggleModal} />
      </UserOption>
    </Container>
  );
});

const Container = styled.div<{ isActiveChat: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 6px 8px;
  transition: all 0.2s;
  background-color: ${({ theme, isActiveChat }) =>
    isActiveChat ? theme.palette.background.appBg : null};

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.appBg};
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
  padding: 0px 4px;
  flex: 1;
  cursor: pointer;
`;

const LastMessage = styled.p`
  color: ${({ theme }) => theme.palette.text.secondColor};
  margin-top: 2px;
  font-size: 14px;
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
const UserOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledIcon = styled(BsThreeDots)`
  fill: ${({ theme }) => theme.palette.text.secondColor};
  width: 20px;
  height: 20px;
  margin: 0 10px;
  cursor: pointer;
`;
