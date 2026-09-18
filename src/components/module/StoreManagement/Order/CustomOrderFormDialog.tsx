"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputFieldError from "@/components/shared/InputFieldError";
import { useLocationData } from "@/hooks/useLocationData";
import { createCustomOrder } from "@/services/Order/order.api";

interface CustomOrderFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CustomOrderFormDialog = ({
  open,
  onClose,
  onSuccess,
}: CustomOrderFormDialogProps) => {
  const [state, formAction, isPending] = useActionState(
    createCustomOrder,
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [orderType, setOrderType] = useState("REGULAR");
  const [orderSource, setOrderSource] = useState("MESSENGER");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [deliveryCharge, setDeliveryCharge] = useState("0");
  const {
    divisions,
    districts,
    cities,
    setDivision,
    setDistrict,
    selectedDivision,
    selectedDistrict,
  } = useLocationData();

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "কাস্টম অর্ডার সফলভাবে তৈরি হয়েছে।");
      formRef.current?.reset();
      onSuccess();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message || "কাস্টম অর্ডার তৈরি করা যায়নি।");
    }
  }, [state, onClose, onSuccess]);

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent className="flex h-[calc(100dvh-1rem)] max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-2xl flex-col overflow-hidden p-0 sm:h-auto sm:max-h-[90vh] sm:w-full">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>কাস্টম অর্ডার তৈরি করুন</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          action={formAction}
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
        >
          <div className="grid min-h-0 flex-1 auto-rows-max gap-4 overflow-y-auto overscroll-contain px-6 pb-4 pr-3 sm:grid-cols-2 sm:pr-6">
            <Field>
              <FieldLabel htmlFor="name">কাস্টমারের নাম</FieldLabel>
              <Input
                id="name"
                name="name"
                required
                placeholder="গ্রাহকের নাম লিখুন"
              />
              <InputFieldError field="shippingInfo.name" state={state} />
            </Field>
            <Field>
              <FieldLabel htmlFor="phone">মোবাইল নম্বর</FieldLabel>
              <Input
                id="phone"
                name="phone"
                required
                placeholder="মোবাইল নম্বর লিখুন"
              />
              <InputFieldError field="shippingInfo.phone" state={state} />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">ইমেইল (ঐচ্ছিক)</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ইমেইল লিখুন"
              />
              <InputFieldError field="shippingInfo.email" state={state} />
            </Field>
            <Field>
              <FieldLabel htmlFor="orderSource">অর্ডারের সোর্স</FieldLabel>
              <Select
                name="orderSource"
                value={orderSource}
                onValueChange={setOrderSource}
              >
                <SelectTrigger id="orderSource">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MESSENGER">MESSENGER</SelectItem>
                  <SelectItem value="WHATSAPP">WHATSAPP</SelectItem>
                  {/* <SelectItem value="WEBSITE">WEBSITE</SelectItem> */}
                  <SelectItem value="OTHER">OTHER</SelectItem>
                </SelectContent>
              </Select>
              <InputFieldError field="orderSource" state={state} />
            </Field>
            <Field>
              <FieldLabel htmlFor="orderType">অর্ডারের টাইপ</FieldLabel>
              <Select
                name="orderType"
                value={orderType}
                onValueChange={setOrderType}
              >
                <SelectTrigger id="orderType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="REGULAR">REGULAR</SelectItem>
                  <SelectItem value="CAMPAIGN">CAMPAIGN</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="paymentMethod">পেমেন্ট মেথড</FieldLabel>
              <Select
                name="paymentMethod"
                value={paymentMethod}
                onValueChange={setPaymentMethod}
              >
                <SelectTrigger id="paymentMethod">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="COD">ক্যাশ অন ডেলিভারি</SelectItem>
                  <SelectItem value="SSLCommerz">এসএসএল কমার্স</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="totalAmount">মোট মূল্য</FieldLabel>
              <Input
                id="totalAmount"
                name="totalAmount"
                type="number"
                min="0"
                required
                placeholder="৫৫০"
              />
              <InputFieldError field="totalAmount" state={state} />
            </Field>
            <Field>
              <FieldLabel htmlFor="deliveryCharge">ডেলিভারি চার্জ</FieldLabel>
              <Input
                id="deliveryCharge"
                name="deliveryCharge"
                type="number"
                min="0"
                value={deliveryCharge}
                onChange={(event) => setDeliveryCharge(event.target.value)}
                required
              />
              <InputFieldError field="deliveryCharge" state={state} />
            </Field>
            <Field>
              <FieldLabel htmlFor="division">বিভাগ</FieldLabel>
              <Select
                name="division"
                value={selectedDivision}
                onValueChange={setDivision}
              >
                <SelectTrigger id="division">
                  <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {divisions.map((division) => (
                    <SelectItem key={division} value={division}>
                      {division}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputFieldError field="shippingInfo.division" state={state} />
            </Field>
            <Field>
              <FieldLabel htmlFor="district">জেলা</FieldLabel>
              <Select
                name="district"
                value={selectedDistrict}
                onValueChange={setDistrict}
                disabled={!selectedDivision}
              >
                <SelectTrigger id="district">
                  <SelectValue placeholder="জেলা নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputFieldError field="shippingInfo.district" state={state} />
            </Field>
            <Field>
              <FieldLabel htmlFor="city">উপজেলা / সিটি</FieldLabel>
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
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="address">পূর্ণ ঠিকানা</FieldLabel>
              <Textarea
                id="address"
                name="address"
                required
                rows={3}
                placeholder="বাড়ি, রোড, এলাকা লিখুন"
              />
              <InputFieldError field="shippingInfo.address" state={state} />
            </Field>
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="description">
                অর্ডারের নোট (ঐচ্ছিক)
              </FieldLabel>
              <Textarea
                id="description"
                name="description"
                rows={2}
                placeholder="অর্ডার সম্পর্কে অতিরিক্ত তথ্য লিখুন"
              />
              <InputFieldError field="description" state={state} />
            </Field>
          </div>
          <div className="flex shrink-0 justify-end gap-2 border-t bg-gray-50 px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              বাতিল
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "তৈরি হচ্ছে..." : "অর্ডার তৈরি করুন"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomOrderFormDialog;
