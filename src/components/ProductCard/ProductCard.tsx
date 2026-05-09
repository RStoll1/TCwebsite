'use client';

import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import type { Product } from '@/types/products';
import 'yet-another-react-lightbox/styles.css';

export type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const [openImage, setOpenImage] = useState(false);
  const [selectedSize, setSelectedSize] = useState<number | undefined>(
    product.options.find((o) => !o.soldOut)?.id
  );
  const selectedOption = product.options.find((o) => o.id === selectedSize);

  return (
    <div className="w-full max-w-sm rounded-md border-4 border-black bg-black/25 p-5 backdrop-blur-sm transition duration-300 hover:scale-101 hover:transform hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]">
      <div className="relative mb-4 h-72 w-full cursor-pointer overflow-hidden rounded-lg transition duration-200 hover:scale-101">
        <Lightbox
          open={openImage}
          close={() => {
            setOpenImage(false);
          }}
          slides={[{ src: product.image }]}
          plugins={[Zoom]}
          animation={{ fade: 100, swipe: 0 }}
          zoom={{ minZoom: 1, maxZoom: 2 }}
          toolbar={{ buttons: ['zoomIn', 'zoomOut', 'close'] }}
        />
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain"
          onClick={() => {
            setOpenImage(true);
          }}
        />
      </div>
      <form
        action="https://tensbychase.bigcartel.com/cart"
        method="POST"
        target="_blank"
        className="mb-2 flex flex-col items-center justify-center"
      >
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
        <div className="mt-4 flex items-center justify-center">
          <label htmlFor={`size-select-${product.id}`} className="mr-2">
            Size:
          </label>
          <select
            id={`size-select-${product.id}`}
            value={selectedSize}
            onChange={(e) => {
              setSelectedSize(Number(e.target.value));
            }}
            className="cursor-pointer rounded border-2 border-gray-300 bg-white px-3 py-1 focus:border-gray-500 focus:outline-none"
          >
            {product.options.map((option) => (
              <option
                key={option.id}
                value={option.id}
                disabled={option.soldOut}
              >
                {option.name} {option.soldOut ? '(Sold Out)' : ''}
              </option>
            ))}
          </select>
        </div>
        <input type="hidden" name="cart[add][id]" value={selectedSize ?? ''} />
        <button
          type="submit"
          disabled={
            selectedSize === undefined || selectedOption?.soldOut === true
          }
          className="mt-4 flex w-full justify-center rounded bg-black px-4 py-2 text-white transition duration-200 hover:scale-105 hover:transform hover:bg-[rgb(34,197,94,0.5)]"
        >
          Buy
        </button>
      </form>
    </div>
  );
};
