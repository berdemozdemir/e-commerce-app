'use client';

import { FC } from 'react';
import { CreateRatingDialog } from './CreateRatingDialog';
import { RatingList } from './RatingList';

export const RatingSection: FC<{ productId: string }> = ({ productId }) => {
  return (
    <div>
      <div className="mb-10 flex items-center gap-10">
        <h1 className="text-2xl font-semibold">Customer Ratings</h1>

        <CreateRatingDialog productId={productId} />
      </div>

      <RatingList />
    </div>
  );
};
