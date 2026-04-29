import type { Product } from '@/types/products';

export type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => (
  <div className="rounded-md border p-4">
    <img
      src={product.images}
      alt={product.name}
      className="mb-4 h-48 w-full rounded object-cover"
    />
    <h2 className="mb-2 text-lg font-semibold">{product.name}</h2>
    <p className="mb-4 text-gray-600">{product.description}</p>
    <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
  </div>
);
