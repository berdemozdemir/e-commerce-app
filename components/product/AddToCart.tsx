import { TCartItem } from '@/lib/schemas/cart/cart-item.schema';
import { Button } from '../ui/Button';
import { toast } from 'react-toastify';
import { useAddToCartMutation } from '@/lib/services/cart';
import { LoadingSpinner } from '../LoadingSpinner';

export const AddToCart = (item: TCartItem) => {
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
