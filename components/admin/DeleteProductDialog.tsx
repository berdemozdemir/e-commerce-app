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
import { LoadingSpinner } from '../LoadingSpinner';
import { Button } from '../ui/Button';
import { useDeleteProductByIdMutation } from '@/lib/services/admin';
import { toast } from 'react-toastify';

type Props = {
  productId: string;
};

export const DeleteProductDialog: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  const deleteProductMutation = useDeleteProductByIdMutation();

  const deleteProduct = async () => {
    if (deleteProductMutation.isPending) return;

    try {
      await deleteProductMutation.mutateAsync({ productId: props.productId });

      toast.success('Product deleted successfully');

      setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete product',
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Delete</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this product? This action cannot be
          undone.
        </DialogDescription>

        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            variant="destructive"
            onClick={deleteProduct}
            disabled={deleteProductMutation.isPending}
          >
            Delete
            {deleteProductMutation.isPending && <LoadingSpinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
