"use client";

import { IGenre } from "@/types";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import BookFormDialog from "./BookFormDialog";
import ManagementPageHeader from "@/components/shared/Management/ManagementPageHeader";

interface BooksManagementHeaderProps {
  genre: IGenre[];
}

const BooksManagementHeader = ({
  genre,
}: BooksManagementHeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const [dialogKey, setDialogKey] = useState(0);

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1); // Force remount
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      <BookFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
        genres={genre}
      />

      <ManagementPageHeader
        title="Books Management"
        description="Manage Book information and details"
        action={{
          label: "Add Book    ",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default BooksManagementHeader;
