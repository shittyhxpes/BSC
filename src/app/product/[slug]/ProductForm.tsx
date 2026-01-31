"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const SIZES = ["S", "M", "L", "XL"];

export default function ProductForm({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState("");
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Пожалуйста, выберите размер");
      return;
    }

    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: 1,
    });

    toast.success("Товар добавлен в корзину");
  };

  return (
    <div className="space-y-8">
      {/* Size Selection */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
            Размер
          </span>
          <Link 
            href="/size-guide"
            className="text-[10px] font-bold uppercase tracking-widest text-white underline underline-offset-4 opacity-50 hover:opacity-100 transition-opacity"
          >
            Гид по размерам
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-4 text-sm font-bold border transition-all duration-300 ${
                selectedSize === size
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-neutral-800 hover:border-neutral-500"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={product.stock <= 0}
        className={`w-full py-6 flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-sm transition-all duration-500 ${
          product.stock <= 0
            ? "bg-neutral-900 text-neutral-600 cursor-not-allowed"
            : "bg-white text-black hover:bg-neutral-200 active:scale-[0.98]"
        }`}
      >
        <ShoppingBag className="w-5 h-5" />
        {product.stock <= 0 ? "Продано" : "Добавить в корзину"}
      </button>

      {/* Stock Info */}
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
          {product.stock > 0 ? "В наличии" : "Нет в наличии"}
        </span>
      </div>
    </div>
  );
}
