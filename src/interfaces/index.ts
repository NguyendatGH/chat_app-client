export interface User {
  id: number;
  username: string;
  photo: string;
}

export interface Contact {
  id: number;
  username: string;
  photo: string;
  conversationId: number;
  userId: number;
  unreadMessages: number;
  lastMessages: {
    text: string;
    updateAt: string;
  };
  status: "online" | "offline";
}

export interface Messages {
  id: number;
  from: number;
  text: string;
  createAt: Date;
  conversationId: number;
}

export interface GetContactResponse {
  contacts: Contact[];
}

export interface CreateContactResponse {
  message?: string;
  contact: Contact;
}

export interface Conversation {
  id: number;
  participants: number[];
  message: Messages[];
}
export interface ConversationResponse {
  conversation: Conversation;
}
export interface AuthCredentials {
  username: string;
  passwords: string;
}

export interface AuthRespones {
  user: User;
  jwt: string;
}

export interface logoutResponse {
  message: string;
}