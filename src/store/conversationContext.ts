import { resetConversation } from "@/api/userApi";
import { Conversation, Message } from "@/interfaces";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
interface ConversationContext {
  activeConversationId: number | null;
  conversation: Conversation | null;
  setActiveConversationId: (id: number) => void;
  setConversation: (conversation: Conversation) => void;
  resetConversationState: () => void;
  addMessage: (message: Message) => void;
  resetMessage: () => Promise<void>;
}

const useConversationContext = create<ConversationContext>()(
  immer((set, get) => ({
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
    addMessage: (message: Message) => {
      set((state) => {
        state.conversation?.messages?.push(message);
      });
    },

    resetConversationState: () => {
      set((state) => {
        state.conversation = null;
        state.activeConversationId = null;
      });
    },

    resetMessage: async () => {
      const activeConversationId = Number(get().activeConversationId);
      if (!activeConversationId) {
        console.log("No active conversation id to reset message!");
        return;
      }
      try {
        await resetConversation(activeConversationId);
        console.log("Message reset success!");
        set(async (state) => {
          state.conversation = {
            ...state.conversation,
            messages: [],
          } as Conversation;
        });
      } catch (error) {
        console.error("error while resetting message ", error);
      }
    },
  }))
);

export default useConversationContext;
