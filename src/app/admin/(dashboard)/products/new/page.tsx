import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProductPage() {
  return (
    <div className="space-y-8">
      <Link 
        href="/admin/products"
        className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
      >
        <ArrowLeft className="w-4 h-4" /> Назад к списку
      </Link>
      <h1 className="text-4xl font-black uppercase tracking-tighter italic">Новый товар</h1>
      <ProductForm />
    </div>
  );
}
