'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { signInFormSchema } from '../schemas/auth/sign-in.schema';
import { signIn, signOut } from '../auth';

export const signInWithCredentials = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
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
