
import useAuthContext from "@/store/authContext";
import useSocketContext from "@/store/socketContext";
import errorHandler from "@/utils/errorHandler";
import { setItemToLocalStorage } from "@/utils/localStorage";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { register } from "@/api/authApi";
import { AuthResponse } from "@/interfaces";

export interface FormValues {
  username: string;
  password: string;
}
const useRegisterMutation = () => {
  const authContext = useAuthContext();
  const { socket } = useSocketContext();
  const [error, setError] = useState("");

  const mutation = useMutation<AuthResponse, Error, FormValues>({
    mutationFn: (value: FormValues) => register(value),
    onSuccess: (response: AuthResponse) => {
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
  return {
    mutation,
    error,
  };
};

export default useRegisterMutation;
