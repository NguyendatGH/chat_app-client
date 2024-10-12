import { login } from "@/api/authApi";
import { AuthResponse } from "@/interfaces";
import useAuthContext from "@/store/authContext";
import useSocketContext from "@/store/socketContext";
import errorHandler from "@/utils/errorHandler";
import { setItemToLocalStorage } from "@/utils/localStorage";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export interface FormValue {
  username: string;
  password: string;
}

const useLoginMutation = () => {
  const authContext = useAuthContext();
  const { socket } = useSocketContext();
  const [error, setError] = useState("");

  const mutation = useMutation<AuthResponse, Error, FormValue>({
    mutationFn: (value: FormValue) => login(value),
    onSuccess: (response) => {
      setItemToLocalStorage("user", response.user);
      setItemToLocalStorage("jwt", response.jwt);
      setItemToLocalStorage("isAuthenticated", true);
      authContext.login(response);

      socket.emit("login", response.user.id);
    },
    onError: (error) => {
      setError(errorHandler(error));
    },
  });
  return {mutation, error}
};

export default useLoginMutation;
