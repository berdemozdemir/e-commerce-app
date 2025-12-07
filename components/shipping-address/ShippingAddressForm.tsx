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

export const ShippingAddressForm = () => {
  const form = useForm<TShippingAddressSchema>({
    resolver: zodResolver(shippingAddressSchema),
  });

  const submit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={submit} className="max-w-md space-y-5">
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
