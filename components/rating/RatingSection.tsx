'use client';

import { FC } from 'react';
import { CreateRatingDialog } from './CreateRatingDialog';
import { RatingList } from './RatingList';
import { useAuthQuery } from '@/lib/hooks/useAuthQuery';

export const RatingSection: FC<{ productId: string }> = ({ productId }) => {
  const { data } = useAuthQuery();

  return (
    <div>
      <div className="mb-4 flex items-center gap-10">
        <h1 className="text-2xl font-semibold">Customer Comments</h1>

        {data?.isLoggedIn && <CreateRatingDialog productId={productId} />}
      </div>

      <RatingList productId={productId} />
    </div>
  );
};
