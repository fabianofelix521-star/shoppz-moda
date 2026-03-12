export const dynamic = "force-dynamic";

import { adminGetProducts, adminGetCategories } from "@/actions/admin";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { AdminProductActions } from "./actions";
import { AddProductButton } from "./add-product-button";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    adminGetProducts(),
    adminGetCategories(),
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{products.length} total</span>
          <AddProductButton
            categories={categories.map((c) => ({ id: c.id, name: c.name }))}
          />
        </div>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-gray-200 p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 relative flex-shrink-0">
                {product.images[0] && (
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </p>
                <p className="text-xs text-gray-400">{product.brand}</p>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${
                  product.active
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {product.active ? "Ativo" : "Inativo"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium text-gray-900">
                  {formatPrice(product.price)}
                </span>
                <span className="text-gray-400 mx-2">·</span>
                <span className="text-gray-500">{product.category.name}</span>
              </div>
              <AdminProductActions
                productId={product.id}
                active={product.active}
                product={{
                  id: product.id,
                  name: product.name,
                  brand: product.brand,
                  description: product.description,
                  price: product.price,
                  compareAt: product.compareAt,
                  sizes: product.sizes,
                  categoryId: product.categoryId,
                  featured: product.featured,
                  images: product.images.map((i) => ({ url: i.url })),
                }}
                categories={categories.map((c) => ({ id: c.id, name: c.name }))}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Produto
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Categoria
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Preço
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 relative flex-shrink-0">
                      {product.images[0] && (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-400">{product.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {product.category.name}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {formatPrice(product.price)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      product.active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {product.active ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <AdminProductActions
                    productId={product.id}
                    active={product.active}
                    product={{
                      id: product.id,
                      name: product.name,
                      brand: product.brand,
                      description: product.description,
                      price: product.price,
                      compareAt: product.compareAt,
                      sizes: product.sizes,
                      categoryId: product.categoryId,
                      featured: product.featured,
                      images: product.images.map((i) => ({ url: i.url })),
                    }}
                    categories={categories.map((c) => ({
                      id: c.id,
                      name: c.name,
                    }))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
