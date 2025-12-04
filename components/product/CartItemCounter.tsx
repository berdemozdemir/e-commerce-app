import { TCartItem } from '@/lib/schemas/cart/cart-item.schema';
import {
  useAddToCartMutation,
  useRemoveItemFromCartMutation,
} from '@/lib/services/cart';
import { Minus, Plus } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../LoadingSpinner';

type Props = {
  item: TCartItem;
  quantity?: number;
};

export const CartItemCounter: FC<Props> = (props) => {
  const removeItemFromCartMutation = useRemoveItemFromCartMutation();

  const addToCartMutation = useAddToCartMutation();

  const removeItem = async () => {
    await removeItemFromCartMutation.mutateAsync({
      productId: props.item.productId,
    });

    toast.success('Item was removed from cart');
  };

  const addItem = async () => {
    await addToCartMutation.mutateAsync(props.item);

    toast.success('Item was added to cart');
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <div
        className="w-fit cursor-pointer rounded-md bg-gray-300 p-2 hover:bg-gray-200"
        onClick={removeItem}
      >
        {removeItemFromCartMutation.isPending ? <LoadingSpinner /> : <Minus />}
      </div>

      <span className="text-lg font-semibold">{props.quantity}</span>

      <div
        className="w-fit cursor-pointer rounded-md bg-gray-300 p-2 hover:bg-gray-200"
        onClick={addItem}
      >
        {addToCartMutation.isPending ? <LoadingSpinner /> : <Plus />}
      </div>
    </div>
  );
};
