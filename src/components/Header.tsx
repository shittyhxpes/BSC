"use client";

import Link from "next/link";
import { ShoppingBag, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MenuOverlay from "./MenuOverlay";
import Image from "next/image";

export default function Header() {
  const { openCart, items } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBumped, setIsBumped] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    setIsBumped(true);
    const timer = setTimeout(() => setIsBumped(false), 300);
    return () => clearTimeout(timer);
  }, [items.length]);

  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 mix-blend-difference px-8 md:px-12 py-6 flex justify-between items-center pointer-events-none"
      >
        {!isAdminPage ? (
          <Link href="/" className="block relative w-12 h-12 md:w-16 md:h-16 hover:opacity-80 transition-opacity pointer-events-auto">
            <Image src="/logo.svg" alt="BSC Logo" fill className="object-contain invert" />
          </Link>
        ) : (
          <div className="w-12 h-12 md:w-16 md:h-16" /> // Empty space for admin
        )}

        <div className="flex items-center gap-6 md:gap-12 pointer-events-auto">
           <motion.button 
            onClick={openCart}
            animate={isBumped ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
            className="hover:opacity-70 transition-opacity relative flex items-center gap-2 text-white"
          >
            <div className="relative">
                <ShoppingBag className="w-6 h-6" />
                {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-black text-[10px] flex items-center justify-center rounded-full font-bold">
                    {itemCount}
                    </span>
                )}
            </div>
            <span className="hidden md:inline text-sm font-bold uppercase tracking-wider">Корзина</span>
          </motion.button>

           <button 
             onClick={() => setIsMenuOpen(true)}
             className="hover:opacity-70 transition-opacity flex items-center gap-2 text-white"
           >
              <Menu className="w-6 h-6" />
              <span className="hidden md:inline text-sm font-bold uppercase tracking-wider">Меню</span>
           </button>
        </div>
      </motion.header>
    </>
  );
}
