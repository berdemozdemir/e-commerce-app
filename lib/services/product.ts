import { useQuery } from '@tanstack/react-query';
import { getProductCategories } from '../actions/product/get-product-categories';
import { unwrapAsync } from '../result';

export const useGetProductCategoriesQuery = () => {
  return useQuery({
    queryKey: ['product-categories'],
    queryFn: () => unwrapAsync(getProductCategories()),
  });
};
