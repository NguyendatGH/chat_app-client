import useAuthContext from "@/store/authContext";
import useConversationContext from "@/store/conversationContext";
import useSocketContext from "@/store/socketContext";
import useQueryParams from "@/hooks/useQueryParams";
import { IoSendSharp } from "react-icons/io5";
import React, { useRef, useCallback } from "react";
import {message} from "antd";
import styled from "styled-components";

type NewEvent =
  | React.KeyboardEvent<HTMLInputElement>
  | React.MouseEvent<SVGElement, MouseEvent>;

export const MessageInput: React.FC = () => {
  const { user } = useAuthContext();
  const { socket } = useSocketContext();
  const queryParams = useQueryParams();
  const { conversation } = useConversationContext();
  const conversationId = Number(queryParams.get("conversation_id"));
  // const [error, setError] = useState("");
  const ref = useRef<HTMLInputElement | null>(null);

  const sendMessage = useCallback(() => {
    // console.log("Ref value:", ref.current?.value);
    // console.log("Conversation:", conversation);
    // console.log("User:", user);

    if(!ref.current?.value.trim()){
      message.error("Please enter a message!");
      return;
    }


    if (!user || !conversationId) {
      return;
    }


    const newMessage = {
      text: ref.current?.value,
      from: user.id,
      conversationId: conversationId,
      createdAt: new Date(),
    };

    socket.emit("message", {
      message: newMessage,
      conversation,
      myUserId: user.id,
    });

    ref.current.value = "";
  }, [conversation, user]);

  const onSubmit = useCallback(
    (event: NewEvent) => {
      // console.log("Event triggered:", event);
      // console.log("Ref state on submit:", ref);
      if (!conversation) {
        // console.log("no conversation / from messageInput");
        return;
      }

      if (event.type === "keydown") {
        if ((event as React.KeyboardEvent).key === "Enter") {
          // console.log("Enter key pressed, calling sendMessage");
          sendMessage();
        }
      } else {
        // console.log("Icon clicked, calling sendMessage");
        sendMessage();
      }
    },
    [conversation, sendMessage]
  );

  return (
    <InputContainer>
      <Input onKeyDown={onSubmit} ref={ref} placeholder="Write a message..." />
      <StyledIcon onClick={onSubmit} />
    </InputContainer>
  );
};

const Input = styled.input`
  -webkit-appearance: none;
  width: 100%;
  outline: none;
  padding: 4px;
  padding-left: 18px;
  font-size: 18px;
  background-color: ${({ theme }) => theme.palette.background.appBg};
  border: 2px solid ${({ theme }) => theme.palette.border};
  border-radius: 12px;
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 14px 8px;
  display: flex;
  align-items: center;
`;

const StyledIcon = styled(IoSendSharp)`
  fill: ${({ theme }) => theme.palette.primary.light};
  width: 30px;
  height: 30px;
  margin: 0 10px;
  cursor: pointer;
`;

