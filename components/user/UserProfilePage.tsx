'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../LoadingSpinner';
import { ImageUploadField } from '../ImageUploadField';
import { useUpdateUserProfileMutation } from '@/lib/services/user';
import { authQueryOptions } from '@/lib/hooks/useAuthQuery';
import {
  UpdateUserProfileSchema,
  updateUserProfileSchema,
} from '@/lib/schemas/update-user-profile';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';

type Props = {
  email: string;
  name: string;
  profileImageUrl?: string;
};

const UserProfileForm: FC<Props> = ({ name, email, profileImageUrl }) => {
  const [isUploadingProfileImage, setIsUploadingProfileImage] = useState(false);
  const queryClient = useQueryClient();
  const { update: updateSession } = useSession();
  const updateUserProfileMutation = useUpdateUserProfileMutation();

  const form = useForm<UpdateUserProfileSchema>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      name,
      email,
      profileImageUrl,
    },
  });

  const submit = form.handleSubmit(async (data) => {
    await updateUserProfileMutation.mutateAsync(data);

    await updateSession({
      user: {
        name: data.name,
        email: data.email,
        image: data.profileImageUrl ?? undefined,
      },
    });
    await queryClient.invalidateQueries({
      queryKey: authQueryOptions.queryKey,
    });

    toast.success('Profile updated successfully');

    form.reset(data);
  });

  const currentImage = form.watch('profileImageUrl');

  return (
    <Form {...form}>
      <form onSubmit={submit} className="mx-auto max-w-md space-y-5">
        <h1 className="mb-8 text-xl font-semibold">User Profile Page</h1>

        {/* TODO: fix the styling of image and add crop feature */}
        <div className="mx-auto w-fit rounded-full border p-12">
          <p>Profile Image</p>
          {currentImage && (
            <Image
              src={currentImage}
              alt="profile image"
              width={333}
              height={333}
              className="rounded-full"
            />
          )}
        </div>

        <FormField
          control={form.control}
          name="profileImageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>

              <FormControl>
                <ImageUploadField
                  value={field.value ?? ''}
                  onChange={(urls) => field.onChange(urls[0])}
                  onSetUploading={setIsUploadingProfileImage}
                  isUploading={isUploadingProfileImage}
                  onError={(msg: string) =>
                    form.setError('profileImageUrl', { message: msg })
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

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

export default UserProfileForm;
