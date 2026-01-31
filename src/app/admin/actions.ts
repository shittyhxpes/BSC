"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const COOKIE_NAME = "bsc_admin_session";

// Auth Actions
export async function login(prevState: any, formData: FormData) {
  const password = formData.get("password") as string;
  
  if (password === ADMIN_PASSWORD) {
    cookies().set(COOKIE_NAME, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    return { success: true };
  }
  
  return { success: false, error: "Неверный пароль" };
}

export async function logout() {
  cookies().delete(COOKIE_NAME);
  redirect("/admin/login");
}

export async function checkAuth() {
  const cookie = cookies().get(COOKIE_NAME);
  return cookie?.value === "true";
}

// Product Schemas
const ProductSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  slug: z.string().min(1, "Slug обязателен"),
  description: z.string().min(1, "Описание обязательно"),
  price: z.coerce.number().min(0, "Цена должна быть больше 0"),
  image: z.string().min(1, "Ссылка на изображение обязательна"),
  category: z.string().min(1, "Категория обязательна"),
  stock: z.coerce.number().min(0).default(0),
  images: z.string().optional(),
});

// Product Actions
export async function createProduct(prevState: any, formData: FormData) {
  const isAuth = await checkAuth();
  if (!isAuth) return { error: "Unauthorized" };

  try {
    const rawData = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      price: formData.get("price"),
      image: formData.get("image"),
      category: formData.get("category"),
      stock: formData.get("stock"),
      images: formData.get("images"),
    };

    const { images, ...validatedData } = ProductSchema.parse(rawData);

    const imageUrls = images 
      ? images.split('\n').map(url => url.trim()).filter(url => url !== '')
      : [];

    await prisma.product.create({
      data: {
        ...validatedData,
        images: {
          create: imageUrls.map(url => ({ url }))
        }
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/products");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: "Ошибка при создании товара" };
  }
}

export async function updateProduct(id: number, prevState: any, formData: FormData) {
    const isAuth = await checkAuth();
    if (!isAuth) return { error: "Unauthorized" };
  
    try {
      const rawData = {
        name: formData.get("name"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        price: formData.get("price"),
        image: formData.get("image"),
        category: formData.get("category"),
        stock: formData.get("stock"),
        images: formData.get("images"),
      };
  
      const { images, ...validatedData } = ProductSchema.parse(rawData);
      const imageUrls = images 
        ? images.split('\n').map(url => url.trim()).filter(url => url !== '')
        : [];
  
      await prisma.$transaction([
        // Delete old images
        prisma.productImage.deleteMany({
          where: { productId: id }
        }),
        // Update product and create new images
        prisma.product.update({
          where: { id },
          data: {
            ...validatedData,
            images: {
              create: imageUrls.map(url => ({ url }))
            }
          },
        })
      ]);
  
      revalidatePath("/");
      revalidatePath("/admin/products");
      revalidatePath(`/product/${validatedData.slug}`);
      return { success: true };
    } catch (e) {
      console.error(e);
      return { error: "Ошибка при обновлении товара" };
    }
}

export async function deleteProduct(id: number) {
  const isAuth = await checkAuth();
  if (!isAuth) return { error: "Unauthorized" };

  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/admin/products");
    return { success: true };
  } catch (e) {
    return { error: "Ошибка удаления" };
  }
}

// Order Actions
export async function updateOrderStatus(id: string, status: string) {
  const isAuth = await checkAuth();
  if (!isAuth) return { error: "Unauthorized" };

  try {
    await prisma.order.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (e) {
    return { error: "Ошибка обновления статуса" };
  }
}
