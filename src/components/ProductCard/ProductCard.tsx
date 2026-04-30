import type { Product } from "@/types/products";
import Image from "next/image";

export type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => (
  <div className="rounded-md border p-4">
    <div className="relative h-60 w-full mb-4">
      <Image
        src={product.images}
        alt={product.name}
        fill
        className="rounded-md object-fill"
      />
    </div>
    <div className="mb-2 flex justify-center flex-col items-center">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
    </div>
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-center mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      Buy
    </a>
  </div>
);
