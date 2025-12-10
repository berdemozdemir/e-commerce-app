'use client';

import { MoveRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/Button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from './ui/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  paymentMethodsSchema,
  TPaymentMethodsSchema,
} from '@/lib/schemas/payment-methods';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { getPaymentMethods } from '@/lib/types/payment-methods';
import { useUpdateUserPaymentMethodMutation } from '@/lib/services/user';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { paths } from '@/lib/constants/paths';

export const PaymentMethodForm = () => {
  const router = useRouter();

  const updateUserPaymentMethodMutation = useUpdateUserPaymentMethodMutation();

  const form = useForm<TPaymentMethodsSchema>({
    resolver: zodResolver(paymentMethodsSchema),
  });

  const submit = form.handleSubmit(async (data) => {
    try {
      await updateUserPaymentMethodMutation.mutateAsync(data);

      toast.success('Payment method updated successfully');

      router.push(paths.placeOrder);
    } catch (error) {
      toast.error(
        (error as Error).message || 'Failed to update payment method',
      );
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={submit} className="mx-auto max-w-md space-y-5">
        <h1 className="mb-2 text-2xl font-bold">Payment Method</h1>

        <p>Select your preferred payment method for the order.</p>

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                  className="space-y-2"
                >
                  {getPaymentMethods().map((method) => (
                    <FormItem
                      key={method}
                      className="flex items-center space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={method} id={method} />
                      </FormControl>

                      <FormLabel className="font-normal" htmlFor={method}>
                        {method}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
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
