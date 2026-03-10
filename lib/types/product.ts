export type TProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  stock: number;
  images: string[];
  isFeatured: boolean;
  banner: string | null;
  price: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
};

export type TFeaturedProduct = Pick<
  TProduct,
  'id' | 'slug' | 'name' | 'banner'
>;

export type TAdminProduct = Pick<
  TProduct,
  'id' | 'slug' | 'name' | 'price' | 'category' | 'stock' | 'rating'
>;
