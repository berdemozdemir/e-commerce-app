import z from 'zod';

export const updateUserProfileSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  profileImageUrl: z.string().url().optional(),
});

export type TUpdateUserProfileSchema = z.infer<typeof updateUserProfileSchema>;
