import http from "./http";
import type { User } from "../types/User";

export const getUsers = async (): Promise<User[]> => {
  const response = await http.get<User[]>("/users");
  return response.data;
};

export const createUser = async (data: User): Promise<User> => {
  const response = await http.post<User>("/users", data);
  return response.data;
};

export const updateUser = async (
  id: number | string,
  data: User,
): Promise<User> => {
  const response = await http.put<User>(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: number | string): Promise<void> => {
  await http.delete(`/users/${id}`);
};
