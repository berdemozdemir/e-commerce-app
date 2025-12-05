import { FC } from 'react';
import { Button } from '../ui/Button';

export const EmptyCart: FC = () => (
  <div className="p-6 text-center text-gray-600">
    <p className="mb-4">
      Your cart is empty. You have not added any products yet. Browse our
      collection and add items to your cart to see them here. Once you add
      products, they will appear in your cart and you can proceed to checkout.
    </p>

    <Button>Shop Now</Button>
  </div>
);
