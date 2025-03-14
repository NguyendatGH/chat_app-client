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
        <ContactName>{username}</ContactName>

        <LastMessage>
          {lastMessage ? lastMessage?.text : "No messages yet"}
        </LastMessage>
      </InfoSection>

      <UserOption>
        <LastMessageDate>
          {lastMessage
            ? `${moment(lastMessage.updateAt).utcOffset(7).format("hh:mm A")}`
            : null}
        </LastMessageDate>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {unreadMessages ? (
            <UnreadMessages>{unreadMessages}</UnreadMessages>
          ) : null}
          <StyledIcon onClick={toggleModal} />
        </div>
      </UserOption>
    </Container>
  );
});

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isActiveChat",
})<{ isActiveChat: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 8px 8px;
  transition: all 0.2s;
  border: 1px solid
    ${({ theme, isActiveChat }) =>
      isActiveChat ? theme.palette.border : "transparent"};
  border-radius: 12px;

  background-color: ${({ theme, isActiveChat }) =>
    isActiveChat ? theme.palette.background.chatBg : "transparent"};

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.chatBg};
  }
`;

const ContactName = styled.h2`
  font-size: 18px;
  font-weight: 400;
  font-family: Poppins;
  color: ${({theme}) => theme.palette.text.mainColor};
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
  color: ${({ theme }) => theme.palette.text.grayText};
  margin-top: 2px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
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
  font-size: 12px;
  color: ${({ theme }) => theme.palette.background.appBg};
`;
const UserOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const StyledIcon = styled(BsThreeDots)`
  fill: ${({ theme }) => theme.palette.text.grayText};
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
