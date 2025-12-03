import { IBanner } from "@/types";
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
import { createBanner, updateBanner } from "@/services/Banner/banner.api";
interface IBookFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  banner?: IBanner;
}

const BannerFormDialog = ({
  open,
  onClose,
  onSuccess,
  banner,
}: IBookFormDialogProps) => {
  const [activeStatus, setActiveStatus] = useState<string>(() => {
    if (banner) {
      return banner.active ? "true" : "false";
    }
    return "false";
  });
  const isEdit = !!banner;
  const [state, formAction, pending] = useActionState(
    isEdit ? updateBanner.bind(null, banner._id!) : createBanner,
    null
  );
  const [image, setImage] = useState<File | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleClose = () => {
    onClose(); // Close dialog
  };

  // form state handle
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

  // handle file upload and genre
  const handleSubmit = (formData: FormData) => {
    if (image) {
      formData.append("image", image);
    }
    formData.append("active", activeStatus);
    formAction(formData);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit ? "Edit Book" : "Add New Book"}</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={handleSubmit}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Title */}
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="Enter banner title"
                defaultValue={banner?.title || ""}
              />
              <InputFieldError field="title" state={state} />
            </Field>

            {/* Link */}
            <Field>
              <FieldLabel htmlFor="link">Link (Optional)</FieldLabel>
              <Input
                id="link"
                name="link"
                placeholder="Enter target URL (e.g., https://...)"
                defaultValue={banner?.link || ""}
              />
              <InputFieldError field="link" state={state} />
            </Field>

            {/* Active Status */}
            <Field>
              <FieldLabel htmlFor="active">Status</FieldLabel>
              <Select onValueChange={setActiveStatus} value={activeStatus}>
                <SelectTrigger id="active">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <InputFieldError field="active" state={state} />
            </Field>

            {/* Start Date & End Date */}
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="startDate">
                  Start Date (Optional)
                </FieldLabel>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  defaultValue={
                    banner?.startDate ? banner.startDate.substring(0, 10) : ""
                  }
                />
                <InputFieldError field="startDate" state={state} />
              </Field>

              <Field>
                <FieldLabel htmlFor="endDate">End Date (Optional)</FieldLabel>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  defaultValue={
                    banner?.endDate ? banner.endDate.substring(0, 10) : ""
                  }
                />
                <InputFieldError field="endDate" state={state} />
              </Field>
            </div>

            {/* Image Uploader */}
            <div>
              <FieldLabel>Upload Banner Image</FieldLabel>
              <SingleImageUploader onChange={setImage} />
              {isEdit && banner?.image && (
                <Image
                  src={banner.image}
                  alt="Current Banner Image"
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
                ? "Update Banner"
                : "Create Banner"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BannerFormDialog;
