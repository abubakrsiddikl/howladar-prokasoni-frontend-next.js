import { useActionState, useEffect, useRef } from "react";
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
import { createGenre } from "@/services/Genre/genre.api";

interface IGenreFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const GenreFormDialog = ({
  open,
  onClose,
  onSuccess,
}: IGenreFormDialogProps) => {
  const [state, formAction, pending] = useActionState(createGenre, null);

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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{"Add New Genre"}</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            <Field>
              <FieldLabel htmlFor="name">Genre Name</FieldLabel>
              <Input id="name" name="name" placeholder="Enter book name" />
              <InputFieldError field="name" state={state} />
            </Field>

            {/* Description */}
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                id="description"
                name="description"
                placeholder="Enter description "
              />
              <InputFieldError field="description" state={state} />
            </Field>
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
              {pending ? "Saving..." : "Create Genre"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GenreFormDialog;
