/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodValidator } from "@/lib/zodValidator";
import { validatedBannerSchema } from "@/zodSchema/banner.schema";
import { apiRequest } from "../apiClient";
import { IBanner, IResponse } from "@/types";

// get all banner
export const getAllBanners = async (
  queryString?: string
): Promise<IResponse<IBanner[]>> => {
  const result = await apiRequest<IBanner[]>(
    `/banner/all-banners?${queryString ?? ""}`
  );
  return result;
};
export const getAllActiveBanners = async (): Promise<IResponse<IBanner[]>> => {
  const result = await apiRequest<IBanner[]>(`/banner/active-banners`);
  return result;
};

// create banner
export const createBanner = async (
  _prevState: any,
  formData: FormData
): Promise<any> => {
  const validationPayload = {
    title: formData.get("title"),
    link: formData.get("link"),

    active: formData.get("active") === "true",

    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  };


  const bannerImage = formData.get("image") as File | null;
  
  const validatedPayload = zodValidator(
    validationPayload,
    validatedBannerSchema
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

  if (
    !bannerImage ||
    !(bannerImage instanceof File) ||
    bannerImage.size === 0
  ) {
    return { success: false, message: "Banner image is required" };
  }

  backendData.append("data", JSON.stringify(validatedPayload.data));

  backendData.append("file", bannerImage);

  const result = await apiRequest("/banner/create", {
    method: "POST",
    body: backendData,
  });

  return result;
};

// update banner

export const updateBanner = async (
  id: string,
  _prevState: any,
  formData: FormData
): Promise<any> => {
  const validationPayload = {
    title: formData.get("title"),
    link: formData.get("link"),
    active: formData.get("active") === "true",
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  };

  const bannerImage = formData.get("image") as File | null;

  const validatedPayload = zodValidator(
    validationPayload,
    validatedBannerSchema
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

  if (bannerImage && bannerImage instanceof File && bannerImage.size > 0) {
    backendData.append("file", bannerImage);
  }

  const result = await apiRequest(`/banner/update/${id}`, {
    method: "PATCH",
    body: backendData,
  });

  return result;
};

// delete banner
export const deleteBanner = async (id: string): Promise<any> => {
  if (!id) {
    return {
      success: false,
      message: "Banner ID is required for deletion.",
    };
  }

  const result = await apiRequest(`/banner/delete/${id}`, {
    method: "DELETE",
  });
  return result;
};
