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
  lastMessage: {
    text: string;
    updateAt: string;
  } | null;
  status: "online" | "offline";
}

export interface Message {
  id: number;
  from: number;
  text: string;
  createdAt: Date;
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
  messages: Message[];
}
export interface ConversationResponse {
  conversation: Conversation;
}
export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  jwt: string;
}

export interface logoutResponse {
  message: string;
}
