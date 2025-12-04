import { TCreateProductSchema } from '../schemas/product/create-product.schema';

// TODO: make this type one
export type TProduct = TCreateProductSchema & {
  id: string;
  createdAt: Date;
};
