"use client";

import { updateOrderStatus } from "@/app/admin/actions";
import { useState } from "react";

export default function OrderStatusSelect({ id, status }: { id: string, status: string }) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setLoading(true);
    await updateOrderStatus(id, newStatus);
    setCurrentStatus(newStatus);
    setLoading(false);
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case "PENDING": return "bg-yellow-500/20 text-yellow-500";
      case "PAID": return "bg-blue-500/20 text-blue-500";
      case "SHIPPED": return "bg-purple-500/20 text-purple-500";
      case "DELIVERED": return "bg-green-500/20 text-green-500";
      case "CANCELLED": return "bg-red-500/20 text-red-500";
      default: return "bg-neutral-800 text-white";
    }
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={loading}
      className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border-none outline-none cursor-pointer ${getStatusColor(currentStatus)}`}
    >
      <option value="PENDING">Ожидает</option>
      <option value="PAID">Оплачен</option>
      <option value="SHIPPED">Отправлен</option>
      <option value="DELIVERED">Доставлен</option>
      <option value="CANCELLED">Отменен</option>
    </select>
  );
}
