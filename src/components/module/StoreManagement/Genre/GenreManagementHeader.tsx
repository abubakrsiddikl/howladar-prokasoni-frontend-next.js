"use client";

import { IGenre } from "@/types";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import ManagementPageHeader from "@/components/shared/Management/ManagementPageHeader";
import GenreFormDialog from "./GenreFormDialog";

interface GenresManagementHeaderProps {
  genre?: IGenre;
}

const GenresManagementHeader = ({ genre }: GenresManagementHeaderProps) => {
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
      <GenreFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
        genre={genre}
      />

      <ManagementPageHeader
        title="Genre Management"
        description="Manage Genre information and details"
        action={{
          label: "Add Genre",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default GenresManagementHeader;
