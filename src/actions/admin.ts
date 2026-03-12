"use server";

import * as db from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const role = await db.findUserRole(session.user.id);
  if (role !== "ADMIN") throw new Error("Forbidden");
  return session;
}

export async function adminGetProducts() {
  await requireAdmin();
  return db.adminGetProducts();
}

export async function adminCreateProduct(data: {
  name: string;
  brand: string;
  description: string;
  price: number;
  compareAt?: number;
  sizes: string[];
  categoryId: string;
  featured: boolean;
  images: string[];
}) {
  await requireAdmin();
  const slug = slugify(data.name);

  const product = await db.adminCreateProduct({
    ...data,
    slug,
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  return product;
}

export async function adminUpdateProduct(
  id: string,
  data: {
    name?: string;
    brand?: string;
    description?: string;
    price?: number;
    compareAt?: number;
    sizes?: string[];
    categoryId?: string;
    featured?: boolean;
    active?: boolean;
    images?: string[];
  },
) {
  await requireAdmin();

  const product = await db.adminUpdateProduct(id, {
    ...data,
    slug: data.name ? slugify(data.name) : undefined,
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
  return product;
}

export async function adminDeleteProduct(id: string) {
  await requireAdmin();
  await db.adminDeleteProduct(id);
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function adminGetOrders() {
  await requireAdmin();
  return db.adminGetOrders();
}

export async function adminUpdateOrderStatus(id: string, status: string) {
  await requireAdmin();
  const order = await db.adminUpdateOrderStatus(id, status);
  revalidatePath("/admin/orders");
  return order;
}

export async function adminGetCategories() {
  await requireAdmin();
  return db.getCategories();
}

export async function adminCreateCategory(data: {
  name: string;
  description?: string;
  image?: string;
}) {
  await requireAdmin();
  const category = await db.adminCreateCategory({
    ...data,
    slug: slugify(data.name),
  });
  revalidatePath("/admin/categories");
  return category;
}

export async function adminUpdateCategory(
  id: string,
  data: { name?: string; description?: string; image?: string },
) {
  await requireAdmin();
  const category = await db.adminUpdateCategory(id, {
    ...data,
    slug: data.name ? slugify(data.name) : undefined,
  });
  revalidatePath("/admin/categories");
  return category;
}

export async function adminDeleteCategory(id: string) {
  await requireAdmin();
  await db.adminDeleteCategory(id);
  revalidatePath("/admin/categories");
}

export async function adminGetBanners() {
  await requireAdmin();
  return db.adminGetBanners();
}

export async function adminCreateBanner(data: {
  title: string;
  subtitle?: string;
  cta?: string;
  link?: string;
  bgColor?: string;
}) {
  await requireAdmin();
  const banner = await db.adminCreateBanner(data);
  revalidatePath("/admin/banners");
  revalidatePath("/");
  return banner;
}

export async function adminDeleteBanner(id: string) {
  await requireAdmin();
  await db.adminDeleteBanner(id);
  revalidatePath("/admin/banners");
  revalidatePath("/");
}

export async function adminGetDashboardStats() {
  await requireAdmin();
  const [productCount, orderCount, userCount, revenue] = await Promise.all([
    db.countProducts(),
    db.countOrders(),
    db.countUsers(),
    db.sumOrderTotal(),
  ]);

  return {
    products: productCount,
    orders: orderCount,
    users: userCount,
    revenue,
  };
}

export async function adminGetSetting(key: string) {
  await requireAdmin();
  return db.getSetting(key);
}

export async function adminSaveSetting(key: string, value: string) {
  await requireAdmin();
  await db.saveSetting(key, value);
  revalidatePath("/admin");
  revalidatePath("/");
}

// Public: read a setting without admin check (for footer, logo, etc.)
export async function getPublicSetting(key: string) {
  return db.getSetting(key);
}

export async function getPublicSettings(keys: string[]) {
  return db.getSettings(keys);
}
