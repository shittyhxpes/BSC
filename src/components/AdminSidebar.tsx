"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, ShoppingCart, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSidebar({ logoutAction }: { logoutAction: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{ width: isHovered ? 256 : 80 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="border-r border-neutral-800 flex flex-col fixed h-full bg-black z-[40] overflow-hidden shadow-2xl shadow-white/5"
    >
      <div className="mt-8 mb-12 px-6 flex items-center h-16">
        <Link href="/" className="block relative w-10 h-10 md:w-12 md:h-12 hover:opacity-80 transition-opacity">
          <Image src="/logo.svg" alt="BSC Logo" fill className="object-contain invert" />
        </Link>
      </div>

      <nav className="space-y-4 flex-1 px-4">
        {[
          { href: "/admin", icon: LayoutDashboard, label: "Дашборд" },
          { href: "/admin/products", icon: Package, label: "Товары" },
          { href: "/admin/orders", icon: ShoppingCart, label: "Заказы" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-4 text-neutral-400 hover:text-white transition-colors p-3 hover:bg-neutral-900 rounded-lg group overflow-hidden"
          >
            <item.icon className="w-6 h-6 flex-shrink-0" />
            <motion.span
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
              className="font-bold uppercase tracking-wider text-sm whitespace-nowrap"
            >
              {item.label}
            </motion.span>
          </Link>
        ))}
      </nav>

      <div className="px-4 pb-8">
        <form action={logoutAction}>
          <button className="flex items-center gap-4 text-red-500 hover:text-red-400 transition-colors w-full p-3 hover:bg-neutral-900 rounded-lg group overflow-hidden">
            <LogOut className="w-6 h-6 flex-shrink-0" />
            <motion.span
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
              className="font-bold uppercase tracking-wider text-sm whitespace-nowrap"
            >
              Выйти
            </motion.span>
          </button>
        </form>
      </div>
    </motion.aside>
  );
}
