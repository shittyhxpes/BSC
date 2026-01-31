import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { Plus } from "lucide-react";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      images: true
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-4xl font-black uppercase tracking-tighter italic">Товары</h1>
        <Link
          href="/admin/products/new"
          className="bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-neutral-200 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Добавить товар
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-neutral-900 border border-neutral-800 p-4 hover:border-white transition-all duration-500"
          >
            <div className="aspect-square relative mb-4 overflow-hidden bg-neutral-800">
              {product.images[0] ? (
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-700 font-bold uppercase tracking-widest text-xs">
                  Нет фото
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold uppercase tracking-wider mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between text-sm text-neutral-400">
                  <span className="font-mono">{product.price.toLocaleString()} ₽</span>
                  <span>{product.stock} шт.</span>
                  <span className="bg-neutral-800 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-neutral-300">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Link
                  href={`/admin/products/${product.id}`}
                  className="flex items-center justify-center gap-2 bg-neutral-800 py-3 text-xs font-bold uppercase tracking-widest hover:bg-neutral-700 transition-colors"
                >
                  Изменить
                </Link>
                <DeleteProductButton id={product.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
