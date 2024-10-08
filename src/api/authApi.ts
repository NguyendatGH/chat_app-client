import { AuthCredentials, AuthRespones, logoutResponse } from "@/interfaces";
import axiosInstance from "./axiosInstance";

export const login = (credentials: AuthCredentials): Promise<AuthRespones> => {
  return axiosInstance.post("/auth/login", credentials).then((res) => res.data);
};

export const register = (
  credentials: AuthCredentials
): Promise<AuthRespones> => {
  return axiosInstance
    .post("/auth/register", credentials)
    .then((res) => res.data);
};

export const logout = (): Promise<logoutResponse> => {
  return axiosInstance.get("/auth/logout").then((res) => res.data);
};
