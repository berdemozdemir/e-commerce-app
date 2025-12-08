import { useQuery } from '@tanstack/react-query';
import { getLatestProducts, getProductBySlug } from '../actions/product';

// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://query-key-factory.aziznal.com/notes

// TODO: take a look at this query keys
export const useGetLatestProductsQuery = () =>
  useQuery({
    queryKey: ['latest-products'],
    queryFn: () => getLatestProducts(),
  });

export const useGetProductBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  });
