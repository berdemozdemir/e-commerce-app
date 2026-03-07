import { useAuthQuery } from '@/lib/hooks/useAuthQuery';
import { Rating } from '@/lib/types/rating';
import { formatDate } from '@/lib/utils/date';
import { Pencil, Star, Trash, User } from 'lucide-react';
import { FC, useState } from 'react';
import { Button } from '../ui/Button';
import { DeleteRatingDialog } from './DeleteRatingDialog';
import { UpdateRatingFormDialog } from './UpdateRatingFormDialog';

export const RatingCard: FC<{ rating: Rating }> = ({ rating }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const { data } = useAuthQuery();

  return (
    <div className="relative flex flex-col justify-between gap-4 rounded-md border p-5 shadow">
      <div>
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

      {data?.isLoggedIn && data.user?.id === rating.userId && (
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="opacity-60 hover:opacity-100"
            onClick={() => setUpdateDialogOpen(true)}
          >
            <Pencil className="size-4" />
          </Button>

          <Button
            variant="destructive"
            className="opacity-60 hover:opacity-100"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash className="size-4" />
          </Button>
        </div>
      )}

      <DeleteRatingDialog
        ratingId={rating.id}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />

      {/* TODO: add a time limit to update the rating */}
      <UpdateRatingFormDialog
        ratingId={rating.id}
        productId={rating.productId}
        title={rating.title}
        comment={rating.comment}
        rating={rating.rating}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
      />
    </div>
  );
};
