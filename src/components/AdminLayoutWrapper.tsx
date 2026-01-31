"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function AdminLayoutWrapper({
  children,
  logoutAction,
}: {
  children: React.ReactNode;
  logoutAction: () => void;
}) {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex flex-1">
        <div 
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
        >
          <AdminSidebar logoutAction={logoutAction} />
        </div>

        <motion.main
          animate={{ 
            marginLeft: (typeof window !== 'undefined' && window.innerWidth >= 1024) 
              ? (isSidebarHovered ? 256 : 80) 
              : 0 
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex flex-col min-h-screen relative z-0 w-full"
        >
          <div className="flex-1 p-6 lg:p-12 lg:pt-32 pt-24">
            {children}
          </div>
          <Footer forceShow />
        </motion.main>
      </div>
    </div>
  );
}
