import { Conversation, Messages } from "@/interfaces";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ConversationContext {
  activeConversationId: number | null;
  conversation: Conversation | null;
  setActiveConversationId: (id: number) => void;
  setConversation: (conversation: Conversation) => void;
  addMessage: (message: Messages) => void;
}

const useConversationContext = create<ConversationContext>()(
  immer((set) => ({
    activeConversationId: null,
    conversation: null,
    setActiveConversationId: (id: number) => {
      set((state) => {
        state.activeConversationId = id;
      });
    },
    setConversation: (conversation: Conversation) => {
      set((state) => {
        state.conversation = conversation;
      });
    },
    addMessage: (message: Messages) => {
      set((state) => {
        state.conversation?.message?.push(message);
      });
    },
    resetConversationState: () => {
      set((state) => {
        state.conversation = null;
        state.activeConversationId = null;
      });
    },
  }))
);

export default useConversationContext;