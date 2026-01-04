import z from 'zod';

export const updateUserProfileSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
});

export type TUpdateUserProfileSchema = z.infer<typeof updateUserProfileSchema>;
