import { convertNumberToDecimal } from '@/lib/utils';
import { z } from 'zod';

export const cartItemSchema = z.object({
  productId: z.string().min(1, { message: 'Product is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  slug: z.string().min(1, { message: 'Slug is required' }),
  quantity: z.number().positive(),
  image: z.string().min(1, { message: 'Image is required' }),
  price: z.string(),
});

// TODO: move these types to type folder
export type TCartItem = z.infer<typeof cartItemSchema>;

export const cartSchema = z.object({
  // TODO: fix cart id type, sometimes it throws an error when card doesn't exist and adding new item to cart for first time
  id: z.string(),
  userId: z.string().min(1, 'Session cart id is reqiured').optional(),
  sessionCartId: z.string(),
  items: z.array(cartItemSchema),
  //   TODO: make these refines a util function
  itemsPrice: z
    .string()
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(convertNumberToDecimal(Number(val))),
      { message: 'Price must be a valid number with up to 2 decimal places' },
    ),
  totalPrice: z
    .string()
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(convertNumberToDecimal(Number(val))),
      { message: 'Price must be a valid number with up to 2 decimal places' },
    ),
  shippingPrice: z
    .string()
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(convertNumberToDecimal(Number(val))),
      { message: 'Price must be a valid number with up to 2 decimal places' },
    ),
  taxPrice: z
    .string()
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(convertNumberToDecimal(Number(val))),
      { message: 'Price must be a valid number with up to 2 decimal places' },
    ),
});

export type TCart = z.infer<typeof cartSchema>;
