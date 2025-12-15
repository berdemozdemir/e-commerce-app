import { z } from 'zod';
import { convertNumberToDecimal } from '../utils';
import { paymentMethodsSchema } from './payment-methods';
import { shippingAddressSchema } from './shipping-address';

export const orderSchema = z.object({
  userId: z.string().uuid(),
  itemsPrice: z
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
  shippingPrice: z
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
  paymentMethod: paymentMethodsSchema,
  shippingAddress: shippingAddressSchema,
});

export type TOrderSchema = z.infer<typeof orderSchema>;

export const orderItemSchema = z.object({
  productId: z.string().uuid(),
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  slug: z
    .string()
    .min(3, { message: 'Slug must be at least 3 characters long' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
  price: z
    .string()
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(convertNumberToDecimal(Number(val))),
      { message: 'Price must be a valid number with up to 2 decimal places' },
    ),
  image: z.string().url({ message: 'Image must be a valid URL' }),
});

export type TOrderItemSchema = z.infer<typeof orderItemSchema>;
