"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  category?: string;
  stock: number;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="relative aspect-square overflow-hidden bg-neutral-900 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500 flex items-center justify-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white border border-white/50 px-4 py-2">
              Посмотреть
            </span>
          </div>

          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
              <span className="text-white font-black uppercase tracking-widest border-2 border-white px-6 py-3 text-xs">
                Sold Out
              </span>
            </div>
          )}
        </div>
        
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-white group-hover:text-neutral-400 transition-colors break-words leading-relaxed">
            {product.name}
          </h3>
          <p className="text-neutral-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
            {product.price.toLocaleString("ru-RU")} ₽
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
