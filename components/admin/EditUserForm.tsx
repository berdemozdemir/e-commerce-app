'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { MoveRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/dist/client/components/navigation';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../LoadingSpinner';
import { useEditUserMutation } from '@/lib/services/admin';
import { paths } from '@/lib/constants/paths';
import { Input } from '@/components/ui/Input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { editUserSchema, EditUserSchema } from '@/lib/schemas/edit-user';
import { getRoles, Role } from '@/lib/types/role';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

type Props = {
  userId: string;
  email: string;
  name: string;
  role: Role;
};

export const EditUserForm = ({ userId, email, name, role }: Props) => {
  const router = useRouter();

  const editUserMutation = useEditUserMutation();

  const form = useForm<EditUserSchema>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name,
      role,
    },
  });

  const submit = form.handleSubmit(async (data) => {
    try {
      await editUserMutation.mutateAsync({ userId, data });

      toast.success('User updated successfully');
      form.reset();
      router.push(paths.admin.users.list);
    } catch (error) {
      console.log('Error updating user:', error);
      toast.error((error as Error).message || 'Failed to update user');
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={submit} className="mx-auto max-w-md space-y-7">
        <h1 className="mb-8 text-xl font-semibold">Edit User</h1>

        <Input placeholder={email} disabled />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>

              <FormControl>
                <Input {...field} placeholder="Enter user name" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Role</FormLabel>

              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>

                  <SelectContent>
                    {getRoles().map((roleValue) => (
                      <SelectItem key={roleValue} value={roleValue}>
                        {roleValue}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={editUserMutation.isPending || !form.formState.isDirty}
        >
          Update User
          {editUserMutation.isPending ? <LoadingSpinner /> : <MoveRight />}
        </Button>
      </form>
    </Form>
  );
};
