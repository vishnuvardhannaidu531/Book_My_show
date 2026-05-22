import { AUTH_BASE_URL } from "../../constants/config";
import { authClient } from "../../api/axios";

export const loginRequest = async (credentials) => {
  const { data } = await authClient.post(`${AUTH_BASE_URL}/login`, credentials);
  return data;
};

export const signupRequest = async (payload) => {
  const { data } = await authClient.post(`${AUTH_BASE_URL}/signup`, payload);
  return data;
};
