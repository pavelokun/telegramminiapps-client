export type AssetsDto = {
  cover?: string;
};

export type ProductDto = {
  id: string;
  title: string;
  description: string;
  assets: AssetsDto;
  basePrice?: number;
};
