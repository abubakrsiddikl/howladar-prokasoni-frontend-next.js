/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import  { useActionState, useEffect, useRef } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputFieldError from "@/components/shared/InputFieldError"; 
import { toast } from "sonner";
import { traceOrder } from "@/services/Order/order.api";
import OrderTimeline from "../OrderTimeline";


const initialState: any = {
  success: false,
  message: "",
  data: null,
  errors: null,
  timestamp: Date.now(),
};

const OrderTraceContent = () => {
 
  const [state, formAction, pending] = useActionState(traceOrder, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && state.timestamp !== initialState.timestamp) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);
  console.log(state.errors)

  const renderOrderResult = () => {
    if (state.success && state.data) {
      return <OrderTimeline order={state.data}></OrderTimeline>;
    }

    return null;
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-lg bg-white p-6 md:p-10 rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
          অর্ডার নম্বর লিখুন
        </h2>

        <form ref={formRef} action={formAction} className="space-y-4">
          {/* input filed */}
          <div className="relative">
            <Input
              id="orderId"
              name="orderId"
              placeholder="অর্ডার নম্বর লিখুন"
              className="w-full py-6 text-center text-lg placeholder:text-gray-400"
            />
          </div>

          {/* Input error */}
          <InputFieldError field="orderId" state={state} />

          {/* button */}
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-xl rounded-lg transition duration-200"
            disabled={pending}
          >
            {pending ? "অনুসন্ধান হচ্ছে..." : "দেখুন"}
          </Button>
        </form>

        {/* information */}
        {!state.success && (
          <div className="mt-6 text-sm text-gray-500 text-center space-y-3">
            <p>
              আপনি যদি আপনার অর্ডার নম্বর ভুলে যান, দয়া করে আপনার মোবাইল ফোন
              থেকে ইমেইল বক্স চেক করুন। যদি আপনার ইমেইল বক্স মেসেজ হারিয়ে গিয়ে
              থাকে, তাহলে অনুগ্রহ করে লগইন করুন। আপনার পুরনো অর্ডারের দেখুন।
              আপনার অর্ডারের তারিখ দিয়ে সার্চ করার চেষ্টা করুন।
            </p>
          </div>
        )}

        {/* show statusLogs */}
        <div className="mt-5">
            {renderOrderResult()}
        </div>

        
      </div>
    </div>
  );
};

export default OrderTraceContent;
