"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-black border-l border-neutral-800 z-[101] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-white" />
                <h2 className="text-xl font-black uppercase tracking-tighter text-white">Корзина</h2>
                <span className="bg-neutral-800 text-neutral-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {items.length}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-neutral-900 rounded-full transition-colors text-neutral-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-neutral-700" />
                  </div>
                  <div>
                    <p className="text-white font-bold uppercase tracking-wider">Корзина пуста</p>
                    <p className="text-neutral-500 text-sm mt-1">Добавьте что-нибудь, чтобы начать</p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-4 px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-colors"
                  >
                    В каталог
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 group">
                    <div className="relative w-24 h-24 bg-neutral-900 flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-white font-bold uppercase tracking-tight text-sm leading-tight max-w-[150px]">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.id, item.size)}
                            className="text-neutral-600 hover:text-red-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                          Размер: {item.size}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-neutral-800 rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="p-1 hover:bg-neutral-900 text-neutral-400 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="p-1 hover:bg-neutral-900 text-neutral-400 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-white font-bold text-sm">
                          {new Intl.NumberFormat("ru-RU", {
                            style: "currency",
                            currency: "RUB",
                            maximumFractionDigits: 0,
                          }).format(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-neutral-800 space-y-4 bg-neutral-950/50">
                <div className="flex justify-between items-end">
                  <span className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">Итого</span>
                  <span className="text-white text-2xl font-black">
                    {new Intl.NumberFormat("ru-RU", {
                      style: "currency",
                      currency: "RUB",
                      maximumFractionDigits: 0,
                    }).format(total)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full py-4 bg-white text-black text-center font-black uppercase tracking-widest text-sm hover:bg-neutral-200 transition-colors"
                >
                  Оформить заказ
                </Link>
                <p className="text-[10px] text-neutral-600 text-center uppercase tracking-widest">
                  Налоги и доставка рассчитываются при оформлении
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
