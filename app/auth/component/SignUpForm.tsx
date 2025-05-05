'use client';

import { Button } from '@/components/ui/Button';
import { paths } from '@/lib/constants/paths';
import { useSignupMutation } from '@/lib/services/auth';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  signUpFormSchema,
  TSignupFormSchemaRequest,
} from '@/lib/schemas/auth/sign-up.schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/Form';
import { LabeledInput } from './LabeledInput';

export const SignUpForm = () => {
  const { mutateAsync, isPending } = useSignupMutation();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const router = useRouter();

  // TODO: add a validation that user can see
  const form = useForm<TSignupFormSchemaRequest>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TSignupFormSchemaRequest) => {
    try {
      await mutateAsync(data);

      toast.success('Signup successful!');

      router.push(callbackUrl);
    } catch (error) {
      console.error('Signup error:', error);

      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <form className="mt-4 w-80" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="group mb-2 w-full">
              <FormControl>
                <LabeledInput {...field} label="Name" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

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
                <LabeledInput {...field} label="Password" isPasswordField />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mb-2 w-full">
              <FormControl>
                <LabeledInput
                  {...field}
                  label="Confirm Password"
                  isPasswordField
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} variant="ghost" className="w-full border">
          {isPending ? 'Loading...' : 'Sign Up'}
        </Button>

        <div className="text-muted-foreground my-2 text-center text-sm">
          Already have an account?{' '}
          <Link href={paths.auth.login} className="hover:underline">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
};
