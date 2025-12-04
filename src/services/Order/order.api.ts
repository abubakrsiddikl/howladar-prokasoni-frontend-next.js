/* eslint-disable @typescript-eslint/no-explicit-any */
import { IResponse } from "@/types";
import { IOrder } from "@/types/order.type";
import { apiRequest } from "../apiClient";
import { zodValidator } from "@/lib/zodValidator";
import { orderStatusSchema } from "@/zodSchema/order.schema";

export const getAllOrders = async (
  queryString?: string
): Promise<IResponse<IOrder[]>> => {
  const result = await apiRequest<IOrder[]>(
    `/order/all-order?${queryString ?? ""}`
  );
  return result;
};

// get single order
export const getSingleOrder = async (
  orderId: string
): Promise<IResponse<IOrder>> => {
  const res = apiRequest<IOrder>(`/order/${orderId}`);
  return res;
};

// update order status
export const updateOrderStatus = async (
  id: string,
  _prevState: any,
  formData: FormData
) => {
  const validationPayload = {
    status: formData.get("status"),
  };
  const validatedPayload = zodValidator(validationPayload, orderStatusSchema);

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
  const result = await apiRequest(`/order/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify(validatedPayload.data),
  });
  return result;
};
