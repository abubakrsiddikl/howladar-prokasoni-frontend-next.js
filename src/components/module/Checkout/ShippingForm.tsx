"use client";
import React, { useActionState, useEffect, useState } from "react";
import useCart from "@/hooks/useCart";
import { useLocationData } from "@/hooks/useLocationData";
import { IPaymentMethod } from "@/types";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import InputFieldError from "@/components/shared/InputFieldError";
import { createOrder } from "@/services/Order/order.api";
import OrderSummary from "./OrderSummary";

export default function ShippingForm() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const {
    divisions,
    districts,
    cities,
    setDivision,
    setDistrict,
    selectedDivision,
    selectedDistrict,
  } = useLocationData();

  const [paymentMethod, setPaymentMethod] = useState<IPaymentMethod>("COD");

  const [state, formAction, isPending] = useActionState(
    createOrder.bind(null, cart),
    null
  );

  const totalDiscountedPrice = cart.reduce(
    (sum: number, item) =>
      sum + (item.book.discountedPrice || 0) * item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (sum: number, item) => sum + item.book.price * item.quantity,
    0
  );

  // calculate deliveryCharge
  let deliveryCharge = 0;
  
  if (selectedDistrict === "ঢাকা") {
    
    deliveryCharge = 60;
  } else if (selectedDistrict) {
    
    deliveryCharge = 120;
  }
  const totalAmount = subtotal + deliveryCharge;

  const handleDivisionChange = (value: string) => {
    setDivision(value);
  };

  const handleDistrictChange = (value: string) => {
    setDistrict(value);
  };

  useEffect(() => {
    if (state?.success && state.paymentUrl) {
      toast.info("SSLCommerz to redirect");
      clearCart();

      window.location.href = state.paymentUrl;
    } else if (state?.success) {
      toast.success(state.message || "Order created successfully!");
      clearCart();
      router.push(`/order/order-success/${state?.data?.orderId}`);
    } else if (state?.success === false) {
      toast.error(state.message || "Failed to create order.");
    }
  }, [state, clearCart, router]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-5 rounded shadow md:col-span-2 space-y-6">
        <h2 className="text-xl font-semibold mb-4">ডেলিভারি ঠিকানা</h2>

        <form action={formAction} className="space-y-3">
          {/* Name, Email, Phone */}
          <div className="flex flex-col md:flex-row gap-2">
            {/* Name */}
            <div className="w-full">
              <Field>
                <FieldLabel htmlFor="name">নাম</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="আপনার নাম"
                />
                <InputFieldError field="name" state={state} />
              </Field>
            </div>

            {/* Email */}
            <div className="w-full">
              <Field>
                <FieldLabel htmlFor="email">ইমেইল</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="আপনার ইমেইল"
                />
                <InputFieldError field="email" state={state} />
              </Field>
            </div>

            {/* Phone */}
            <div className="w-full">
              <Field>
                <FieldLabel htmlFor="phone">মোবাইল নাম্বার</FieldLabel>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="মোবাইল নাম্বার"
                />
                <InputFieldError field="phone" state={state} />
              </Field>
            </div>
          </div>

          {/* Division, District, City (Location Fields) */}
          <div className="flex flex-col md:flex-row gap-2">
            {/* Division */}
            <div className="w-full">
              <Field>
                <FieldLabel htmlFor="division">বিভাগ</FieldLabel>
                <Select
                  name="division"
                  onValueChange={handleDivisionChange} // 💡
                  value={selectedDivision}
                >
                  <SelectTrigger id="division">
                    <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisions.map((div) => (
                      <SelectItem key={div} value={div}>
                        {div}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <InputFieldError field="shippingInfo.division" state={state} />
              </Field>
            </div>

            {/* District */}
            <div className="w-full">
              <Field>
                <FieldLabel htmlFor="district">জেলা</FieldLabel>
                <Select
                  name="district"
                  onValueChange={handleDistrictChange}
                  value={selectedDistrict}
                  disabled={!selectedDivision}
                >
                  <SelectTrigger id="district">
                    <SelectValue placeholder="জেলা নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((dist) => (
                      <SelectItem key={dist} value={dist}>
                        {dist}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <InputFieldError field="shippingInfo.district" state={state} />
              </Field>
            </div>

            {/* City */}
            <div className="w-full">
              <Field>
                <FieldLabel htmlFor="city">উপজেলা/সিটি</FieldLabel>
                <Select name="city" disabled={!selectedDistrict}>
                  <SelectTrigger id="city">
                    <SelectValue placeholder="উপজেলা নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <InputFieldError field="shippingInfo.city" state={state} />
              </Field>
            </div>
          </div>

          {/* Address */}
          <div>
            <Field>
              <FieldLabel htmlFor="address">পূর্ণ ঠিকানা</FieldLabel>
              <Textarea
                id="address"
                name="address"
                rows={3}
                placeholder="বাসা নং, রোড নং, এরিয়া..."
              ></Textarea>
              <InputFieldError field="shippingInfo.address" state={state} />
            </Field>
          </div>

          {/* Payment Method Selector (Added) */}
          <div>
            <Field>
              <FieldLabel htmlFor="paymentMethod">পেমেন্ট পদ্ধতি</FieldLabel>
              <Select
                onValueChange={(v) => setPaymentMethod(v as IPaymentMethod)}
                value={paymentMethod}
              >
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="পেমেন্ট পদ্ধতি নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="COD">ক্যাশ অন ডেলিভারি (COD)</SelectItem>
                  <SelectItem value="SSLCommerz">
                    SSLCommerz (Online)
                  </SelectItem>
                </SelectContent>
              </Select>

              <input type="hidden" name="paymentMethod" value={paymentMethod} />
              <InputFieldError field="paymentMethod" state={state} />
            </Field>
          </div>

          {/* Button */}
          <Button
            type="submit"
            disabled={isPending || cart.length === 0}
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer w-full mt-4 ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isPending
              ? "অর্ডারটি নিশ্চিত হচ্ছে ..."
              : `অর্ডারটি নিশ্চিত করুন ৳ ${totalAmount}`}
          </Button>
        </form>
      </div>
      <OrderSummary
        subtotal={subtotal}
        deliveryCharge={deliveryCharge}
        total={totalAmount}
        totalDiscount={totalDiscountedPrice}
      />
    </div>
  );
}
