import { Product, ProductImage, Category } from "@prisma/client";

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
