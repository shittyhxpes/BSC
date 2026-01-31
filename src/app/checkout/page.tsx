"use client";

import { useCartStore } from "@/lib/store";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Lock, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Имитация создания заказа
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const mockOrderId = Math.random().toString(36).substring(7).toUpperCase();

    toast.success("Заказ успешно оформлен!");
    clearCart();
    router.push(`/checkout/success/${mockOrderId}`);
    setLoading(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">Ваша корзина пуста</h1>
        <Link href="/" className="text-sm font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors underline underline-offset-8">
          Вернуться в магазин
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 md:pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 md:mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em]">
            <ChevronLeft className="w-4 h-4" />
            Назад
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Form */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">Оформление</h1>
              <p className="text-neutral-500 text-xs md:text-sm uppercase tracking-widest font-bold">Данные для доставки</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full border border-white flex items-center justify-center text-[10px] font-black">1</span>
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">Контакты</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">Имя</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-neutral-900/50 border border-neutral-800 p-4 text-white text-sm focus:outline-none focus:border-white transition-all duration-300 placeholder:text-neutral-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">Фамилия</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-neutral-900/50 border border-neutral-800 p-4 text-white text-sm focus:outline-none focus:border-white transition-all duration-300 placeholder:text-neutral-700"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">Email</label>
                    <input
                      required
                      type="email"
                      className="w-full bg-neutral-900/50 border border-neutral-800 p-4 text-white text-sm focus:outline-none focus:border-white transition-all duration-300 placeholder:text-neutral-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">Телефон</label>
                    <input
                      required
                      type="tel"
                      className="w-full bg-neutral-900/50 border border-neutral-800 p-4 text-white text-sm focus:outline-none focus:border-white transition-all duration-300 placeholder:text-neutral-700"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full border border-white flex items-center justify-center text-[10px] font-black">2</span>
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">Адрес</h2>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">Город</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-neutral-900/50 border border-neutral-800 p-4 text-white text-sm focus:outline-none focus:border-white transition-all duration-300 placeholder:text-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">Адрес (Улица, дом, квартира)</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-neutral-900/50 border border-neutral-800 p-4 text-white text-sm focus:outline-none focus:border-white transition-all duration-300 placeholder:text-neutral-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">Индекс</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-neutral-900/50 border border-neutral-800 p-4 text-white text-sm focus:outline-none focus:border-white transition-all duration-300 placeholder:text-neutral-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">Страна</label>
                    <div className="w-full bg-neutral-900/20 border border-neutral-800/50 p-4 text-neutral-500 text-sm font-black uppercase tracking-widest cursor-not-allowed">
                      Россия
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Summary - Permanent & Lightweight */}
              <div className="lg:hidden space-y-6">
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-900">
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Ваш заказ</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="relative group aspect-square bg-neutral-900 overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 p-2 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-[8px] font-black uppercase text-white truncate">{item.name}</p>
                        <p className="text-[7px] font-bold text-neutral-400 uppercase tracking-tighter">
                          {item.size} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 p-4 bg-neutral-900/30 border border-neutral-800">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                    <span className="text-neutral-500">Сумма</span>
                    <span className="text-white">{total.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                    <span className="text-neutral-500">Доставка</span>
                    <span className="text-green-500">Бесплатно</span>
                  </div>
                  <div className="pt-3 border-t border-neutral-800 flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Итого к оплате</span>
                    <span className="text-xl font-black text-white">{total.toLocaleString()} ₽</span>
                  </div>
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-neutral-200 transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Оформить заказ
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Desktop Summary */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-32 bg-neutral-900/30 border border-neutral-800 p-8 space-y-8">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                Ваш заказ
              </h2>
              
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-6 group">
                    <div className="relative w-20 h-20 bg-neutral-900 flex-shrink-0 overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <h3 className="text-white text-[11px] font-black uppercase tracking-widest truncate leading-tight mb-1">{item.name}</h3>
                      <p className="text-neutral-500 text-[9px] font-bold uppercase tracking-widest mb-2">Размер: {item.size} / Кол-во: {item.quantity}</p>
                      <p className="text-white text-xs font-black">{(item.price * item.quantity).toLocaleString()} ₽</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-neutral-800">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-black">Сумма</span>
                  <span className="text-white text-sm font-black">{total.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-black">Доставка</span>
                  <span className="text-green-500 text-[10px] font-black uppercase tracking-widest">Бесплатно</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="text-white uppercase tracking-[0.3em] text-[10px] font-black">Итого</span>
                  <span className="text-white text-4xl font-black leading-none">{total.toLocaleString()} ₽</span>
                </div>
              </div>

              <div className="p-4 bg-black/50 border border-neutral-800/50 space-y-2">
                <p className="text-[9px] text-neutral-600 leading-relaxed uppercase tracking-widest font-bold">
                  Нажимая «Оформить заказ», вы подтверждаете согласие с условиями оферты.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
