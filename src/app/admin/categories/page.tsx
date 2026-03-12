export const dynamic = "force-dynamic";

import { adminGetCategories } from "@/actions/admin";
import { AdminCategoryActions } from "./actions";
import { AddCategoryButton } from "./add-category-button";

export default async function AdminCategoriesPage() {
  const categories = await adminGetCategories();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
        <AddCategoryButton />
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-3">
        {categories.map((category: any) => (
          <div
            key={category.id}
            className="bg-white rounded-2xl border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {category.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {category.slug} · {category._count.products} produtos
                </p>
              </div>
              <AdminCategoryActions
                categoryId={category.id}
                category={{
                  id: category.id,
                  name: category.name,
                  description: (category as any).description,
                  image: (category as any).image,
                }}
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
                Nome
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Slug
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Produtos
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((category: any) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {category.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {category.slug}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {category._count.products}
                </td>
                <td className="px-4 py-3">
                  <AdminCategoryActions
                    categoryId={category.id}
                    category={{
                      id: category.id,
                      name: category.name,
                      description: (category as any).description,
                      image: (category as any).image,
                    }}
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
