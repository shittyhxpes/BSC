import { prisma } from "@/lib/prisma";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-black uppercase tracking-tighter italic">Заказы</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-400 text-xs font-bold uppercase tracking-widest">
              <th className="py-4 px-4">ID</th>
              <th className="py-4 px-4">Дата</th>
              <th className="py-4 px-4">Клиент</th>
              <th className="py-4 px-4">Товары</th>
              <th className="py-4 px-4">Сумма</th>
              <th className="py-4 px-4">Статус</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr 
                key={order.id} 
                className="border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors group"
              >
                <td className="py-6 px-4 font-mono text-xs text-neutral-500 group-hover:text-white transition-colors">
                  {order.id.slice(-8).toUpperCase()}
                </td>
                <td className="py-6 px-4 text-sm">
                  {new Date(order.createdAt).toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </td>
                <td className="py-6 px-4">
                  <div className="text-sm font-bold">{order.firstName} {order.lastName}</div>
                  <div className="text-xs text-neutral-500">{order.email}</div>
                </td>
                <td className="py-6 px-4">
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item) => (
                      <span 
                        key={item.id}
                        className="text-[10px] bg-neutral-800 px-2 py-0.5 font-bold uppercase tracking-wider"
                      >
                        {item.product.name} x{item.quantity}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-6 px-4 font-mono font-bold">
                  {order.total.toLocaleString()} ₽
                </td>
                <td className="py-6 px-4">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 ${
                    order.status === 'COMPLETED' ? 'bg-green-500/20 text-green-500' :
                    order.status === 'PROCESSING' ? 'bg-blue-500/20 text-blue-500' :
                    'bg-neutral-800 text-neutral-400'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
