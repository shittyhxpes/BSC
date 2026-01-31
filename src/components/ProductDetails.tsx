"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { addItem } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: 1,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
        {product.name}
      </h1>
      
      <div className="text-xl text-neutral-400 mb-8 font-light">
         Ref: {product.slug.toUpperCase()}
      </div>

      <div className="prose prose-invert mb-12 text-neutral-300 leading-relaxed">
        <p>{product.description}</p>
      </div>

      <div className="space-y-6">
        <div>
            <div className="flex justify-between mb-2 text-sm font-medium">
                <span>Выберите размер</span>
                {!selectedSize && <span className="text-red-500">* Обязательно</span>}
            </div>
            <div className="flex gap-4 mb-8">
                {['S', 'M', 'L', 'XL'].map(size => (
                    <button 
                        key={size} 
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 border transition-colors flex items-center justify-center text-sm font-medium ${
                            selectedSize === size 
                                ? "bg-white text-black border-white" 
                                : "border-neutral-800 hover:border-white text-white"
                        }`}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!selectedSize || isAdded}
          className={`w-full font-bold uppercase tracking-widest py-4 transition-all ${
              isAdded 
                ? "bg-green-500 text-white" 
                : !selectedSize 
                    ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                    : "bg-white text-black hover:bg-neutral-200"
          }`}
        >
          {isAdded ? "ДОБАВЛЕНО" : `В КОРЗИНУ - ${new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(product.price)}`}
        </button>
        
        <p className="text-xs text-neutral-500 uppercase tracking-wide text-center mt-4">
            Бесплатная доставка при заказе от 15 000 ₽
        </p>
      </div>
    </div>
  );
}
