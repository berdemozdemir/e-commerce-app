'use server';

import {
  signInFormSchema,
  TSignInFormSchemaRequest,
} from '../schemas/auth/sign-in.schema';
import { signIn, signOut } from '../auth';
import {
  signUpFormSchema,
  TSignupFormSchemaRequest,
} from '../schemas/auth/sign-up.schema';
import { hashSync } from 'bcrypt-ts-edge';
import { db } from '@/server/drizzle-client';
import { users } from '@/server';

export const signInWithCredentials = async (data: TSignInFormSchemaRequest) => {
  try {
    const user = signInFormSchema.parse({
      email: data.email,
      password: data.password,
    });

    await signIn('credentials', {
      ...user,
      redirect: false,
    });

    return { data: null, error: undefined };
  } catch (error) {
    return {
      data: undefined,
      error,
    };
  }
};

export const signOutUser = async () => {
  try {
    await signOut();

    return { data: null, error: undefined };
  } catch (error) {
    return {
      data: undefined,
      error,
    };
  }
};

export const signUpUser = async (data: TSignupFormSchemaRequest) => {
  try {
    const user = signUpFormSchema.parse({
      name: data.name as string,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    const plainPassword = data.password;

    user.password = hashSync(user.password, 10);

    await db.insert(users).values({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    await signIn('credentials', {
      ...user,
      password: plainPassword,
      redirect: false,
    });

    return { data: user, error: undefined };
  } catch (error) {
    console.error('Signup error:', error);

    return {
      data: undefined,
      error,
    };
  }
};
