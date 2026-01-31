import ProductForm from "@/components/admin/ProductForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      images: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Link 
        href="/admin/products"
        className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
      >
        <ArrowLeft className="w-4 h-4" /> Назад к списку
      </Link>
      <h1 className="text-4xl font-black uppercase tracking-tighter italic">Редактирование товара</h1>
      <ProductForm product={product} isEdit />
    </div>
  );
}
