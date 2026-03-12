// Types matching the Supabase/PostgREST schema (no Prisma dependency needed at runtime)

export type Product = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
  price: number;
  compareAt: number | null;
  rating: number;
  reviewCount: number;
  sizes: string[];
  featured: boolean;
  active: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductImage = {
  id: string;
  url: string;
  alt: string | null;
  position: number;
  productId: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProductWithImages = Product & {
  images: ProductImage[];
  category: Category;
};

export type CartItemWithProduct = {
  id: string;
  productId: string;
  size: string;
  quantity: number;
  product: Product & { images: ProductImage[] };
};

export type SortOption = "newest" | "price-asc" | "price-desc" | "popular";

export type Banner = {
  id: string;
  title: string;
  subtitle: string | null;
  cta: string;
  link: string;
  image: string | null;
  bgColor: string;
  active: boolean;
  position: number;
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string | null;
};

export type Order = {
  id: string;
  userId: string;
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  addressId: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
};
