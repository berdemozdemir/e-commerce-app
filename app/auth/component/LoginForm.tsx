'use client';

import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/Form';
import { paths } from '@/lib/constants/paths';
import {
  signInFormSchema,
  TSignInFormSchemaRequest,
} from '@/lib/schemas/auth/sign-in.schema';
import { useLoginMutation } from '@/lib/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { LabeledInput } from './LabeledInput';

export const LoginForm = () => {
  const { mutateAsync, error, isPending } = useLoginMutation();

  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const form = useForm<TSignInFormSchemaRequest>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TSignInFormSchemaRequest) => {
    try {
      await mutateAsync(data);

      toast.success('Login successful!');

      router.push(callbackUrl);
    } catch (error) {
      console.error('Login error:', error);

      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <form className="mt-4 w-80" onSubmit={form.handleSubmit(onSubmit)}>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-2 w-full">
              <FormControl>
                <LabeledInput {...field} label="Email" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-2 w-full">
              <FormControl>
                <LabeledInput isPasswordField {...field} label="Password" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} className="w-full border" variant="ghost">
          {isPending ? 'Loading...' : 'Login'}
        </Button>

        {error && (
          <div className="text-destructive text-center">{error.message}</div>
        )}

        <div className="text-muted-foreground my-2 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href={paths.auth.signup}>Sign Up</Link>
        </div>
      </form>
    </Form>
  );
};
