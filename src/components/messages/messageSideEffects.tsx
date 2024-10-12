import useConversationContext from "@/store/conversationContext";
import useSocketContext from "@/store/socketContext";
import useQueryParams from "@/hooks/useQueryParams";
import {Messages} from "@/interfaces";
import React, {useEffect} from "react";

export const MessagesSideEffects = React.memo(() => {
  const {socket} = useSocketContext();
  const {addMessage} = useConversationContext();
  const queryParams = useQueryParams();
  const conversationId = Number(queryParams.get("conversation_id"));

  useEffect(() => {
    socket.on("newMessage", (message: Messages) => {
      if (message.conversationId === conversationId) {
        addMessage(message);
      }
    });

    socket.on("selfMessage", (message: Messages) => {
      if (message.conversationId === conversationId) {
        addMessage(message);
      }
    });

    return () => {
      socket.off();
    };
  }, [conversationId]);

  return <></>;
});
