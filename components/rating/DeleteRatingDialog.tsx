import { FC } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '../ui/Dialog';
import { LoadingSpinner } from '../LoadingSpinner';
import { useDeleteRatingMutation } from '@/lib/services/rating';

type Props = {
  ratingId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const DeleteRatingDialog: FC<Props> = ({
  ratingId,
  open,
  onOpenChange,
}) => {
  const deleteRatingMutation = useDeleteRatingMutation();

  const handleDelete = async () => {
    if (deleteRatingMutation.isPending) return;

    await deleteRatingMutation.mutateAsync({ ratingId });

    toast.success('Rating deleted successfully');

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogTitle>Delete Rating</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this rating? This action cannot be
          undone.
        </DialogDescription>

        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteRatingMutation.isPending}
          >
            Delete
            {deleteRatingMutation.isPending && <LoadingSpinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
