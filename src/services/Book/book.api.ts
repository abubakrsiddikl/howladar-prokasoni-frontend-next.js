/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { IBook, IHomeBook, IResponse } from "@/types";
import { apiRequest } from "../apiClient";
import { bookSchema } from "@/zodSchema/book.schema";
import { zodValidator } from "@/lib/zodValidator";
import { revalidateTag } from "next/cache";

// get all books
export const getAllBooks = async (
  queryString?: string,
): Promise<IResponse<IBook[]>> => {
  const res = await apiRequest<IBook[]>(`/book/all-books?${queryString ?? ""}`);
  return res;
};

export const getHomeBooks = async (): Promise<IResponse<IHomeBook[]>> => {
  const res = await apiRequest<IHomeBook[]>(`/book/home-books`, {
    next: {
      tags: ["books"],
      revalidate: 60 * 60 * 24,
    },
  });
  return res;
};

// get single book by slug
export const getSingleBook = async (slug: string): Promise<IBook> => {
  const res = await apiRequest<IBook>(`/book/${slug}`);

  return res.data;
};

export const createBook = async (
  _prevState: any,
  formData: FormData,
): Promise<any> => {
  // form values

  const validationPayload = {
    title: formData.get("title"),
    author: formData.get("author"),
    price: parseFloat(formData.get("price") as string),
    stock: parseFloat(formData.get("stock") as string),
    discount: parseFloat(formData.get("discount") as string),
    genre: formData.get("genre") as string,
    publisher: formData.get("publisher") as string,
    description: formData.get("description") as string,
  };

  const coverImage = formData.get("coverImage") as File | null;

  const previewImages = formData.getAll("previewImages") as File[];

  const validatedPayload = zodValidator(validationPayload, bookSchema);

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

  // prepare FormData for backend
  const backendData = new FormData();
  if (!coverImage) {
    return { success: false, message: "coverImage is required" };
  }

  backendData.append("data", JSON.stringify(validatedPayload.data));
  backendData.append("file", coverImage);
  previewImages.forEach((file) => {
    if (file instanceof File && file.size > 0) {
      backendData.append("files", file);
    }
  });

  const result = await apiRequest("/book/create", {
    method: "POST",
    body: backendData,
  });
  if (result.success) {
    revalidateTag("books", { expire: 0 });
  }
  return result;
};

// update book
export const updateBook = async (
  id: string,
  _prevState: any,
  formData: FormData,
): Promise<any> => {
  const validationPayload = {
    title: formData.get("title"),
    author: formData.get("author"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    discount: formData.get("discount"),
    genre: formData.get("genre"),
    publisher: formData.get("publisher"),
    description: formData.get("description"),
  };

  const coverImage = formData.get("coverImage") as File | null;

  // zod validation
  const validatedPayload = zodValidator(validationPayload, bookSchema);

  if (!validatedPayload.success) {
    return {
      success: false,
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

  const backendData = new FormData();

  backendData.append("data", JSON.stringify(validatedPayload.data));

  if (coverImage && coverImage.size > 0) {
    backendData.append("file", coverImage);
  }

  const result = await apiRequest(`/book/update/${id}`, {
    method: "PATCH",
    body: backendData,
  });

  if (result.success) {
    revalidateTag("books", { expire: 0 });
  }

  return result;
};

// delete book
export const deleteBook = async (id: string) => {
  const result = await apiRequest(`/book/delete/${id}`, {
    method: "DELETE",
  });
  if (result.success) {
    revalidateTag("books", { expire: 0 });
  }
  return result;
};
