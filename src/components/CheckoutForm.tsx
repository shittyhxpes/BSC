"use client";

import { useCartStore } from "@/lib/store";
import { createOrder } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  success: false,
  error: null,
  orderId: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-neutral-200 transition-colors disabled:bg-neutral-700 disabled:text-neutral-500"
    >
      {pending ? "ОБРАБОТКА..." : "ПОДТВЕРДИТЬ ЗАКАЗ"}
    </button>
  );
}

export default function CheckoutForm() {
  const { items, clearCart } = useCartStore();
  const [state, formAction] = useFormState(createOrder as any, initialState);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (state?.success && state.orderId) {
      clearCart();
      router.push(`/checkout/success/${state.orderId}`);
    }
  }, [state, clearCart, router]);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold mb-4">Ваша корзина пуста</h2>
        <a href="/" className="text-white underline underline-offset-4">Вернуться в магазин</a>
      </div>
    );
  }

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto py-12 px-6">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold uppercase tracking-widest mb-8">ДАННЫЕ ПОЛУЧАТЕЛЯ</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-neutral-400">Имя</label>
            <input name="firstName" required className="w-full bg-neutral-900 border border-neutral-800 p-3 focus:border-white outline-none transition-colors" placeholder="Иван" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-neutral-400">Фамилия</label>
            <input name="lastName" required className="w-full bg-neutral-900 border border-neutral-800 p-3 focus:border-white outline-none transition-colors" placeholder="Иванов" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-neutral-400">Email</label>
          <input name="email" type="email" required className="w-full bg-neutral-900 border border-neutral-800 p-3 focus:border-white outline-none transition-colors" placeholder="ivan@example.com" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-neutral-400">Телефон</label>
          <input name="phone" type="tel" required className="w-full bg-neutral-900 border border-neutral-800 p-3 focus:border-white outline-none transition-colors" placeholder="+7 (999) 000-00-00" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-neutral-400">Адрес доставки</label>
          <input name="address" required className="w-full bg-neutral-900 border border-neutral-800 p-3 focus:border-white outline-none transition-colors" placeholder="Улица Пушкина, д. 10, кв. 5" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-neutral-400">Город</label>
          <input name="city" required className="w-full bg-neutral-900 border border-neutral-800 p-3 focus:border-white outline-none transition-colors" placeholder="Москва" />
        </div>
      </div>

      <div className="bg-neutral-900 p-8 h-fit">
        <h2 className="text-xl font-bold uppercase tracking-widest mb-6">ВАШ ЗАКАЗ</h2>
        
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
              <span className="text-neutral-400">{item.name} ({item.size}) x {item.quantity}</span>
              <span>{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-800 pt-4 mb-8">
          <div className="flex justify-between font-bold text-lg">
            <span>Итого</span>
            <span>{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(total)}</span>
          </div>
        </div>

        {/* Hidden inputs to pass data to server action */}
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <input type="hidden" name="total" value={total} />

        <SubmitButton />
        
        {state?.error && (
            <p className="text-red-500 text-sm mt-4 text-center">{state.error}</p>
        )}
      </div>
    </form>
  );
}
