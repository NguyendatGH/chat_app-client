import axiosInstance from "./axiosInstance";
import {
  ConversationResponse,
  CreateContactResponse,
  GetContactResponse,
} from "@/interfaces";
import { getItemFromLocalStorage } from "@/utils/localStorage";
const defaultHeader = () => {
  return {
    Authorization: `Bearer ${getItemFromLocalStorage("jwt")}`,
    "Content-type": "application/json",
  };
};

export const getContact = (): Promise<GetContactResponse> => {
  return axiosInstance
    .get("/contact", { headers: defaultHeader() })
    .then((response) => response.data);
};

export const createContact = (
  username: string
): Promise<CreateContactResponse> => {
  return axiosInstance
    .post("/contact", { username }, { headers: defaultHeader() })
    .then((response) => response.data);
};

export const getConversation = (
  id: number | null
): Promise<ConversationResponse> => {
  return axiosInstance
    .get(`conversation/${id}`, { headers: defaultHeader() })
    .then((response) => response.data);
};
