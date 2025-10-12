import { convertNumberToDecimal } from '@/lib/utils';
import { z } from 'zod';

export const cartItemSchema = z.object({
  productId: z.string().min(1, { message: 'Product is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  slug: z.string().min(1, { message: 'Slug is required' }),
  quantity: z.number().positive(),
  image: z.string().min(1, { message: 'Image is required' }),
  price: z
    .string()
    .refine(
      (val) => /^\d+(\d{2})?$/.test(convertNumberToDecimal(Number(val))),
      { message: 'Price must be a valid number with up to 2 decimal places' },
    ),
});

// TODO: move these types to type folder
export type TCartItem = z.infer<typeof cartItemSchema>;

export const cartSchema = z.object({
  userId: z.string().min(1, 'Session cart id is reqiured'),
  sessionCardId: z.string().optional().nullable(),
  items: z.array(cartItemSchema),
  //   TODO: make these refines a util function
  itemsPrice: z
    .string()
    .refine(
      (val) => /^\d+(\d{2})?$/.test(convertNumberToDecimal(Number(val))),
      { message: 'Price must be a valid number with up to 2 decimal places' },
    ),
  totalPrice: z
    .string()
    .refine(
      (val) => /^\d+(\d{2})?$/.test(convertNumberToDecimal(Number(val))),
      { message: 'Price must be a valid number with up to 2 decimal places' },
    ),
  shippingPrice: z
    .string()
    .refine(
      (val) => /^\d+(\d{2})?$/.test(convertNumberToDecimal(Number(val))),
      { message: 'Price must be a valid number with up to 2 decimal places' },
    ),
  taxPrice: z
    .string()
    .refine(
      (val) => /^\d+(\d{2})?$/.test(convertNumberToDecimal(Number(val))),
      { message: 'Price must be a valid number with up to 2 decimal places' },
    ),
});

export type TCart = z.infer<typeof cartSchema>;
