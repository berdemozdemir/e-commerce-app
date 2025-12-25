import z from 'zod';
import { getPaymentMethods } from '../types/payment-methods';

export const paymentMethodsFormSchema = z.object({
  paymentMethod: z.enum(getPaymentMethods()),
});

export type TPaymentMethodsFormSchema = z.infer<
  typeof paymentMethodsFormSchema
>;

export const paymentMethodEnumSchema = z.enum(getPaymentMethods());
export type TPaymentMethodEnumSchema = z.infer<typeof paymentMethodEnumSchema>;
