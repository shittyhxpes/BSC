import { prisma } from "@/lib/prisma";
import { Package, ShoppingCart, DollarSign } from "lucide-react";

export default async function AdminDashboard() {
  const productCount = await prisma.product.count();
  const orderCount = await prisma.order.count();
  const totalRevenue = await prisma.order.aggregate({
    _sum: {
      total: true,
    },
  });

  const stats = [
    {
      label: "Товары",
      value: productCount,
      icon: Package,
    },
    {
      label: "Заказы",
      value: orderCount,
      icon: ShoppingCart,
    },
    {
      label: "Выручка",
      value: new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(totalRevenue._sum.total || 0),
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-black uppercase tracking-tighter italic">Дашборд</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-neutral-500 font-bold uppercase tracking-wider text-sm">{stat.label}</span>
              <stat.icon className="w-5 h-5 text-neutral-400" />
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
