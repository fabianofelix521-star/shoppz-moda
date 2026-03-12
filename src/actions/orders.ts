"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs";

export async function createOrder(
  items: { productId: string; size: string; quantity: number }[],
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    include: { images: { take: 1, orderBy: { position: "asc" } } },
  });

  const orderItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
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

  const address = await prisma.address.findFirst({
    where: { userId: session.user.id, isDefault: true },
  });

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      subtotal,
      shipping,
      total,
      addressId: address?.id || null,
      items: { create: orderItems },
    },
    include: { items: true },
  });

  revalidatePath("/orders");
  return order;
}

export async function getOrders() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function signUp(data: {
  name: string;
  email: string;
  password: string;
}) {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existing) throw new Error("Email already in use");

  const hashedPassword = await hash(data.password, 12);
  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  return { success: true };
}
