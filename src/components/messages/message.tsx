import React from "react";
import useAuthContext from "@/store/authContext";
import { Message as MessageI } from "@/interfaces";
import styled from "styled-components";
import moment from "moment-timezone";

export const Message = React.memo(({ message }: { message: MessageI }) => {
  const { user } = useAuthContext();
  const isMyMessage = user?.id === message.from;
  const formattedTime = moment
    .utc(message.createdAt)
    .tz("Asia/Bangkok")
    .format("HH:mm");

  return (
    <StyledMessage isMyMessage={isMyMessage}>
      <p>{message.text}</p>
      <CreatedAt>{formattedTime}</CreatedAt>
    </StyledMessage>
  );
});

const StyledMessage = styled.div<{ isMyMessage: boolean }>`
  width: fit-content;
  max-width: 500px;
  border-radius: 12px;
  padding: 4px 12px;
  font-size: 16px;
  color: ${({ theme, isMyMessage }) =>
    isMyMessage ? theme.palette.text.textColor : theme.palette.text.mainColor};
  background-color: ${({ theme, isMyMessage }) =>
    isMyMessage
      ? theme.palette.text.firstColor
      : theme.palette.text.secondColor};
  margin-bottom: 8px;
  margin-left: ${({ isMyMessage }) => (isMyMessage ? "auto" : "0")};
  box-shadow: 4px 4px 10px  ${({ theme }) => theme.palette.boxShadow};


  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
`;

const CreatedAt = styled.p`
  text-align: right;
  margin-top: 6px;
  font-size: 10px;
`;
