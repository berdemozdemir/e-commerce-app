import { FC, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../ui/Dialog';
import { Button } from '../ui/Button';
import { useDeleteOrderMutation } from '@/lib/services/admin';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../LoadingSpinner';

type Props = {
  orderId: string;
};

export const DeleteOrderDialog: FC<Props> = ({ orderId }) => {
  const [open, setOpen] = useState(false);

  const deleteOrderMutation = useDeleteOrderMutation();

  const handleDelete = async () => {
    try {
      await deleteOrderMutation.mutateAsync({ orderId });

      toast.success('Order deleted successfully');

      setOpen(false);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Delete Order</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this order? This action cannot be
          undone.
        </DialogDescription>

        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteOrderMutation.isPending}
          >
            Delete
            {deleteOrderMutation.isPending && <LoadingSpinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
