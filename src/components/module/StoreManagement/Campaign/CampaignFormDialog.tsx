import { ICampaign } from "@/types";
import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import InputFieldError from "@/components/shared/InputFieldError";
import SingleImageUploader from "@/components/shared/SingleImageUploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import {
  createCampaign,
  updateCampaign,
} from "@/services/Campaign/campaign.api";
import { Textarea } from "@/components/ui/textarea";

interface ICampaignFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  campaign?: ICampaign;
}

const CampaignFormDialog = ({
  open,
  onClose,
  onSuccess,
  campaign,
}: ICampaignFormDialogProps) => {
  const [activeStatus, setActiveStatus] = useState<string>(() => {
    if (campaign) {
      return campaign.isActive ? "true" : "false";
    }
    return "true";
  });

  const [isDeliveryFree, setIsDeliveryFree] = useState<string>(() => {
    if (campaign) {
      return campaign.isDeliveryFree ? "true" : "false";
    }
    return "false";
  });

  const isEdit = !!campaign;
  const [state, formAction, pending] = useActionState(
    isEdit ? updateCampaign.bind(null, campaign._id!) : createCampaign,
    null,
  );
  const [image, setImage] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (state?.success && state.message) {
      toast.success(state.message);
      if (formRef.current) {
        formRef.current.reset();
      }
      onSuccess();
      onClose();
    } else if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  const handleSubmit = (formData: FormData) => {
    if (image) {
      formData.append("image", image);
    }
    formData.append("isDeliveryFree", isDeliveryFree);
    formData.append("isActive", activeStatus);
    formAction(formData);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            {isEdit ? "Edit Campaign" : "Add New Campaign"}
          </DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={handleSubmit}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Title */}
            <Field>
              <FieldLabel htmlFor="title">Campaign Title</FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="Ex: Combo Offer: 3 Books at 999 BDT"
                defaultValue={campaign?.title || ""}
              />
              <InputFieldError field="title" state={state} />
            </Field>

            {/* Description */}
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter details about books included in this offer"
                defaultValue={campaign?.description || ""}
              />
              <InputFieldError field="description" state={state} />
            </Field>

            {/* Price & Delivery Charge */}
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="campaignPrice">
                  Campaign Price (BDT)
                </FieldLabel>
                <Input
                  id="campaignPrice"
                  name="campaignPrice"
                  type="number"
                  placeholder="Ex: 999"
                  defaultValue={campaign?.campaignPrice || ""}
                />
                <InputFieldError field="campaignPrice" state={state} />
              </Field>
            </div>

            {/* Delivery Charge */}
            <Field>
              <FieldLabel htmlFor="isDeliveryFree">Delivery Type</FieldLabel>
              <Select onValueChange={setIsDeliveryFree} value={isDeliveryFree}>
                <SelectTrigger id="isDeliveryFree">
                  <SelectValue placeholder="Select Delivery Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Free Delivery</SelectItem>
                  <SelectItem value="false">Paid Delivery</SelectItem>
                </SelectContent>
              </Select>
              <InputFieldError field="isDeliveryFree" state={state} />
            </Field>

            {/* Status */}
            <Field>
              <FieldLabel htmlFor="isActive">Status</FieldLabel>
              <Select onValueChange={setActiveStatus} value={activeStatus}>
                <SelectTrigger id="isActive">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <InputFieldError field="isActive" state={state} />
            </Field>

            {/* Image Uploader */}
            <div>
              <FieldLabel>Upload Campaign Banner</FieldLabel>
              <SingleImageUploader onChange={setImage} />
              {isEdit && campaign?.bannerImage && (
                <Image
                  src={campaign.bannerImage}
                  alt="Current Campaign Image"
                  height={100}
                  width={200}
                  className="mt-2 h-24 w-auto rounded object-cover"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending
                ? "Saving..."
                : isEdit
                  ? "Update Campaign"
                  : "Create Campaign"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignFormDialog;
