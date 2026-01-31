import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductForm from "./ProductForm";
import ProductGallery from "@/components/ProductGallery";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cache } from "react";

const getProduct = cache(async (slug: string) => {
  return await prisma.product.findUnique({
    where: { slug },
    include: {
      images: true,
    },
  });
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | BIG STEPPERS CLUB`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em]">
            <ChevronLeft className="w-4 h-4" />
            Назад
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                    {product.name}
                  </h1>
                </div>
                <p className="text-2xl font-bold text-white">
                  {new Intl.NumberFormat("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                    maximumFractionDigits: 0,
                  }).format(product.price)}
                </p>
              </div>

              <div className="space-y-6">
                <div className="prose prose-invert prose-sm">
                  <p className="text-neutral-400 leading-relaxed whitespace-pre-line">
                    {product.description || "Описание скоро появится."}
                  </p>
                </div>
                
                <ProductForm product={product} />
              </div>
            </div>

            {/* Additional Info Accordion-style */}
            <div className="mt-12 border-t border-neutral-800 divide-y divide-neutral-800">
              <details className="py-4 group">
                <summary className="flex justify-between items-center cursor-pointer list-none text-sm font-bold uppercase tracking-widest text-white">
                  Состав и уход
                  <span className="group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <div className="mt-4 text-sm text-neutral-500 space-y-2">
                  <p>100% Хлопок высшего качества (Penye).</p>
                  <p>Плотность: 240 г/м² (Футболки), 420 г/м² (Худи).</p>
                  <p>Стирка при 30°C, вывернув наизнанку.</p>
                </div>
              </details>
              <details className="py-4 group">
                <summary className="flex justify-between items-center cursor-pointer list-none text-sm font-bold uppercase tracking-widest text-white">
                  Доставка и возврат
                  <span className="group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <div className="mt-4 text-sm text-neutral-500">
                  <p>Бесплатная доставка от 15 000 ₽. Возврат в течение 14 дней.</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
