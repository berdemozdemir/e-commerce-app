import { TCreateProductSchema } from '../schemas/product/create-product.schema';

// TODO: make this type one
export type TProduct = TCreateProductSchema & {
  id: string;
  createdAt: Date;
};

export type TAdminProduct = Pick<
  TProduct,
  'id' | 'name' | 'price' | 'category' | 'stock' | 'rating'
>;
