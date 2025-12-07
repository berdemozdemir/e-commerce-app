import z from 'zod';

export const shippingAddressSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: 'Full name must be at least 3 characters long' }),
  address: z
    .string()
    .min(5, { message: 'Address must be at least 5 characters long' }),

  // TODO: make this city and country selectable from google places API
  city: z
    .string()
    .min(2, { message: 'City must be at least 2 characters long' }),
  postalCode: z
    .string()
    .min(4, { message: 'Postal code must be at least 4 characters long' }),
  country: z
    .string()
    .min(2, { message: 'Country must be at least 2 characters long' }),
});

export type TShippingAddressSchema = z.infer<typeof shippingAddressSchema>;
