import z from 'zod';
import { getPaymentMethods } from '../types/payment-methods';

export const paymentMethodsSchema = z.object({
  paymentMethod: z.enum(getPaymentMethods()),
});

export type TPaymentMethodsSchema = z.infer<typeof paymentMethodsSchema>;
