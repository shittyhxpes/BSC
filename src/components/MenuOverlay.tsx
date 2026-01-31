"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Shield } from "lucide-react";
import Image from "next/image";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "ГЛАВНАЯ", href: "/" },
  { label: "ХУДИ", href: "/?category=HOODIES" },
  { label: "ФУТБОЛКИ", href: "/?category=TEES" },
  { label: "ШТАНЫ", href: "/?category=PANTS" },
  { label: "АКСЕССУАРЫ", href: "/?category=ACCESSORIES" },
  { label: "ДОСТАВКА И ОПЛАТА", href: "/shipping" },
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 bg-neutral-900 z-[80] flex flex-col"
        >
          <div className="flex justify-between items-center p-6 border-b border-neutral-800">
             <Link href="/" onClick={onClose} className="relative w-10 h-10 md:w-12 md:h-12 hover:opacity-80 transition-opacity">
               <Image src="/logo.svg" alt="BSC Logo" fill className="object-contain invert" />
             </Link>
             <div className="flex items-center gap-6">
               <Link 
                 href="/admin" 
                 onClick={onClose}
                 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
               >
                 <Shield className="w-3 h-3" />
                 Admin
               </Link>
               <button onClick={onClose} className="hover:text-red-500 transition-colors">
                  <X className="w-8 h-8" />
               </button>
             </div>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center gap-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter hover:text-neutral-500 transition-colors text-center block px-4"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="p-6 text-center text-neutral-500 text-sm">
             BIG STEPPERS CLUB © 2026
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
