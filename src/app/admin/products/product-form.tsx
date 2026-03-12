"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminCreateProduct, adminUpdateProduct } from "@/actions/admin";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
}

interface ImageItem {
  url: string;
  file?: File;
  preview?: string;
}

interface ProductFormProps {
  categories: Category[];
  product?: {
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
  onClose: () => void;
}

export function ProductForm({
  categories,
  product,
  onClose,
}: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(product?.name || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [compareAt, setCompareAt] = useState(
    product?.compareAt?.toString() || "",
  );
  const [sizes, setSizes] = useState(product?.sizes?.join(", ") || "");
  const [categoryId, setCategoryId] = useState(product?.categoryId || "");
  const [featured, setFeatured] = useState(product?.featured || false);

  const [images, setImages] = useState<ImageItem[]>(
    product?.images?.map((i) => ({ url: i.url })) || [],
  );

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const newImages: ImageItem[] = Array.from(files).map((file) => ({
      url: "",
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeImage(index: number) {
    setImages((prev) => {
      const img = prev[index];
      if (img.preview) URL.revokeObjectURL(img.preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  async function uploadFiles(filesToUpload: File[]): Promise<string[]> {
    if (!filesToUpload.length) return [];
    const formData = new FormData();
    filesToUpload.forEach((f) => formData.append("files", f));
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Erro no upload");
    }
    const data = await res.json();
    return data.urls;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const newFiles = images.filter((i) => i.file).map((i) => i.file!);
      const uploadedUrls = await uploadFiles(newFiles);

      let uploadIndex = 0;
      const finalImages: string[] = [];
      for (const img of images) {
        if (img.file) {
          finalImages.push(uploadedUrls[uploadIndex++]);
        } else {
          finalImages.push(img.url);
        }
      }

      const data = {
        name,
        brand,
        description,
        price: parseFloat(price),
        compareAt: compareAt ? parseFloat(compareAt) : undefined,
        sizes: sizes
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        categoryId,
        featured,
        images: finalImages,
      };

      if (product) {
        await adminUpdateProduct(product.id, data);
      } else {
        await adminCreateProduct(data);
      }
      router.refresh();
      onClose();
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 mb-10 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-bold text-gray-900 mb-5">
          {product ? "Editar Produto" : "Novo Produto"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Nome
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Marca
            </label>
            <Input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-gray-400 focus:outline-none resize-none"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Preço (R$)
              </label>
              <Input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Preço anterior (opcional)
              </label>
              <Input
                type="number"
                step="0.01"
                value={compareAt}
                onChange={(e) => setCompareAt(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Tamanhos (separados por vírgula)
            </label>
            <Input
              placeholder="P, M, G, GG"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Categoria
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-gray-400 focus:outline-none bg-white"
              required
            >
              <option value="">Selecionar...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {/* Image Upload */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-2 block">
              Fotos do Produto
            </label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group"
                >
                  <Image
                    src={img.preview || img.url}
                    alt={`Foto ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                    unoptimized={!!img.preview}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors">
                <Upload size={20} className="text-gray-400 mb-1" />
                <span className="text-[10px] text-gray-400">Adicionar</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </label>
            </div>
            <p className="text-[10px] text-gray-400">
              JPG, PNG, WebP ou AVIF · Máx. 5MB por foto
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="rounded"
            />
            Produto em destaque
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="md" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isPending}
            >
              {isPending
                ? "Salvando..."
                : product
                  ? "Salvar Alterações"
                  : "Criar Produto"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
