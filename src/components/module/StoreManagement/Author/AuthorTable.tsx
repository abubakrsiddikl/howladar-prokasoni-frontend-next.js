"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import ManagementTable from "@/components/shared/Management/ManagementTable";

import DeleteConfirmationDialog from "@/components/shared/Management/DeleteConfirmationDialog";
import { IAuthor } from "@/types";
import { deleteAuthor } from "@/services/Author/author.api";
import AuthorFormDialog from "./AuthorFormDialog";
import { authorColumns } from "./authorColumns";

interface AuthorsTableProps {
  authors: IAuthor[];
}

const AuthorsTable = ({ authors }: AuthorsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingAuthor, setDeletingAuthor] = useState<IAuthor | null>(null);

  const [editingAuthor, setEditingAuthor] = useState<IAuthor | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleEdit = (author: IAuthor) => {
    setEditingAuthor(author);
  };

  const handleDelete = (author: IAuthor) => {
    setDeletingAuthor(author);
  };

  const confirmDelete = async () => {
    if (!deletingAuthor) return;

    setIsDeleting(true);
    const result = await deleteAuthor(deletingAuthor._id);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Book deleted successfully");
      setDeletingAuthor(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete doctor");
    }
  };

  return (
    <>
      <ManagementTable
        data={authors}
        columns={authorColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(author) => author._id}
        emptyMessage="No Books found"
      />
      {/* Edit Doctor Form Dialog */}
      <AuthorFormDialog
        open={!!editingAuthor}
        onClose={() => setEditingAuthor(null)}
        author={editingAuthor!}
        onSuccess={() => {
          setEditingAuthor(null);
          handleRefresh();
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingAuthor}
        onOpenChange={(open) => !open && setDeletingAuthor(null)}
        onConfirm={confirmDelete}
        title="Delete Book"
        description={`Are you sure you want to delete ${deletingAuthor?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default AuthorsTable;
