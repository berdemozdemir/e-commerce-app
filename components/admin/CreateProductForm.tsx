'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { createProductSchema } from '@/lib/schemas/product/create-product.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Checkbox } from '../ui/Checkbox';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { MoveRight } from 'lucide-react';
import { useCreateProductMutation } from '@/lib/services/admin';
import { toast } from 'react-toastify';

export const CreateProductForm = () => {
  const createProductMutation = useCreateProductMutation();

  const form = useForm({
    resolver: zodResolver(
      createProductSchema().omit({ images: true, banner: true }),
    ),
    defaultValues: {
      name: '',
      category: '',
      brand: '',
      description: '',
      stock: 0,
      isFeatured: false,
      price: '',
    },
  });

  const submit = form.handleSubmit(async (data) => {
    console.log(data);

    try {
      await createProductMutation.mutateAsync(
        {
          ...data,
          images: ['https://placehold.co/600x600'],
          banner: 'test banner',
        },
        {
          onError: (error) => {
            console.log('Error creating product:', error);
          },
        },
      );

      toast.success('Product created successfully');

      form.reset();
    } catch (error) {
      toast.error((error as Error).message || 'Failed to create product');
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={submit} className="mx-auto max-w-md space-y-7">
        <h1 className="mb-8 text-xl font-semibold">Create Product</h1>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>

              <FormControl>
                <Input {...field} placeholder="Enter product name" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Category</FormLabel>

              <FormControl>
                <Input {...field} placeholder="Enter category" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2 md:flex-row">
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Brand </FormLabel>

                <FormControl>
                  <Input {...field} placeholder="Enter brand" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex w-full items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>

                <FormLabel>Is Featured ? </FormLabel>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-6">
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Stock </FormLabel>

                <FormControl>
                  <Input placeholder="Enter stock" type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Price </FormLabel>

                <FormControl>
                  <Input placeholder="Enter price" type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description </FormLabel>

              <FormControl>
                <Textarea placeholder="Enter description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Images </FormLabel>

              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder="Enter images"
                  type="text"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value
                        .split(',')
                        .map((item) => item.trim())
                        .filter(Boolean),
                    )
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button type="submit" className="w-full">
          <MoveRight />
          Continue
        </Button>
      </form>
    </Form>
  );
};
