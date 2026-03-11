export type Product = {
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

export type FeaturedProduct = Pick<
  Product,
  'id' | 'slug' | 'name' | 'banner'
>;

export type AdminProduct = Pick<
  Product,
  'id' | 'slug' | 'name' | 'price' | 'category' | 'stock' | 'rating'
>;
