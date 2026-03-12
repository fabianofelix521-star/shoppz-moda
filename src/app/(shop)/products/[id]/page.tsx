import { notFound } from "next/navigation";
import { getProduct, getRelatedProducts } from "@/actions/products";
import { ProductDetailClient } from "./client";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductReviews } from "@/components/product/product-reviews";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  const related = await getRelatedProducts(product.id, product.categoryId);

  return (
    <>
      <ProductDetailClient product={product} />
      {related.length > 0 && (
        <div className="mt-8 px-5 pb-8 mx-auto max-w-7xl">
          <h2 className="text-lg font-bold text-[#111111] mb-4">
            Você também pode gostar
          </h2>
          <ProductGrid products={related} />
        </div>
      )}
      <ProductReviews productId={product.id} />
    </>
  );
}
