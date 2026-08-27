"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import ManagementPageHeader from "@/components/shared/Management/ManagementPageHeader";
import CampaignFormDialog from "./CampaignFormDialog";

const CampaignManagementHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogKey, setDialogKey] = useState(0);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1); // Force remount for fresh form state
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <CampaignFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Campaign Management"
        description="Manage campaign offers and details"
        action={{
          label: "Add Campaign",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default CampaignManagementHeader;