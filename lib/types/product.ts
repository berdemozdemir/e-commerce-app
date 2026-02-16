import { TCreateProductSchema } from '../schemas/product/create-product.schema';

// TODO: make this type one
export type TProduct = TCreateProductSchema & {
  id: string;
  slug: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
};

export type TAdminProduct = Pick<
  TProduct,
  'id' | 'slug' | 'name' | 'price' | 'category' | 'stock' | 'rating'
>;
