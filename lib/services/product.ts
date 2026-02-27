import { getProductCategories } from '../actions/product/get-product-categories';
import { okOrThrow } from '../result';
import { useQuery } from '@tanstack/react-query';

export const useGetProductCategoriesQuery = () => {
  return useQuery({
    queryKey: ['product-categories'],
    queryFn: () => getProductCategories().then(okOrThrow),
  });
};
