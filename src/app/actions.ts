"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

const OrderSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  phone: z.string().min(10),
  items: z.string(), // JSON string of items
  total: z.number(),
});

export async function createOrder(prevState: any, formData: FormData) {
  const rawData = {
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    address: formData.get("address"),
    city: formData.get("city"),
    phone: formData.get("phone"),
    items: formData.get("items"),
    total: Number(formData.get("total")),
  };

  try {
    const data = OrderSchema.parse(rawData);
    const items = JSON.parse(data.items);

    const order = await prisma.order.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        phone: data.phone,
        total: data.total,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return { success: true, orderId: order.id };
  } catch (e) {
    console.error(e);
    return { success: false, error: "Failed to create order" };
  }
}
