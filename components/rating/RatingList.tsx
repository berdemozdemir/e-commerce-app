import { FC } from 'react';
import { RatingCard } from './RatingCard';
import { RatingCardSkeleton } from './RatingCardSkeleton';
import { useGetProductRatingsQuery } from '@/lib/services/rating';

export const RatingList: FC<{ productId: string }> = ({ productId }) => {
  const { data, isLoading, error } = useGetProductRatingsQuery(productId);

  if (data?.length === 0) return <div>No ratings found</div>;

  if (data)
    return (
      <div className="space-y-4">
        {data?.map((rating) => <RatingCard key={rating.id} rating={rating} />)}
      </div>
    );

  if (isLoading)
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <RatingCardSkeleton key={index} />
        ))}
      </div>
    );

  return <div>Error: {error?.message}</div>;
};
