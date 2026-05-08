export type ProductOption = {
  id: number;
  name: string;
  price: number;
  soldOut: boolean;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  url: string;
  options: ProductOption[];
};
