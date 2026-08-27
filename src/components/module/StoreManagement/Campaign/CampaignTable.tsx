"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import ManagementTable from "@/components/shared/Management/ManagementTable";
import DeleteConfirmationDialog from "@/components/shared/Management/DeleteConfirmationDialog";
import { ICampaign } from "@/types";
import { deleteCampaign } from "@/services/Campaign/campaign.api";
import CampaignFormDialog from "./CampaignFormDialog";
import { campaignColumns } from "./campaignColumns";

interface CampaignTableProps {
	campaigns: ICampaign[];
}

const CampaignTable = ({ campaigns }: CampaignTableProps) => {
	// console.log(campaigns)
	const router = useRouter();
	const [, startTransition] = useTransition();
	const [deletingCampaign, setDeletingCampaign] = useState<ICampaign | null>(null);
	const [editingCampaign, setEditingCampaign] = useState<ICampaign | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleRefresh = () => {
		startTransition(() => router.refresh());
	};

	const confirmDelete = async () => {
		if (!deletingCampaign?._id) return;

		setIsDeleting(true);
		const result = await deleteCampaign(deletingCampaign._id);
		setIsDeleting(false);

		if (result.success) {
			toast.success(result.message || "Campaign deleted successfully");
			setDeletingCampaign(null);
			handleRefresh();
		} else {
			toast.error(result.message || "Failed to delete campaign");
		}
	};

	return (
		<>
			<ManagementTable
				data={campaigns}
				columns={campaignColumns}
				onEdit={setEditingCampaign}
				onDelete={setDeletingCampaign}
				getRowKey={(campaign) => campaign._id!}
				emptyMessage="No campaigns found"
			/>

			<CampaignFormDialog
				open={!!editingCampaign}
				onClose={() => setEditingCampaign(null)}
				campaign={editingCampaign!}
				onSuccess={() => {
					setEditingCampaign(null);
					handleRefresh();
				}}
			/>

			{/* <DeleteConfirmationDialog
				open={!!deletingCampaign}
				onOpenChange={(open) => !open && setDeletingCampaign(null)}
				onConfirm={confirmDelete}
				title="Delete Campaign"
				description={`Are you sure you want to delete ${deletingCampaign?.title}? This action cannot be undone.`}
				isDeleting={isDeleting}
			/> */}
		</>
	);
};

export default CampaignTable;
