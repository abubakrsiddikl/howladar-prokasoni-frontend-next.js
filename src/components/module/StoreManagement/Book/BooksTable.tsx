"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { IBook, IGenre } from "@/types";
import { deleteBook } from "@/services/Book/book.api";
import ManagementTable from "@/components/shared/Management/ManagementTable";
import BookFormDialog from "./BookFormDialog";
import DeleteConfirmationDialog from "@/components/shared/Management/DeleteConfirmationDialog";
import { booksColumns } from "./booksColumns";

interface BooksTableProps {
  books: IBook[];
  genres: IGenre[];
}

const BooksTable = ({ books, genres }: BooksTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingBook, setDeletingBook] = useState<IBook | null>(null);
  const [viewingBook, setViewingBook] = useState<IBook | null>(null);
  const [editingBook, setEditingBook] = useState<IBook | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (book: IBook) => {
    setViewingBook(book);
  };

  const handleEdit = (book: IBook) => {
    setEditingBook(book);
  };

  const handleDelete = (book: IBook) => {
    setDeletingBook(book);
  };

  const confirmDelete = async () => {
    if (!deletingBook) return;

    setIsDeleting(true);
    const result = await deleteBook(deletingBook._id);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Book deleted successfully");
      setDeletingBook(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete doctor");
    }
  };

  return (
    <>
      <ManagementTable
        data={books}
        columns={booksColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(doctor) => doctor._id}
        emptyMessage="No Books found"
      />
      {/* Edit Doctor Form Dialog */}
      <BookFormDialog
        open={!!editingBook}
        onClose={() => setEditingBook(null)}
        book={editingBook!}
        genres={genres}
        onSuccess={() => {
          setEditingBook(null);
          handleRefresh();
        }}
      />

      {/* View Doctor Detail Dialog
      <DoctorViewDetailDialog
        open={!!viewingBook}
        onClose={() => setViewingBook(null)}
        doctor={viewingBook}
      /> */}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingBook}
        onOpenChange={(open) => !open && setDeletingBook(null)}
        onConfirm={confirmDelete}
        title="Delete Book"
        description={`Are you sure you want to delete ${deletingBook?.title}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default BooksTable;
