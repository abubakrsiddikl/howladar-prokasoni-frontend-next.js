import { IResponse } from "@/types";
import { IOrder } from "@/types/order.type";
import { apiRequest } from "../apiClient";

export const getAllOrders = async (
  queryString?: string
): Promise<IResponse<IOrder[]>> => {
  const result = await apiRequest<IOrder[]>(
    `/order/all-order?${queryString ?? ""}`
  );
  return result;
};
