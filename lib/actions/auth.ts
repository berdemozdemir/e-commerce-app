'use server';

import { hashSync } from 'bcrypt-ts-edge';
import { signIn, signOut, auth } from '../auth';
import {
  signInFormSchema,
  SignInFormSchemaRequest,
} from '../schemas/auth/sign-in.schema';
import {
  signUpFormSchema,
  SignupFormSchemaRequest,
} from '../schemas/auth/sign-up.schema';
import { Roles } from '../types/role';
import { db } from '@/server/drizzle-client';
import { users } from '@/server';

export const getSession = async () => {
  const session = await auth();
  return session;
};

export const signInWithCredentials = async (args: SignInFormSchemaRequest) => {
  try {
    const parsed = signInFormSchema.safeParse({
      email: args.email,
      password: args.password,
    });

    if (!parsed.success)
      return {
        data: undefined,
        error: parsed.error.issues[0]?.message ?? 'Invalid payload',
      };

    await signIn('credentials', {
      ...parsed.data,
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

// TODO: refactor this type
export const signUpUser = async (args: SignupFormSchemaRequest) => {
  try {
    const parsed = signUpFormSchema.safeParse({
      name: args.name as string,
      email: args.email,
      password: args.password,
      confirmPassword: args.confirmPassword,
    });

    if (!parsed.success)
      return {
        data: undefined,
        error: parsed.error.issues[0]?.message ?? 'Invalid payload',
      };

    const user = parsed.data;
    const plainPassword = args.password;

    user.password = hashSync(user.password, 10);

    await db.insert(users).values({
      name: user.name,
      email: user.email,
      password: user.password,
      role: Roles.User,
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
