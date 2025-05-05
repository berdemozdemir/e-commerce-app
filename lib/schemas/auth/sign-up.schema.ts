import { z } from 'zod';

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string({
      required_error: 'password is required',
    }),
    confirmPassword: z.string({
      required_error: 'password is required',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
      });
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/.test(data.password)
    ) {
      ctx.addIssue({
        path: ['password'],
        code: z.ZodIssueCode.custom,
        message:
          'password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      });
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/.test(
        data.confirmPassword,
      )
    ) {
      ctx.addIssue({
        path: ['password'],
        code: z.ZodIssueCode.custom,
        message:
          'password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      });
    }
  });

export type TSignupFormSchemaRequest = z.infer<typeof signUpFormSchema>;
