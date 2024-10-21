import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createContact } from "@/api/userApi";
import useModalContext from "@/store/modalContext";
import errorHandler from "@/utils/errorHandler";
import useContactsContext from "@/store/contactsContext";
import { CreateContactResponse } from "@/interfaces";

const useAddContactMutation = () => {
  const { closeModal } = useModalContext();
  const { addContact } = useContactsContext();
  const [error, setError] = useState<string>("");

  const { mutate , isPending } = useMutation<CreateContactResponse, Error, string>({
    mutationFn: (username: string) => createContact(username), //maintain the datatype match with useMutation
    onSuccess: (response: CreateContactResponse) => {
      console.log("useAddContactMutation/ respone success: ", response);
      addContact(response.contact);
      closeModal();
    },
    onError: (error: unknown) => {
      setError(errorHandler(error));
    },
  });

  return {
   mutate, error, isPending
  };
};

export default useAddContactMutation;
