/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { IGenre, IResponse } from "@/types";
import { apiRequest } from "../apiClient";
import { zodValidator } from "@/lib/zodValidator";
import { genreSchema } from "@/zodSchema/genre.schema";


export const getAllGenres = async (
  queryString?: string
): Promise<IResponse<IGenre[]>> => {
  const res = await apiRequest<IGenre[]>(`/genre?${queryString ?? ""}`);
  return res;
};

// get sorted genre by book count
export const getAllSortedGenre = async (): Promise<IResponse<IGenre[]>> => {
  const res = await apiRequest<IGenre[]>(`/genre/sorted`);
  return res;
};

// create genre
export const createGenre = async (
  _prevState: any,
  formData: FormData
): Promise<any> => {
  const validationPayload = {
    name: formData.get("name"),
    description: formData.get("description"),
  };
  const validatedPayload = zodValidator(validationPayload, genreSchema);

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: validatedPayload.success,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors,
    };
  }

  if (!validatedPayload.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
    };
  }
  const result = await apiRequest("/genre/create", {
    method: "POST",
    body: JSON.stringify(validatedPayload.data),
  });

  return result;
};

// delete genre
export const deleteGenre = async (id: string) => {
  const result = await apiRequest(`/genre/${id}`, {
    method: "DELETE",
  });
  return result;
};
