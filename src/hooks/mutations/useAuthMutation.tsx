import { useState } from "react";
import { login as loginApi, register as registerApi } from "@/api/authApi";
import useAuthContext from "@/store/authContext";
import { setItemToLocalStorage } from "@/utils/localStorage";
import { useMutation } from "@tanstack/react-query";
import errorHandler from "@/utils/errorHandler";
import { AuthCredentials, AuthResponse } from "@/interfaces";
import useSocketContext from "@/store/socketContext";

interface AuthMutation {
  value: AuthCredentials;
  type: "register" | "login";
}

const useAuthMutation = () => {
  const { login } = useAuthContext();
  const [error, setError] = useState<string>("");
  const { socket } = useSocketContext();

  const { isPending, isSuccess, isError, mutate } = useMutation<
    AuthResponse,
    Error,
    AuthMutation
  >({
    mutationFn: ({ value, type }: AuthMutation) => {
      return type === "register" ? registerApi(value) : loginApi(value);
    },
    onSuccess: ({ jwt, user }) => {
      //save infor to localStorage
      setItemToLocalStorage("user", user);
      setItemToLocalStorage("jwt", jwt);
      setItemToLocalStorage("isAuthenticated", true);

      //seting user to storage
      login({ jwt, user });

      //emit socket function
      socket.emit("login", user.id);
    },
    onError(error: unknown) {
      setError(errorHandler(error));
    },
  });

  return { isPending, isSuccess, isError, mutate, error };
};

export default useAuthMutation;
