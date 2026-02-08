"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deletePropertyAdmin } from "@/_actions/admin/actions";

interface DeletePropertyButtonProps {
  propertyId: string;
}

export function DeletePropertyButton({
  propertyId,
}: DeletePropertyButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (
      !confirm(
        "هل أنت متأكد من حذف هذا العقار؟ لا يمكن التراجع عن هذا الإجراء.",
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await deletePropertyAdmin(propertyId);
      router.refresh();
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("حدث خطأ أثناء الحذف");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 transition-colors disabled:opacity-50"
      title="حذف"
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 text-red-600 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
      )}
    </button>
  );
}
