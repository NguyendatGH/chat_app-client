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

  const mutation = useMutation<CreateContactResponse, Error, string>({
    mutationFn: (username: string) => createContact(username), //maintain the datatype match with useMutation
    onSuccess: (response: CreateContactResponse) => {
      addContact(response.contact);
      closeModal();
    },
    onError: (error: unknown) => {
      setError(errorHandler(error));
    },
  });

  return {
    mutate: mutation.mutate,
    error,
    status: mutation.status,
  };
};

export default useAddContactMutation;