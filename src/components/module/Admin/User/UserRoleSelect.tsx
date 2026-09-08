/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { updateUserRole } from "@/services/Auth/auth.api";
import type { TRole } from "@/types";
import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roleOptions: { label: string; value: TRole }[] = [
  { label: "Admin", value: "ADMIN" },
  { label: "Store Manager", value: "STORE_MANAGER" },
  { label: "Customer", value: "CUSTOMER" },
];

const UserRoleSelect = ({ userId, role }: { userId: string; role: TRole }) => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(role);
  const [pendingRole, setPendingRole] = useState<TRole | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const handledState = useRef<unknown>(null);
  const isSubmitting = useRef(false);
  const [state, formAction, pending] = useActionState(
    updateUserRole.bind(null, userId),
    null,
  );

  useEffect(() => {
    if (!state || handledState.current === state) return;

    handledState.current = state;
    isSubmitting.current = false;
    if (state?.success) {
      toast.success(state.message || "User role updated successfully");
      router.refresh();
    } else if (state && !state.success) {
      setSelectedRole(role);
      toast.error(state.message || "Failed to update user role");
    }
  }, [role, router, state]);

  const handleChange = (value: TRole) => {
    if (value === selectedRole || pending) return;

    setPendingRole(value);
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (!pendingRole || pending || isSubmitting.current) return;

    isSubmitting.current = true;
    setSelectedRole(pendingRole);
    const formData = new FormData();
    formData.set("role", pendingRole);
    formAction(formData);
  };

  const handleDialogChange = (open: boolean) => {
    setIsConfirmOpen(open);
    if (!open && !pending) {
      isSubmitting.current = false;
      setPendingRole(null);
    }
  };

  const pendingRoleLabel = roleOptions.find(
    (option) => option.value === pendingRole,
  )?.label;

  return (
    <>
      <Select
        value={selectedRole}
        onValueChange={handleChange}
        disabled={pending}
      >
        <SelectTrigger className="w-full min-w-[150px] sm:w-[170px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {roleOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <AlertDialog open={isConfirmOpen} onOpenChange={handleDialogChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm role change</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to change this user&apos;s role to {pendingRoleLabel}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={pending}>
              {pending ? "Updating..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserRoleSelect;