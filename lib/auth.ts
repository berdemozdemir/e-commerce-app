import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/server/drizzle-client';
import { eq } from 'drizzle-orm';
import { users } from '@/server/schema';
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';
import { paths } from './constants/paths';
import { NextResponse } from 'next/server';

export const config = {
  pages: {
    signIn: paths.auth.login,
    // TODO: fix error page it should be paths.auth.error,
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorized({ request, auth }: any) {
      const protectedPaths = [
        paths.cart,
        paths.shippingAddress,
        paths.paymentMethod,
        paths.placeOrder,
        paths.orderDetails,
        paths.myOrders,
        paths.userProfile,
      ];

      const { pathname } = request.nextUrl;

      if (!auth && protectedPaths.includes(pathname)) {
        return false;
      }

      // check for session cart cookie
      if (!request.cookies.get('sessionCartId')) {
        // generate new session cart id cookie
        const sessionCartId = crypto.randomUUID();

        const newRequestHeader = new Headers(request.headers);

        const response = NextResponse.next({
          request: {
            headers: newRequestHeader,
          },
        });

        response.cookies.set('sessionCartId', sessionCartId);

        return response;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
