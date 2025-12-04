import { TCartItem } from '@/lib/schemas/cart/cart-item.schema';
import { Button } from '../ui/Button';
import { toast } from 'react-toastify';
import { useAddToCartMutation } from '@/lib/services/cart';
import { LoadingSpinner } from '../LoadingSpinner';

// TODO: add disable prop here
export const AddToCart = (item: TCartItem) => {
  const addToCartMutation = useAddToCartMutation();

  const submit = async () => {
    const result = await addToCartMutation.mutateAsync(item);

    if (result.status === 'success') {
      toast.success(result.message);
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
