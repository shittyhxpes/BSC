"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

interface Category {
  name: string;
  value: string | undefined;
}

interface CategoryFilterProps {
  categories: Category[];
  currentSearch?: string;
}

export default function CategoryFilter({ categories, currentSearch }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || undefined;

  return (
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
      {categories.map((cat) => {
        const isActive = currentCategory === cat.value;
        
        return (
          <Link
            key={cat.name}
            href={{
              pathname: '/',
              query: { 
                ...(cat.value ? { category: cat.value } : {}),
                ...(currentSearch ? { q: currentSearch } : {})
              }
            }}
            className="relative text-sm font-bold uppercase tracking-wider transition-all py-1 group"
          >
                <span className={`transition-colors duration-300 ${
                  isActive ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"
                }`}>
                  {cat.name}
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
              </Link>
        );
      })}
    </div>
  );
}
