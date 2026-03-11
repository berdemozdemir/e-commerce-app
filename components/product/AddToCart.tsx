import { toast } from 'react-toastify';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../LoadingSpinner';
import { CartItem } from '@/lib/types/cart';
import { useAddToCartMutation } from '@/lib/services/cart';

export const AddToCart = (item: CartItem) => {
  const addToCartMutation = useAddToCartMutation();

  const submit = async () => {
    try {
      await addToCartMutation.mutateAsync(item);

      toast.success(`${item.name} was added to cart`);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Button
      className="w-full"
      onClick={submit}
      disabled={addToCartMutation.isPending}
    >
      Add to cart {addToCartMutation.isPending ? <LoadingSpinner /> : null}
    </Button>
  );
};
