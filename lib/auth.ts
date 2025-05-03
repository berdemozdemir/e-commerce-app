import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/server/drizzle-client';
import { eq } from 'drizzle-orm';
import { users } from '@/server/schema';
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';
import { paths } from './constants/paths';

export const config = {
  pages: {
    signIn: paths.auth.login,
    error: paths.auth.login,
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  adapter: DrizzleAdapter(db),

  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },

      async authorize(credentials) {
        if (credentials === null) return null;

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email as string),
        });

        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password,
          );

          // if password is correct, return user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }

        // if user not found or password is incorrect, return null
        return null;
      },
    }),
  ],

  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user, trigger, token }: any) {
      // set the user id from the token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      // if there is an update, set the user name
      if (trigger === 'update') {
        session.user.name = user.name;
      }

      return session;
    },

    async jwt({ token, trigger, user, session }: any) {
      if (user) {
        token.role = user.role;

        if (user.name === 'NO_NAME') {
          token.name = user.email.split('@')[0];

          await db
            .update(users)
            .set({
              name: token.name,
            })
            .where(eq(users.id, user.id));
        }
      }

      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
