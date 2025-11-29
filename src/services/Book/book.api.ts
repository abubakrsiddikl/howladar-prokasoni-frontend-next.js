import { IBook, IGenre } from "@/types";
import { apiRequest } from "../apiClient";

// get all books
export const getAllBooks = async (
  params?: string,
  limit?: number
): Promise<IBook[]> => {
  const res = await apiRequest<IBook[]>(
    `/book/all-books?${params ?? ""}&limit=${limit ?? 10}`
  );
  return res.data;
};

// get single book by slug
export const getSingleBook = async (slug: string): Promise<IBook> => {
  const res = await apiRequest<IBook>(`/book/${slug}`);

  return res.data;
};

export const getAllGenres = async (): Promise<IGenre[]> => {
  const res = await apiRequest<IGenre[]>("/genre");
  return res.data;
};
