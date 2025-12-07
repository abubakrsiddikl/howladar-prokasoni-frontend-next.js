/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICartItem, IResponse } from "@/types";
import { IOrder } from "@/types/order.type";
import { apiRequest } from "../apiClient";
import { zodValidator } from "@/lib/zodValidator";
import {
  orderStatusSchema,
  paymentMethodSchema,
  shippingInfoSchema,
} from "@/zodSchema/order.schema";

export const getAllOrders = async (
  queryString?: string
): Promise<IResponse<IOrder[]>> => {
  const result = await apiRequest<IOrder[]>(
    `/order/all-order?${queryString ?? ""}`
  );
  return result;
};

// get customer orders
export const getCustomerOrders = async (
  queryString?: string
): Promise<IResponse<IOrder[]>> => {
  const result = await apiRequest<IOrder[]>(
    `/order/my-order?${queryString ?? ""}`
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

// create order
export const createOrder = async (
  cart: ICartItem[],
  _prevState: any,
  formData: FormData
): Promise<any> => {
  const validationPayload = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    division: formData.get("division"),
    district: formData.get("district"),
    city: formData.get("city"),
    paymentMethod: formData.get("paymentMethod"),
  };

  const shippingValidationResult = shippingInfoSchema.safeParse({
    name: validationPayload.name,
    email: validationPayload.email,
    phone: validationPayload.phone,
    address: validationPayload.address,
    division: validationPayload.division,
    district: validationPayload.district,
    city: validationPayload.city,
  });

  const paymentValidationResult = paymentMethodSchema.safeParse({
    paymentMethod: validationPayload.paymentMethod,
  });

  if (!shippingValidationResult.success || !paymentValidationResult.success) {
    const errors = {
      ...shippingValidationResult.error?.flatten().fieldErrors,
      ...paymentValidationResult.error?.flatten().fieldErrors,
    };

    return {
      success: false,
      message: "Validation failed",
      errors: errors,
    };
  }

  const orderItems = cart.map((item: any) => ({
    book: item.book._id, // assuming item.book._id is the Mongoose ObjectId (string)
    quantity: item.quantity,
  }));

  const totalDiscountedPrice = cart.reduce(
    (sum: number, item: any) =>
      sum + (item.book.discountedPrice || 0) * item.quantity,
    0
  );

  const payload = {
    items: orderItems,
    totalDiscountedPrice: totalDiscountedPrice,

    shippingInfo: shippingValidationResult.data,
    paymentMethod: paymentValidationResult.data.paymentMethod,
  };

  const result = await apiRequest<{ paymentUrl?: boolean }>("/order/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (result.data?.paymentUrl) {
    return {
      success: true,
      message: "SSLCommerz payment initiated. Redirecting...",
      paymentUrl: result.data.paymentUrl,
    };
  }

  return result;
};
