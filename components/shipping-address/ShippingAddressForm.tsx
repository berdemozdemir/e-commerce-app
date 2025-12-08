'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  shippingAddressSchema,
  TShippingAddressSchema,
} from '@/lib/schemas/shipping-address';
import { Input } from '../ui/Input';
import { MoveRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useUpdateUserAddressMutation } from '@/lib/services/user';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const ShippingAddressForm = () => {
  const router = useRouter();

  const updateUserAddressMutation = useUpdateUserAddressMutation();

  const form = useForm<TShippingAddressSchema>({
    resolver: zodResolver(shippingAddressSchema),
  });

  const submit = form.handleSubmit(async (data) => {
    try {
      await updateUserAddressMutation.mutateAsync(data);

      toast.success('Shipping address updated successfully');

      router.push('/payment');
    } catch (error) {
      toast.error(
        (error as Error).message || 'Failed to update shipping address',
      );
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={submit} className="mx-auto max-w-md space-y-5">
        <h1 className="mb-8 text-xl font-semibold">Shipping Address Page</h1>

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>

              <FormControl>
                <Input {...field} placeholder="Enter your full name" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>

              <FormControl>
                <Input {...field} placeholder="Enter your address" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>

              <FormControl>
                <Input {...field} placeholder="Enter your city" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your postal code"
                  type="number"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>

              <FormControl>
                <Input {...field} placeholder="Enter your country" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-end">
          <Button type="submit" className="self-end">
            <MoveRight />
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};
