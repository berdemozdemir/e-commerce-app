import { TCreateProductSchema } from '@/schemas/product/create-product.schema';

export type TProduct = TCreateProductSchema & {
  id: string;
  createdAt: Date;
};
