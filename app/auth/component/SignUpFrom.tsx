'use client';

import { Button } from '@/components/ui/Button';
import { signUpUser } from '@/lib/actions/user.action';
import { paths } from '@/lib/constants/paths';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

export const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: '',
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const { pending } = useFormStatus();

  return (
    <form className="mt-4" action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>

        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>

        <input
          type="text"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>

        <input
          type="password"
          id="password"
          name="password"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>

        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <Button disabled={pending} className="w-full">
        {pending ? 'Loading...' : 'Sign Up'}
      </Button>

      {data && !data.success && (
        <div className="text-destructive text-center">{data.message}</div>
      )}

      <div className="text-muted-foreground my-2 text-center text-sm">
        Already have an account? <Link href={paths.auth.login}>Login</Link>
      </div>
    </form>
  );
};
