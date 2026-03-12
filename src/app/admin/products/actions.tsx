"use client";

import { useState } from "react";
import { adminUpdateProduct, adminDeleteProduct } from "@/actions/admin";
import { useRouter } from "next/navigation";
import { ProductForm } from "./product-form";

interface AdminProductActionsProps {
  productId: string;
  active: boolean;
  product: {
    id: string;
    name: string;
    brand: string;
    description: string;
    price: number;
    compareAt: number | null;
    sizes: string[];
    categoryId: string;
    featured: boolean;
    images: { url: string }[];
  };
  categories: { id: string; name: string }[];
}

export function AdminProductActions({
  productId,
  active,
  product,
  categories,
}: AdminProductActionsProps) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setEditing(true)}
          className="text-xs font-medium text-green-600 hover:underline"
        >
          Editar
        </button>
        <button
          onClick={async () => {
            await adminUpdateProduct(productId, { active: !active });
            router.refresh();
          }}
          className="text-xs font-medium text-blue-600 hover:underline"
        >
          {active ? "Desativar" : "Ativar"}
        </button>
        <button
          onClick={async () => {
            if (confirm("Excluir este produto?")) {
              await adminDeleteProduct(productId);
              router.refresh();
            }
          }}
          className="text-xs font-medium text-red-600 hover:underline"
        >
          Excluir
        </button>
      </div>
      {editing && (
        <ProductForm
          categories={categories}
          product={product}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}
