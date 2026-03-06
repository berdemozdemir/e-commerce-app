import { Rating } from '@/lib/types/rating';
import { formatDate } from '@/lib/utils/date';
import { Star, User } from 'lucide-react';
import { FC } from 'react';

export const RatingCard: FC<{ rating: Rating }> = ({ rating }) => {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-md border p-4 shadow">
      <div className="text-ellipsis">
        <h2 className="text-lg font-bold">{rating.title}</h2>

        <p className="text-sm">{rating.comment}</p>
      </div>

      <div className="flex items-center gap-4">
        {Array.from({ length: rating.rating }).map((_, index) => (
          <Star
            key={index}
            className="size-4 fill-yellow-500 text-yellow-500"
          />
        ))}

        <div className="flex items-center gap-1 text-gray-500">
          <User size={14} />

          <span className="text-sm text-gray-500">{rating.userName}</span>
        </div>

        <p className="text-sm text-gray-500">{formatDate(rating.createdAt)}</p>
      </div>
    </div>
  );
};
