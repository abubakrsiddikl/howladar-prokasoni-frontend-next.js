"use client";

import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputFieldError from "@/components/shared/InputFieldError";
import { useLocationData } from "@/hooks/useLocationData";
import { createCampaignOrder } from "@/services/Order/order.api";
import { ICampaign } from "@/types";
import { trackMetaEvent } from "@/components/shared/MetaPixelEvent";




interface ICampaignCheckoutFormProps {
  campaign: ICampaign;
}

export default function CampaignCheckoutForm({
  campaign,
}: ICampaignCheckoutFormProps) {
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

  const deliveryCharge = selectedDistrict === "ঢাকা" ? 60 : 120;
  const totalAmount = campaign.campaignPrice + deliveryCharge;

  const [state, formAction, isPending] = useActionState(
    createCampaignOrder.bind(null, []),
    null,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success("অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!");
      router.push(`/success-order/${state?.data?.orderId}`);
      trackMetaEvent("Purchase", {
        content_ids: [campaign._id],
        content_name: campaign.title,
        content_type: "product",
        value: totalAmount,
        currency: "BDT",
      });
    } else if (state?.success === false) {
      toast.error(state.message || "অর্ডার সম্পন্ন করতে সমস্যা হয়েছে।");
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      onSubmit={() => {
        trackMetaEvent("InitiateCheckout", {
          content_ids: campaign._id ? [campaign._id] : [],
          content_name: campaign.title,
          content_type: "product",
          value: totalAmount,
          currency: "BDT",
        });
      }}
      className="space-y-4"
    >
      {/* Hidden Fields for Campaign Information */}
      <input type="hidden" name="campaignId" value={campaign._id} />
      <input type="hidden" name="orderType" value="CAMPAIGN" />
      <input type="hidden" name="paymentMethod" value="COD" />
      <input type="hidden" name="totalAmount" value={totalAmount} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="name">নাম</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder="আপনার নাম"
          />
          <InputFieldError field="name" state={state} />
        </Field>

        <Field>
          <FieldLabel htmlFor="phone">মোবাইল নাম্বার</FieldLabel>
          <Input
            id="phone"
            name="phone"
            type="text"
            required
            placeholder="মোবাইল নাম্বার"
          />
          <InputFieldError field="phone" state={state} />
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

      <Field>
        <FieldLabel htmlFor="address">পূর্ণ ঠিকানা</FieldLabel>
        <Textarea
          id="address"
          name="address"
          rows={3}
          required
          placeholder="বাসা নং, রোড নং, এরিয়া..."
        />
        <InputFieldError field="shippingInfo.address" state={state} />
      </Field>

      <Field>
        <FieldLabel htmlFor="paymentMethod">পেমেন্ট পদ্ধতি</FieldLabel>
        <Input id="paymentMethod" value="ক্যাশ অন ডেলিভারি (COD)" readOnly />
      </Field>

      {/* Summary Box */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2 text-sm text-gray-600 mt-4">
        <div className="flex justify-between gap-4">
          <span>কম্বো অফার মূল্য:</span>
          <span className="font-semibold text-gray-900">
            ৳ {campaign.campaignPrice}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span>ডেলিভারি চার্জ:</span>
          <span className="font-semibold text-gray-900">
            ৳ {deliveryCharge}
          </span>
        </div>
        <div className="border-t pt-2 flex justify-between gap-4 font-bold text-base text-gray-900">
          <span>সর্বমোট মূল্য:</span>
          <span className="text-blue-600">৳ {totalAmount}</span>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5 text-base sm:text-lg rounded-lg shadow-md transition-all cursor-pointer mt-4"
      >
        {isPending ? "অর্ডার নেওয়া হচ্ছে..." : `Order Now (৳ ${totalAmount})`}
      </Button>
    </form>
  );
}
