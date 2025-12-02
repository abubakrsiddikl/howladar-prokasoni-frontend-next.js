import { IGenre } from "@/types";
import { apiRequest } from "../apiClient";

export const getAllGenres = async (): Promise<IGenre[]> => {
  const res = await apiRequest<IGenre[]>("/genre");
  return res.data;
};