import React from "react";
import useAuthContext from "@/store/authContext";
import { Message as MessageI } from "@/interfaces";
import styled from "styled-components";
import moment from "moment";

export const Message = React.memo(({ message }: { message: MessageI }) => {
  const { user } = useAuthContext();
  const isMyMessage = user?.id === message.from;

  return (
    <StyledMessage isMyMessage={isMyMessage}>
      <p>{message.text}</p>
      <CreatedAt>{moment(message.createAt).format("lll")}</CreatedAt>
    </StyledMessage>
  );
});

const StyledMessage = styled.div<{ isMyMessage: boolean }>`
  width: fit-content;
  max-width: 500px;
  border-radius: 12px;
  padding: 4px 12px;
  font-size: 16px;
  background-color: ${({ theme, isMyMessage }) =>
    isMyMessage ? theme.palette.text.firstColor : theme.palette.primary.main};
  margin-bottom: 8px;
  margin-left: ${({ isMyMessage }) => (isMyMessage ? "auto" : "0")};
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);


  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
`;

const CreatedAt = styled.p`
  text-align: right;
  margin-top: 6px;
  font-size: 8px;
`;
