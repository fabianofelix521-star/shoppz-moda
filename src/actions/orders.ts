"use server";

import * as db from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs";

export async function createOrder(
  items: { productId: string; size: string; quantity: number }[],
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const productIds = items.map((i) => i.productId);
  const products = await db.findProductsByIds(productIds);

  const orderItems = items.map((item) => {
    const product = products.find((p: any) => p.id === item.productId);
    if (!product) throw new Error(`Product ${item.productId} not found`);
    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      size: item.size,
      quantity: item.quantity,
      image: product.images[0]?.url || null,
    };
  });

  const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  const address = await db.findDefaultAddress(session.user.id);

  const order = await db.createOrder({
    userId: session.user.id,
    subtotal,
    shipping,
    total,
    addressId: address?.id || null,
    items: orderItems,
  });

  revalidatePath("/orders");
  return order;
}

export async function getOrders() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return db.getOrders(session.user.id);
}

export async function signUp(data: {
  name: string;
  email: string;
  password: string;
}) {
  const existing = await db.findUserByEmail(data.email);
  if (existing) throw new Error("Email already in use");

  const hashedPassword = await hash(data.password, 12);
  await db.createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  return { success: true };
}
