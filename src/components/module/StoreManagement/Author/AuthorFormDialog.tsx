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

import Image from "next/image";
import { IAuthor } from "@/types";
import { createAuthor, updateAuthor } from "@/services/Author/author.api";

interface IAuthorFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  author?: IAuthor;
}

const AuthorFormDialog = ({
  open,
  onClose,
  onSuccess,
  author,
}: IAuthorFormDialogProps) => {
  const isEdit = !!author;
  const [state, formAction, pending] = useActionState(
    isEdit ? updateAuthor.bind(null, author._id) : createAuthor,
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
      formData.append("coverImage", image);
    }

    formAction(formData);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit ? "Edit author" : "Add New author"}</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={handleSubmit}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Enter author name"
                defaultValue={author?.name || ""}
              />
              <InputFieldError field="name" state={state} />
            </Field>

            {/* bio */}
            <Field>
              <FieldLabel htmlFor="Bio">Bio (Optional)</FieldLabel>
              <Input
                id="bio"
                name="bio"
                placeholder="Enter bio name"
                defaultValue={author?.bio || ""}
              />
              <InputFieldError field="bio" state={state} />
            </Field>

            {/* birth date */}
            <Field>
              <FieldLabel htmlFor="birthDate">Birth Date (Optional)</FieldLabel>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                defaultValue={author?.birthDate || ""}
              />
              <InputFieldError field="birthDate" state={state} />
            </Field>

            {/* author profile image */}
            <div>
              <FieldLabel>Upload author Profile Image (Optional)</FieldLabel>
              <SingleImageUploader onChange={setImage} />
              {author?.profileImage && !image && (
                <Image
                  src={author.profileImage}
                  alt="Current Cover"
                  height={96}
                  width={96}
                  className="mt-2 h-24 rounded"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending
                ? "Saving..."
                : isEdit
                ? "Update author"
                : "Create author"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthorFormDialog;
