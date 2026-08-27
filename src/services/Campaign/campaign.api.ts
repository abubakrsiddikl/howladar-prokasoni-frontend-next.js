/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodValidator } from "@/lib/zodValidator";
import { validatedCampaignSchema } from "@/zodSchema/campaign.schema";
import { apiRequest } from "../apiClient";
import { ICampaign, IResponse } from "@/types";

// Get all campaigns
export const getAllCampaigns = async (
  queryString?: string
): Promise<IResponse<ICampaign[]>> => {
  const result = await apiRequest<ICampaign[]>(
    `/campaign?${queryString ?? ""}`
  );
  return result;
};
// get single campaign by slug
export const getSingleCampaign = async (slug: string): Promise<ICampaign> => {
  const res = await apiRequest<ICampaign>(`/campaign/${slug}`);

  return res.data;
};

// Get all active campaigns
export const getAllActiveCampaigns = async (
  queryString?: string
): Promise<IResponse<ICampaign[]>> => {
  const result = await apiRequest<ICampaign[]>(
    `/campaign/active?${queryString ?? ""}`
  );
  return result;
};

// Create campaign
export const createCampaign = async (
  _prevState: any,
  formData: FormData
): Promise<any> => {
  const validationPayload = {
    title: formData.get("title"),
    description: formData.get("description"),
    campaignPrice: formData.get("campaignPrice"),
    isActive: formData.get("isActive") === "true",
  };

  const bannerImage = formData.get("image") as File | null;

  const validatedPayload = zodValidator(
    validationPayload,
    validatedCampaignSchema
  );

  if (!validatedPayload.success || !validatedPayload.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors || null,
    };
  }

  if (!bannerImage || !(bannerImage instanceof File) || bannerImage.size === 0) {
    return { success: false, message: "Campaign banner image is required" };
  }

  const backendData = new FormData();
  backendData.append("data", JSON.stringify(validatedPayload.data));
  backendData.append("file", bannerImage);

  const result = await apiRequest("/campaign", {
    method: "POST",
    body: backendData,
  });

  return result;
};

// Update campaign
export const updateCampaign = async (
  id: string,
  _prevState: any,
  formData: FormData
): Promise<any> => {
  const validationPayload = {
    title: formData.get("title"),
    description: formData.get("description"),
    campaignPrice: formData.get("campaignPrice"),
    isActive: formData.get("isActive") === "true",
  };

  const bannerImage = formData.get("image") as File | null;

  const validatedPayload = zodValidator(
    validationPayload,
    validatedCampaignSchema
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

  const result = await apiRequest(`/campaign/update/${id}`, {
    method: "PATCH",
    body: backendData,
  });

  return result;
};

// Delete campaign
export const deleteCampaign = async (id: string): Promise<any> => {
  if (!id) {
    return {
      success: false,
      message: "Campaign ID is required for deletion.",
    };
  }

  const result = await apiRequest(`/campaign/delete/${id}`, {
    method: "DELETE",
  });
  return result;
};