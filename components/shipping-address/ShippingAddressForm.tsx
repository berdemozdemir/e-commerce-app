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
import { paths } from '@/lib/constants/paths';
import { TAddress } from '@/lib/types/address';
import { FC } from 'react';

// TODO: take a look at the following props type
type Props = Partial<TAddress>;

export const ShippingAddressForm: FC<Props> = (props) => {
  const router = useRouter();

  const updateUserAddressMutation = useUpdateUserAddressMutation();

  const form = useForm<TShippingAddressSchema>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      addressName: props.addressName ?? '',
      address: props.address ?? '',
      city: props.city ?? '',
      postalCode: props.postalCode ?? undefined,
      country: props.country ?? '',
    },
  });

  const submit = form.handleSubmit(async (data) => {
    try {
      await updateUserAddressMutation.mutateAsync(data);

      toast.success('Shipping address updated successfully');

      router.push(paths.paymentMethod);
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
          name="addressName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Name</FormLabel>

              <FormControl>
                <Input {...field} placeholder="e.g. Home, Work, etc." />
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
                  value={field.value ?? ''}
                  onChange={(e) => {
                    const v = e.target.value;
                    field.onChange(v === '' ? undefined : Number(v));
                  }}
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
