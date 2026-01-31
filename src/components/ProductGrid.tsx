"use client";

import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  category?: string;
  stock: number;
}

interface ProductGridProps {
  products: Product[];
  categoryKey: string;
}

export default function ProductGrid({ products, categoryKey }: ProductGridProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={categoryKey}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="max-w-7xl mx-auto px-4 lg:px-12 pb-24"
      >
        {products.length === 0 ? (
          <div className="text-center py-24 text-neutral-500">
            <p className="uppercase tracking-[0.2em] font-black text-xs">В этой категории пока нет товаров.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
