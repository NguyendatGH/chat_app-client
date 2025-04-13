import {getConversation} from "@/api/userApi";
import useConversationContext from "@/store/conversationContext";
import useOnScreen from "@/hooks/useOnScreen";
import useQueryParams from "@/hooks/useQueryParams";
import {useQuery} from "@tanstack/react-query";
import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {Message} from "./message";
import {MessagesSideEffects} from "./messageSideEffects";

const Messages: React.FC = () => {
  const {conversation, setConversation } = useConversationContext();
  const queryParams = useQueryParams();
  const conversationId = Number(queryParams.get("conversation_id"));
  const bottomRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(bottomRef);


  const {data, isLoading, isFetching} = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => getConversation(conversationId),
    enabled: !!conversationId && conversationId !== 0,
  });

  useEffect(() => {
    if (data?.conversation) {
      setConversation(data.conversation);
    }
  }, [data, setConversation]);

  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: "smooth"});
  }, [isVisible, conversationId, conversation?.messages]);

  return (
    <Container>
      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : (
        <>
          {conversation && conversation?.messages?.length > 0 ? (
            conversation.messages.map((message) => <Message message={message} key={message.id} />)
          ) : (
            <NoMessage>No messages yet</NoMessage>
          )}
        </>
      )}
      <div ref={bottomRef}></div>
      <MessagesSideEffects />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: 14px 14px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${({theme}) => theme.palette.background.theme};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({theme}) => theme.palette.text};
    border-radius: 10px;
  }
`;

const NoMessage = styled.div`
  color: ${({theme}) => theme.palette.text.mainColor};
`;

export default Messages;
