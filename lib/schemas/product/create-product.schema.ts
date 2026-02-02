import { convertNumberToDecimal } from '@/lib/utils';
import { z } from 'zod';

// TODO: add trigger for update column to every table of project
export const createProductSchema = () =>
  z.object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' }),
    category: z
      .string()
      .min(3, { message: 'Category must be at least 3 characters long' }),
    brand: z
      .string()
      .min(3, { message: 'Brand must be at least 3 characters long' }),
    description: z
      .string()
      .min(3, { message: 'Description must be at least 3 characters long' }),
    stock: z.coerce.number(),
    images: z
      .array(z.string())
      .min(1, { message: 'At least one image is required' }),
    isFeatured: z.boolean().default(false),
    banner: z.string().nullable(),
    price: z.string().refine(
      (val) => {
        const normalized = convertNumberToDecimal(Number(val));
        return /^\d+(\.\d{1,2})?$/.test(normalized);
      },
      { message: 'Price must be a valid number with up to 2 decimal places' },
    ),
  });

export type TCreateProductSchema = z.infer<
  ReturnType<typeof createProductSchema>
>;
