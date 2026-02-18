import z from 'zod';
import { Roles } from '../types/role';

export const editUserSchema = z.object({
  name: z.string().optional(),
  role: z.nativeEnum(Roles).optional(),
});

export type EditUserSchema = z.infer<typeof editUserSchema>;
