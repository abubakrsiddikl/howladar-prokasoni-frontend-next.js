import { IBook, IGenre } from "@/types";
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

import { createBook, updateBook } from "@/services/Book/book.api";
import { toast } from "sonner";
import InputFieldError from "@/components/shared/InputFieldError";
import { Textarea } from "@/components/ui/textarea";
import SingleImageUploader from "@/components/shared/SingleImageUploader";
import MultipleImageUploader from "@/components/MultipleImageUploader";
import { FileMetadata } from "@/hooks/use-file-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
interface IBookFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  book?: IBook;
  genres?: IGenre[];
}

const BookFormDialog = ({
  open,
  onClose,
  onSuccess,
  book,
  genres,
}: IBookFormDialogProps) => {
  const isEdit = !!book;
  const [state, formAction, pending] = useActionState(
    isEdit ? updateBook.bind(null, book._id) : createBook,
    null
  );
  const [image, setImage] = useState<File | null>(null);
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const genresOptions = genres?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

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
    if (selectedGenreId) {
      formData.append("genre", selectedGenreId);
    }
    if (image) {
      formData.append("coverImage", image);
    }

    if (images) {
      images.forEach((file) => formData.append("previewImages", file as File));
    }

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
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="Enter book title"
                defaultValue={book?.title || ""}
              />
              <InputFieldError field="title" state={state} />
            </Field>

            {/* Author */}
            <Field>
              <FieldLabel htmlFor="author">Author</FieldLabel>
              <Input
                id="author"
                name="author"
                placeholder="Enter author name"
                defaultValue={book?.author || ""}
              />
              <InputFieldError field="author" state={state} />
            </Field>

            {/* Price + Stock */}
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="price">Price</FieldLabel>
                <Input
                  id="price"
                  name="price"
                  placeholder="Price..."
                  defaultValue={book?.price || ""}
                />
                <InputFieldError field="price" state={state} />
              </Field>

              <Field>
                <FieldLabel htmlFor="stock">Stock</FieldLabel>
                <Input
                  id="stock"
                  name="stock"
                  placeholder="Stock..."
                  defaultValue={book?.stock || 0}
                />
                <InputFieldError field="stock" state={state} />
              </Field>
            </div>

            {/* Genre */}
            <Field>
              <FieldLabel htmlFor="genre">Genre</FieldLabel>
              <Select
                onValueChange={setSelectedGenreId}
                value={selectedGenreId || ""}
              >
                <SelectTrigger id="genre">
                  <SelectValue placeholder="Choose genre" />
                </SelectTrigger>

                <SelectContent>
                  {genresOptions?.map((item) => (
                    <SelectItem key={item.value} value={item.value as string}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <InputFieldError field="genre" state={state} />
            </Field>

            {/* Publisher */}
            <Field>
              <FieldLabel htmlFor="publisher">Publisher</FieldLabel>
              <Input
                id="publisher"
                name="publisher"
                placeholder="Enter Prokasoni name"
                defaultValue={book?.publisher || ""}
              />
              <InputFieldError field="publisher" state={state} />
            </Field>

            {/* Discount */}
            <Field>
              <FieldLabel htmlFor="discount">Discount %</FieldLabel>
              <Input
                id="discount"
                name="discount"
                defaultValue={book?.discount || 0}
              />
              <InputFieldError field="discount" state={state} />
            </Field>

            {/* Description */}
            <Field>
              <FieldLabel htmlFor="description">
                Description (Optional)
              </FieldLabel>
              <Textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Write book description..."
                defaultValue={book?.description || ""}
              />
              <InputFieldError field="description" state={state} />
            </Field>

            {/* Cover Image */}
            <div>
              <FieldLabel>Upload Book Cover Image</FieldLabel>
              <SingleImageUploader onChange={setImage} />
              {book?.coverImage && !image && (
                <Image
                  src={book.coverImage}
                  alt="Current Cover"
                  height={96}
                  width={96}
                  className="mt-2 h-24 rounded"
                />
              )}
            </div>

            {!isEdit && (
              <div>
                <FieldLabel>Upload Book Preview Images</FieldLabel>
                <MultipleImageUploader onChange={setImages} />
              </div>
            )}
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
              {pending ? "Saving..." : isEdit ? "Update Book" : "Create Book"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookFormDialog;
