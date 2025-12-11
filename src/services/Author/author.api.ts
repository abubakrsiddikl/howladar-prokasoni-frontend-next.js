/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodValidator } from "@/lib/zodValidator";
import {
  createAuthorZodSchema,
  updateAuthorZodSchema,
} from "@/zodSchema/author.schema";
import { apiRequest } from "../apiClient";
import { IAuthor, IResponse } from "@/types";

export const getAllAuthors = async (
  queryString?: string
): Promise<IResponse<IAuthor[]>> => {
  const res = await apiRequest<IAuthor[]>(`/author?${queryString ?? ""}`);
  return res;
};

export const getSingleAuthorsWithBooks = async (
  slug: string
): Promise<IResponse<IAuthor>> => {
  const res = await apiRequest<IAuthor>(`/author/${slug}`);
  return res;
};

// create author
export const createAuthor = async (
  _prevState: any,
  formData: FormData
): Promise<any> => {
  const validationPayload = {
    name: formData.get("name"),
    bio: formData.get("bio"),
    birthDate: formData.get("birthDate"),
  };

  const profileImage = formData.get("image") as File | null;
  const validatedPayload = zodValidator(
    validationPayload,
    createAuthorZodSchema
  );

  if (!validatedPayload.success || !validatedPayload.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors || null,
    };
  }

  const backendData = new FormData();

  backendData.append("data", JSON.stringify(validatedPayload.data));
  backendData.append("file", profileImage as File);

  // 5. API কল করা
  const result = await apiRequest("/author/create", {
    method: "POST",
    body: backendData,
  });

  return result;
};

export const updateAuthor = async (
  id: string,
  _prevState: any,
  formData: FormData
): Promise<any> => {
  const validationPayload = {
    name: formData.get("name"),
    bio: formData.get("bio"),
    birthDate: formData.get("birthDate"),
  };

  const profileImage = formData.get("image") as File | null;

  const validatedPayload = zodValidator(
    validationPayload,
    updateAuthorZodSchema
  );

  if (!validatedPayload.success || !validatedPayload.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors || null,
    };
  }

  const backendData = new FormData();

  backendData.append("data", JSON.stringify(validatedPayload.data));

  if (profileImage && profileImage instanceof File && profileImage.size > 0) {
    backendData.append("file", profileImage);
  }

  const result = await apiRequest(`/author/update/${id}`, {
    method: "PATCH",
    body: backendData,
  });

  return result;
};

// delete author
export const deleteAuthor = async (id: string) => {
  const result = apiRequest(`/author/delete/${id}`, {
    method: "DELETE",
  });
  return result;
};
