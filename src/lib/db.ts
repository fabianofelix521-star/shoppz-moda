/**
 * Database access layer using Supabase PostgREST (service_role key).
 * Replaces direct Prisma queries because the Supabase connection pooler
 * (Supavisor) is returning "Tenant or user not found" for this account,
 * and Vercel cannot reach the DB host via IPv6.
 */

import { supabaseAdmin } from "./supabase";
import type { Order, ProductWithImages, Category } from "@/types";

// --------------- helpers ---------------

function cuid(): string {
  // simple cuid-ish id compatible with existing seed data format
  return "c" + crypto.randomUUID().replace(/-/g, "").slice(0, 24);
}

function throwOnError<T>(result: { data: T; error: any }): T {
  if (result.error)
    throw new Error(result.error.message ?? JSON.stringify(result.error));
  return result.data;
}

const sb = supabaseAdmin;

// --------------- User ---------------

export async function findUserByEmail(email: string) {
  const { data } = await sb
    .from("User")
    .select("*")
    .eq("email", email)
    .maybeSingle();
  return data;
}

export async function findUserById(id: string, select?: string) {
  const { data } = await sb
    .from("User")
    .select(select ?? "*")
    .eq("id", id)
    .maybeSingle();
  return data;
}

export async function findUserRole(id: string) {
  const { data } = await sb.from("User").select("role").eq("id", id).single();
  return data?.role as string | undefined;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const id = cuid();
  const now = new Date().toISOString();
  return throwOnError(
    await sb
      .from("User")
      .insert({ id, ...data, role: "USER", createdAt: now, updatedAt: now })
      .select()
      .single(),
  );
}

