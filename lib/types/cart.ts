import { z } from 'zod';
import {
  cartItemSchema,
  cartSchema,
} from '@/lib/schemas/cart/cart-item.schema';

export type CartItem = z.infer<typeof cartItemSchema>;

export type Cart = z.infer<typeof cartSchema>;
