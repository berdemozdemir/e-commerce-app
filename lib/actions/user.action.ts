'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { signInFormSchema } from '../schemas/auth/sign-in.schema';
import { signIn, signOut } from '../auth';
import { signUpFormSchema } from '../schemas/auth/sign-up.schema';
import { hashSync } from 'bcrypt-ts-edge';
import { db } from '@/server/drizzle-client';
import { users } from '@/server';

export const signInWithCredentials = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    await signIn('credentials', user);

    return { success: true, message: 'Logged in successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      console.log('isRedirectError', error);

      throw error;
    }

    return {
      success: false,
      message: 'Invalid email or password',
    };
  }
};

export const signOutUser = async () => {
  await signOut();
};

export const signUpUser = async (prevState: unknown, formData: FormData) => {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    });

    const plainPassword = formData.get('password') as string;

    user.password = hashSync(user.password, 10);

    await db.insert(users).values({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: 'Logged in successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      console.log('isRedirectError', error);

      throw error;
    }

    return {
      success: false,
      message: 'Invalid email or password',
    };
  }
};
