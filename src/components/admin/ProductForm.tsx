"use client";

import { useFormState } from "react-dom";
import { createProduct, updateProduct } from "@/app/admin/actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  product?: any; // Using any for simplicity here, ideally Product type
  isEdit?: boolean;
}

const initialState = {
  success: false,
  error: "",
};

export default function ProductForm({ product, isEdit = false }: ProductFormProps) {
  const router = useRouter();
  // Bind the ID if editing
  const action = isEdit ? updateProduct.bind(null, product.id) : createProduct;
  // @ts-ignore
  const [state, formAction] = useFormState(action, initialState);

  useEffect(() => {
    if (state?.success) {
      router.push("/admin/products");
      router.refresh();
    }
  }, [state?.success, router]);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-neutral-400">Название</label>
          <input
            type="text"
            name="name"
            defaultValue={product?.name}
            required
            className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white focus:outline-none focus:border-white transition-colors"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-neutral-400">Slug (URL)</label>
          <input
            type="text"
            name="slug"
            defaultValue={product?.slug}
            required
            className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white focus:outline-none focus:border-white transition-colors"
          />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-neutral-400">Цена (RUB)</label>
            <input
                type="number"
                name="price"
                defaultValue={product?.price}
                required
                min="0"
                className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white focus:outline-none focus:border-white transition-colors"
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-neutral-400">Количество (Сток)</label>
            <input
                type="number"
                name="stock"
                defaultValue={product?.stock || 0}
                required
                min="0"
                className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white focus:outline-none focus:border-white transition-colors"
            />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-neutral-400">Категория</label>
        <select
            name="category"
            defaultValue={product?.category || "HOODIES"}
            className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white focus:outline-none focus:border-white transition-colors"
        >
            <option value="HOODIES">Худи</option>
            <option value="TEES">Футболки</option>
            <option value="PANTS">Штаны</option>
            <option value="ACCESSORIES">Аксессуары</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-neutral-400">Главное изображение (URL)</label>
        <input
            type="text"
            name="image"
            defaultValue={product?.image}
            placeholder="https://... или /images/..."
            required
            className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white focus:outline-none focus:border-white transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-neutral-400">Галерея изображений (URL по одному на строку)</label>
        <textarea
            name="images"
            rows={5}
            defaultValue={product?.images?.map((img: any) => img.url).join('\n')}
            placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
            className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white focus:outline-none focus:border-white transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-neutral-400">Описание</label>
        <textarea
            name="description"
            defaultValue={product?.description}
            required
            rows={5}
            className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {state?.error && (
        <div className="text-red-500 text-sm font-medium">
          {state.error}
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <button
            type="submit"
            className="bg-white text-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
        >
            {isEdit ? "Сохранить" : "Создать"}
        </button>
        <button
            type="button"
            onClick={() => router.back()}
            className="text-neutral-500 px-8 py-3 font-bold uppercase tracking-widest hover:text-white transition-colors"
        >
            Отмена
        </button>
      </div>
    </form>
  );
}
