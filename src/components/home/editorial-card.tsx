import Image from "next/image";
import Link from "next/link";
import { ProductWithImages } from "@/types";

export function EditorialCard({ product }: { product: ProductWithImages }) {
  const image = product.images[0]?.url;

  return (
    <Link href={`/products/${product.id}`} className="block mx-5">
      <div className="glass-card relative rounded-[30px] overflow-hidden aspect-[4/3]">
        {image && (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white font-bold text-base mb-1">
            Nova coleção {product.brand}
          </h3>
          <p className="text-white/70 text-xs">
            Encontre o melhor da nova coleção
          </p>
        </div>
      </div>
    </Link>
  );
}
