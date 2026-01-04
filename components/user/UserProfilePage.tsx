'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import {
  TUpdateUserProfileSchema,
  updateUserProfileSchema,
} from '@/lib/schemas/update-user-profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useUpdateUserProfileMutation } from '@/lib/services/user';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '../LoadingSpinner';

type Props = {
  email: string;
  name: string;
};

const UserProfilePage: FC<Props> = ({ name, email }) => {
  const router = useRouter();

  const updateUserProfileMutation = useUpdateUserProfileMutation();

  const form = useForm<TUpdateUserProfileSchema>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      name,
      email,
    },
  });

  const submit = form.handleSubmit(async (data) => {
    try {
      await updateUserProfileMutation.mutateAsync(data);

      toast.success('Profile updated successfully');

      form.reset(data);
    } catch (error) {
      toast.error(
        (error as Error).message || 'Failed to update shipping address',
      );
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={submit} className="mx-auto max-w-md space-y-5">
        <h1 className="mb-8 text-xl font-semibold">User Profile Page</h1>

        {/* TODO: add a profile image for this section */}
        <div className="mx-auto w-fit rounded-full border p-12">
          Profile Image
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>

              <FormControl>
                <Input {...field} placeholder="John Doe" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input {...field} placeholder="your-email@gmail.com" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-end">
          <Button
            type="submit"
            className="self-end"
            disabled={
              !form.formState.isDirty || updateUserProfileMutation.isPending
            }
          >
            Submit {updateUserProfileMutation.isPending && <LoadingSpinner />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserProfilePage;
