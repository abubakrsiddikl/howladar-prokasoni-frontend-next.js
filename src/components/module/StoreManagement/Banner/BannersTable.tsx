"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import ManagementTable from "@/components/shared/Management/ManagementTable";

import DeleteConfirmationDialog from "@/components/shared/Management/DeleteConfirmationDialog";
import BannerFormDialog from "./BannerFormDialog";
import { IBanner } from "@/types";
import { deleteBanner } from "@/services/Banner/banner.api";
import { bannerColumns } from "./bannerColumns";

interface BannersTableProps {
  banners: IBanner[];
}

const BannersTable = ({ banners }: BannersTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingBanner, setDeletingBanner] = useState<IBanner | null>(null);
  const [viewingBanner, setViewingBanner] = useState<IBanner | null>(null);
  const [editingBanner, setEditingBanner] = useState<IBanner | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (banner: IBanner) => {
    setViewingBanner(banner);
  };

  const handleEdit = (Banner: IBanner) => {
    setEditingBanner(Banner);
  };

  const handleDelete = (banner: IBanner) => {
    setDeletingBanner(banner);
  };

  const confirmDelete = async () => {
    if (!deletingBanner) return;

    setIsDeleting(true);
    const result = await deleteBanner(deletingBanner._id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Banner deleted successfully");
      setDeletingBanner(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete banner");
    }
  };

  return (
    <>
      <ManagementTable
        data={banners}
        columns={bannerColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(banner) => banner._id!}
        emptyMessage="No Banners found"
      />
      {/* Edit Doctor Form Dialog */}
      <BannerFormDialog
        open={!!editingBanner}
        onClose={() => setEditingBanner(null)}
        banner={editingBanner!}
        onSuccess={() => {
          setEditingBanner(null);
          handleRefresh();
        }}
      />

      {/* View Doctor Detail Dialog
      <DoctorViewDetailDialog
        open={!!viewingBanner}
        onClose={() => setViewingBanner(null)}
        doctor={viewingBanner}
      /> */}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingBanner}
        onOpenChange={(open) => !open && setDeletingBanner(null)}
        onConfirm={confirmDelete}
        title="Delete Banner"
        description={`Are you sure you want to delete ${deletingBanner?.title}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default BannersTable;
