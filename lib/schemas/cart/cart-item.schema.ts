import { z } from 'zod';
import { convertNumberToDecimal } from '@/lib/utils';

export const cartItemSchema = z.object({
  productId: z.string().min(1, { message: 'Product is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  slug: z.string().min(1, { message: 'Slug is required' }),
  quantity: z.number().positive(),
  image: z.string().min(1, { message: 'Image is required' }),
  price: z.string(),
});

export const cartSchema = z.object({
  id: z.string(),
  userId: z.string().min(1, 'Session cart id is reqiured').optional(),
  sessionCartId: z.string(),
  items: z.array(cartItemSchema),
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