export async function countUsers() {
  const { count } = await sb
    .from("User")
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

// --------------- Account (NextAuth) ---------------

export async function createAccount(account: Record<string, any>) {
  return throwOnError(
    await sb.from("Account").insert(account).select().single(),
  );
}

export async function findAccount(provider: string, providerAccountId: string) {
  const { data } = await sb
    .from("Account")
    .select("*, user:User(*)")
    .eq("provider", provider)
    .eq("providerAccountId", providerAccountId)
    .maybeSingle();
  return data;
}

export async function deleteAccountsByUserId(userId: string) {
  await sb.from("Account").delete().eq("userId", userId);
}

// --------------- Session (NextAuth) ---------------

export async function createSession(session: Record<string, any>) {
  return throwOnError(
    await sb.from("Session").insert(session).select().single(),
  );
}

export async function findSession(sessionToken: string) {
  const { data } = await sb
    .from("Session")
    .select("*, user:User(*)")
    .eq("sessionToken", sessionToken)
    .maybeSingle();
  return data;
}

export async function updateSession(
  sessionToken: string,
  data: Record<string, any>,
) {
  return throwOnError(
    await sb
      .from("Session")
      .update(data)
      .eq("sessionToken", sessionToken)
      .select()
      .single(),
  );
}

export async function deleteSession(sessionToken: string) {
  await sb.from("Session").delete().eq("sessionToken", sessionToken);
}

export async function deleteSessionsByUserId(userId: string) {
  await sb.from("Session").delete().eq("userId", userId);
}

// --------------- Verification Token (NextAuth) ---------------

export async function createVerificationToken(data: {
  identifier: string;
  token: string;
  expires: string;
}) {
  return throwOnError(
    await sb.from("VerificationToken").insert(data).select().single(),
  );
}

export async function useVerificationToken(identifier: string, token: string) {
  const { data } = await sb
    .from("VerificationToken")
    .delete()
    .eq("identifier", identifier)
    .eq("token", token)
    .select()
    .maybeSingle();
  return data;
}

// --------------- Product ---------------

export async function getProducts({
  category,
  search,
  sort = "newest",
  page = 1,
  limit = 20,
}: {
  category?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
} = {}) {
  let query = sb
    .from("Product")
    .select("*, images:ProductImage(*), category:Category(*)", {
      count: "exact",
    })
    .eq("active", true);

  if (category) {
    // Need to filter by category slug — use inner join filter
    const { data: cat } = await sb
      .from("Category")
      .select("id")
      .eq("slug", category)
      .maybeSingle();
    if (cat) query = query.eq("categoryId", cat.id);
    else return { products: [], total: 0, pages: 0 };
  }

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,brand.ilike.%${search}%,description.ilike.%${search}%`,
    );
  }

  // Sorting
  if (sort === "price-asc") query = query.order("price", { ascending: true });
  else if (sort === "price-desc")
    query = query.order("price", { ascending: false });
  else if (sort === "popular")
    query = query.order("rating", { ascending: false });
  else query = query.order("createdAt", { ascending: false });

  // Pagination
  const from = (page - 1) * limit;
  query = query.range(from, from + limit - 1);

  const { data, count, error } = await query;
  if (error) throw new Error(error.message);

  // Sort images by position
  const products = (data ?? []).map((p: any) => ({
    ...p,
    images: (p.images ?? []).sort((a: any, b: any) => a.position - b.position),
  }));

  const total = count ?? 0;
  return { products, total, pages: Math.ceil(total / limit) };
}

export async function getProduct(idOrSlug: string) {
  const { data } = await sb
    .from("Product")
    .select("*, images:ProductImage(*), category:Category(*)")
    .eq("active", true)
    .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
    .maybeSingle();

  if (data && data.images) {
    data.images.sort((a: any, b: any) => a.position - b.position);
  }
  return data;
}

export async function getFeaturedProducts() {
  const { data } = await sb
    .from("Product")
    .select("*, images:ProductImage(*), category:Category(*)")
    .eq("featured", true)
    .eq("active", true)
    .limit(8);

  return (data ?? []).map((p: any) => ({
    ...p,
    images: (p.images ?? []).sort((a: any, b: any) => a.position - b.position),
  }));
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string,
) {
  const { data } = await sb
    .from("Product")
    .select("*, images:ProductImage(*), category:Category(*)")
    .eq("categoryId", categoryId)
    .neq("id", productId)
    .eq("active", true)
    .limit(4);

  return (data ?? []).map((p: any) => ({
    ...p,
    images: (p.images ?? []).sort((a: any, b: any) => a.position - b.position),
  }));
}

export async function findProductsByIds(ids: string[]) {
  const { data } = await sb
    .from("Product")
    .select("*, images:ProductImage(*)")
    .in("id", ids);
  return (data ?? []).map((p: any) => ({
    ...p,
    images: (p.images ?? []).sort((a: any, b: any) => a.position - b.position),
  }));
}

export async function countProducts() {
  const { count } = await sb
    .from("Product")
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

// --------------- Admin Products ---------------

export async function adminGetProducts() {
  const { data } = await sb
    .from("Product")
    .select("*, images:ProductImage(*), category:Category(*)")
    .order("createdAt", { ascending: false });

  return (data ?? []).map((p: any) => ({
    ...p,
    images: (p.images ?? []).sort((a: any, b: any) => a.position - b.position),
  }));
}

export async function adminCreateProduct(data: {
  name: string;
  slug: string;
  brand: string;
  description: string;
  price: number;
  compareAt?: number;
  sizes: string[];
  categoryId: string;
  featured: boolean;
  images: string[];
}) {
  const id = cuid();
  const now = new Date().toISOString();
  const { images, ...rest } = data;

  const product = throwOnError(
    await sb
      .from("Product")
      .insert({ id, ...rest, createdAt: now, updatedAt: now })
      .select()
      .single(),
  );

  if (images.length) {
    await sb.from("ProductImage").insert(
      images.map((url, i) => ({
        id: cuid(),
        url,
        position: i,
        productId: id,
      })),
    );
  }

  return product;
}

export async function adminUpdateProduct(
  id: string,
  data: {
    name?: string;
    slug?: string;
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
  const { images, ...rest } = data;
  const now = new Date().toISOString();

  const product = throwOnError(
    await sb
      .from("Product")
      .update({ ...rest, updatedAt: now })
      .eq("id", id)
      .select()
      .single(),
  );

  if (images) {
    await sb.from("ProductImage").delete().eq("productId", id);
    if (images.length) {
      await sb.from("ProductImage").insert(
        images.map((url, i) => ({
          id: cuid(),
          url,
          position: i,
          productId: id,
        })),
      );
    }
  }

  return product;
}

export async function adminDeleteProduct(id: string) {
  await sb.from("Product").delete().eq("id", id);
}

// --------------- Category ---------------

export async function getCategories() {
  const { data: categories } = await sb
    .from("Category")
    .select("*")
    .order("name");

  // Get product counts per category
  const result = [];
  for (const cat of categories ?? []) {
    const { count } = await sb
      .from("Product")
      .select("*", { count: "exact", head: true })
      .eq("categoryId", cat.id);
    result.push({ ...cat, _count: { products: count ?? 0 } });
  }
  return result;
}

export async function getCategoriesSimple() {
  const { data } = await sb.from("Category").select("*").order("name");
  return data ?? [];
}

export async function adminCreateCategory(data: {
  name: string;
  slug: string;
  description?: string;
  image?: string;
}) {
  const id = cuid();
  const now = new Date().toISOString();
  return throwOnError(
    await sb
      .from("Category")
      .insert({ id, ...data, createdAt: now, updatedAt: now })
      .select()
      .single(),
  );
}

export async function adminUpdateCategory(
  id: string,
  data: { name?: string; slug?: string; description?: string; image?: string },
) {
  const now = new Date().toISOString();
  return throwOnError(
    await sb
      .from("Category")
      .update({ ...data, updatedAt: now })
      .eq("id", id)
      .select()
      .single(),
  );
}

export async function adminDeleteCategory(id: string) {
  await sb.from("Category").delete().eq("id", id);
}

// --------------- Banner ---------------

export async function getBanners() {
  const { data } = await sb
    .from("Banner")
    .select("*")
    .eq("active", true)
    .order("position");
  return data ?? [];
}

export async function adminGetBanners() {
  const { data } = await sb.from("Banner").select("*").order("position");
  return data ?? [];
}

export async function adminCreateBanner(data: {
  title: string;
  subtitle?: string;
  cta?: string;
  link?: string;
  bgColor?: string;
}) {
  const id = cuid();
  const now = new Date().toISOString();
  return throwOnError(
    await sb
      .from("Banner")
      .insert({ id, ...data, createdAt: now, updatedAt: now })
      .select()
      .single(),
  );
}

export async function adminDeleteBanner(id: string) {
  await sb.from("Banner").delete().eq("id", id);
}

// --------------- Order ---------------

export async function getOrders(userId: string): Promise<Order[]> {
  const { data } = await sb
    .from("Order")
    .select("*, items:OrderItem(*)")
    .eq("userId", userId)
    .order("createdAt", { ascending: false });
  return data ?? [];
}

export async function createOrder(data: {
  userId: string;
  subtotal: number;
  shipping: number;
  total: number;
  addressId: string | null;
  items: {
    productId: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    image: string | null;
  }[];
}) {
  const id = cuid();
  const now = new Date().toISOString();
  const { items, ...rest } = data;

  const order = throwOnError(
    await sb
      .from("Order")
      .insert({
        id,
        ...rest,
        status: "PENDING",
        createdAt: now,
        updatedAt: now,
      })
      .select()
      .single(),
  );

  if (items.length) {
    await sb
      .from("OrderItem")
      .insert(items.map((item) => ({ id: cuid(), orderId: id, ...item })));
  }

  // Fetch back with items
  const { data: full } = await sb
    .from("Order")
    .select("*, items:OrderItem(*)")
    .eq("id", id)
    .single();

  return full ?? order;
}

export async function adminGetOrders() {
  const { data } = await sb
    .from("Order")
    .select("*, items:OrderItem(*), user:User(name, email)")
    .order("createdAt", { ascending: false });
  return data ?? [];
}

export async function adminUpdateOrderStatus(id: string, status: string) {
  const now = new Date().toISOString();
  return throwOnError(
    await sb
      .from("Order")
      .update({ status, updatedAt: now })
      .eq("id", id)
      .select()
      .single(),
  );
}

export async function countOrders() {
  const { count } = await sb
    .from("Order")
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

export async function sumOrderTotal() {
  const { data } = await sb.from("Order").select("total");
  return (data ?? []).reduce((sum: number, o: any) => sum + (o.total ?? 0), 0);
}

// --------------- Address ---------------

export async function findDefaultAddress(userId: string) {
  const { data } = await sb
    .from("Address")
    .select("*")
    .eq("userId", userId)
    .eq("isDefault", true)
    .maybeSingle();
  return data;
}

// --------------- Setting ---------------

export async function getSetting(key: string) {
  const { data } = await sb
    .from("Setting")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  return data?.value ?? "";
}

export async function saveSetting(key: string, value: string) {
  const now = new Date().toISOString();
  const { data: existing } = await sb
    .from("Setting")
    .select("key")
    .eq("key", key)
    .maybeSingle();
  if (existing) {
    await sb.from("Setting").update({ value, updatedAt: now }).eq("key", key);
  } else {
    await sb.from("Setting").insert({ key, value, updatedAt: now });
  }
}

export async function getSettings(keys: string[]) {
  const { data } = await sb
    .from("Setting")
    .select("key, value")
    .in("key", keys);
  const map: Record<string, string> = {};
  for (const s of data ?? []) map[s.key] = s.value;
  return map;
}
