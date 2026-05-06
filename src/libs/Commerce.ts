import type { Product } from '../types/products';

export const baseUrl = 'https://api.bigcartel.com';

export const jsonHeaders = {
  'Content-Type': 'application/json',
} as const satisfies HeadersInit;

export type RawBigCartelProductImage = {
  url: string;
  secure_url: string;
  width: number;
  height: number;
};

export type RawBigCartelProduct = {
  id: number;
  name: string;
  price: number;
  images: RawBigCartelProductImage[];
  url: string;
};

export const handleServerResponse = async <T>(res: Response): Promise<T> => {
  const payload: unknown = await res.json();

  if (!res.ok) {
    throw payload;
  }

  return payload as T;
};

export const mapProductData = (data: RawBigCartelProduct): Product => ({
  id: data.id,
  name: data.name,
  price: data.price,
  images: data.images[0]?.url ?? '',
  url: `https://tensbychase.bigcartel.com${data.url}`,
});

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${baseUrl}/tensbychase/products.json`, {
    headers: jsonHeaders,
  });
  const rawProducts = await handleServerResponse<RawBigCartelProduct[]>(res);
  return rawProducts.map(mapProductData);
};
