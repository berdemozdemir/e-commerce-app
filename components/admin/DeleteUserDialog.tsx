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
import { useDeleteUserByIdMutation } from '@/lib/services/admin';
import { toast } from 'react-toastify';

type Props = {
  userId: string;
};

export const DeleteUserDialog: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  const deleteUserMutation = useDeleteUserByIdMutation();

  const deleteUser = async () => {
    if (deleteUserMutation.isPending) return;

    try {
      await deleteUserMutation.mutateAsync({ userId: props.userId });

      toast.success('User deleted successfully');

      setOpen(false);
    } catch (error) {
      // this one already handled in mutation
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Delete User</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this user? This action cannot be
          undone.
        </DialogDescription>

        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            variant="destructive"
            onClick={deleteUser}
            disabled={deleteUserMutation.isPending}
          >
            Delete
            {deleteUserMutation.isPending && <LoadingSpinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
