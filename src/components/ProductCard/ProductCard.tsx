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
  const [selectedSize, setSelectedSize] = useState<string>('S');

  return (
    <div className="w-full max-w-sm rounded-md border-4 border-black bg-black/25 p-5 backdrop-blur-sm transition duration-300 hover:scale-101 hover:transform hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]">
      <div className="relative mb-4 h-72 w-full cursor-pointer overflow-hidden rounded-lg transition duration-200 hover:scale-101">
        <Lightbox
          open={openImage}
          close={() =>{  setOpenImage(false); }}
          slides={[{ src: product.images }]}
          plugins={[Zoom]}
          animation={{ fade: 100, swipe: 0 }}
          zoom={{ minZoom: 1, maxZoom: 2 }}
          toolbar={{ buttons: ['zoomIn', 'zoomOut', 'close'] }}
        />
        <Image
          src={product.images}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain"
          onClick={() =>{  setOpenImage(true); }}
        />
      </div>
      <div className="mb-2 flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
        <div className="mt-4 flex items-center justify-center">
          <input
            type="radio"
            id="size-s"
            name="size"
            value="S"
            checked={selectedSize === 'S'}
            onChange={(event) =>{  setSelectedSize(event.target.value); }}
          />
          <label htmlFor="size-s" className="ml-2">
            S
          </label>
          <input
            type="radio"
            id="size-m"
            name="size"
            value="M"
            checked={selectedSize === 'M'}
            onChange={(event) =>{  setSelectedSize(event.target.value); }}
            className="ml-4"
          />
          <label htmlFor="size-m" className="ml-2">
            M
          </label>
          <input
            type="radio"
            id="size-l"
            name="size"
            value="L"
            checked={selectedSize === 'L'}
            onChange={(event) =>{  setSelectedSize(event.target.value); }}
            className="ml-4"
          />
          <label htmlFor="size-l" className="ml-2">
            L
          </label>
          <input
            type="radio"
            id="size-xl"
            name="size"
            value="XL"
            checked={selectedSize === 'XL'}
            onChange={(event) =>{  setSelectedSize(event.target.value); }}
            className="ml-4"
          />
          <label htmlFor="size-xl" className="ml-2">
            XL
          </label>
        </div>
      </div>
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex justify-center rounded bg-black px-4 py-2 text-white transition duration-200 hover:scale-105 hover:transform hover:bg-[rgb(34,197,94,0.5)]"
      >
        Buy
      </a>
    </div>
  );
};
