"use client";

import { deleteProduct } from "@/app/admin/actions";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteProductButton({ id }: { id: number }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Вы уверены, что хотите удалить этот товар?")) return;
    
    setIsDeleting(true);
    const result = await deleteProduct(id);
    
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Ошибка при удалении");
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="flex items-center justify-center gap-2 bg-red-900/20 text-red-500 py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-900/40 transition-colors disabled:opacity-50"
    >
      <Trash2 className="w-4 h-4" />
      {isDeleting ? "Удаление..." : "Удалить"}
    </button>
  );
}
