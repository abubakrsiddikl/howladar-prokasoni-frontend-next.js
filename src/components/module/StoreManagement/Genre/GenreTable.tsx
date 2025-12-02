"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { IGenre } from "@/types";

import ManagementTable from "@/components/shared/Management/ManagementTable";

import DeleteConfirmationDialog from "@/components/shared/Management/DeleteConfirmationDialog";

import { deleteGenre } from "@/services/Genre/genre.api";
import { genreColumns } from "./genreColumns";

interface GenresTableProps {
  genres: IGenre[];
}

const GenresTable = ({ genres }: GenresTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingGenre, setDeletingGenre] = useState<IGenre | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (genre: IGenre) => {
    setDeletingGenre(genre);
  };

  const confirmDelete = async () => {
    if (!deletingGenre) return;

    setIsDeleting(true);
    const result = await deleteGenre(deletingGenre._id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Book deleted successfully");
      setDeletingGenre(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete doctor");
    }
  };

  return (
    <>
      <ManagementTable
        data={genres}
        columns={genreColumns}
        onDelete={handleDelete}
        getRowKey={(genre) => genre._id!}
        emptyMessage="No Genres found"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingGenre}
        onOpenChange={(open) => !open && setDeletingGenre(null)}
        onConfirm={confirmDelete}
        title="Delete Book"
        description={`Are you sure you want to delete ${deletingGenre?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default GenresTable;
