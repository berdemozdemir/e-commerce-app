import { z } from 'zod';
import {
  cartItemSchema,
  cartSchema,
} from '@/lib/schemas/cart/cart-item.schema';

export type TCartItem = z.infer<typeof cartItemSchema>;

export type TCart = z.infer<typeof cartSchema>;
