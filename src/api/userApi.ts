import axiosInstance from "./axiosInstance";
import {
  ConversationResponse,
  CreateContactResponse,
  GetContactResponse,
} from "@/interfaces";
import { getItemFromLocalStorage } from "@/utils/localStorage";

const defaultHeaders = () => {
  return {
    Authorization: `Bearer ${getItemFromLocalStorage("jwt")}`,
    "Content-type": "application/json",
  };
};

// console.log(defaultHeaders()); 

export const getContacts = async (): Promise<GetContactResponse> => {
  try {
    const response = await axiosInstance.get("/contact", {
      headers: defaultHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

export const createContact = (
  username: string
): Promise<CreateContactResponse> =>
  axiosInstance
    .post("/contact", { username }, { headers: defaultHeaders() })
    .then((response) => {
      console.log("create new user!" +response.data);
      return response.data
    });

    export const getConversation = (
      id: number | null
    ): Promise<ConversationResponse> => {
      return axiosInstance
        .get(`/conversation/${id}`, { headers: defaultHeaders() })
        .then((response) => {
          console.log("get conversation from front end / user api: ",response.data);
          return response.data;
        });
    };