import { prisma } from "@/lib/prisma";
import CategoryFilter from "@/components/CategoryFilter";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";

async function getProducts(category?: string, search?: string) {
  try {
    const where: any = {};
    if (category) {
      where.category = category.toUpperCase();
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    return products;
  } catch (error) {
    console.warn("Database error", error);
    return [];
  }
}

export default async function Home({ searchParams }: { searchParams: Promise<{ category?: string, q?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category;
  const search = resolvedSearchParams.q;
  const products = await getProducts(category, search);

  const categories = [
    { name: "Все", value: undefined },
    { name: "Худи", value: "HOODIES" },
    { name: "Футболки", value: "TEES" },
    { name: "Штаны", value: "PANTS" },
    { name: "Аксессуары", value: "ACCESSORIES" },
  ];

  return (
    <div className="min-h-screen pt-[100px]">
        {/* Search and Filters */}
        <section className="py-4 mb-8">
          <div className="max-w-7xl mx-auto px-4 space-y-8">
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative group">
              <form action="/" method="GET" className="relative">
                <input
                  type="text"
                  name="q"
                  defaultValue={search}
                  placeholder="ПОИСК..."
                  className="w-full bg-transparent border-b border-neutral-800 py-2 px-4 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-white transition-colors text-center"
                />
                {category && <input type="hidden" name="category" value={category} />}
              </form>
            </div>

            {/* Category Filters */}
            <CategoryFilter categories={categories} currentSearch={search} />
          </div>
        </section>

        {/* Product Grid */}
        <ProductGrid products={products} categoryKey={category || 'all'} />
    </div>
  );
}
