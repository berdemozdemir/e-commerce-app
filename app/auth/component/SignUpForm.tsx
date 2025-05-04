'use client';

import { Button } from '@/components/ui/Button';
import { paths } from '@/lib/constants/paths';
import { useSignupMutation } from '@/lib/services/auth';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

export const SignUpForm = () => {
  const { mutateAsync, isPending, error } = useSignupMutation();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await mutateAsync(new FormData(e.currentTarget as HTMLFormElement));

      router.push(callbackUrl);
    } catch (error) {
      console.error('Signup error:', error);

      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <form className="mt-4" onSubmit={onSubmit}>
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

      <Button disabled={isPending} className="w-full">
        {isPending ? 'Loading...' : 'Sign Up'}
      </Button>

      {error && (
        <div className="text-destructive text-center">{error.message}</div>
      )}

      <div className="text-muted-foreground my-2 text-center text-sm">
        Already have an account? <Link href={paths.auth.login}>Login</Link>
      </div>
    </form>
  );
};
