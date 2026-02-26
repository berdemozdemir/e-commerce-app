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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Checkbox } from '../ui/Checkbox';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { MoveRight } from 'lucide-react';
import { useUpdateProductMutation } from '@/lib/services/admin';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../LoadingSpinner';
import { FC, useState } from 'react';
import Image from 'next/image';
import { ImageUploadField } from '../ImageUploadField';
import { paths } from '@/lib/constants/paths';
import { isValidImageSrc } from '@/lib/utils';
import { useRouter } from 'next/dist/client/components/navigation';
import {
  TUpdateProductSchema,
  updateProductSchema,
} from '@/lib/schemas/product/update-product.schema';
import { TProduct } from '@/lib/types/product';

type Props = {
  product: TProduct;
};

export const UpdateProductForm: FC<Props> = ({ product }) => {
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const updateProductMutation = useUpdateProductMutation();

  const form = useForm<TUpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: product.name,
      category: product.category,
      brand: product.brand,
      description: product.description,
      stock: product.stock,
      isFeatured: product.isFeatured,
      price: product.price,
      images: product.images,
      banner: product.banner,
    },
  });

  const submit = form.handleSubmit(async (data) => {
    try {
      await updateProductMutation.mutateAsync({ slug: product.slug, data });

      toast.success('Product updated successfully');
      form.reset();
      router.push(paths.admin.product.list);
    } catch (error) {
      console.log('Error updating product:', error);
      toast.error((error as Error).message || 'Failed to update product');
    }
  });

  const images = form.watch('images');
  const isFeatured = form.watch('isFeatured');
  const banner = form.watch('banner');

  return (
    <Form {...form}>
      <form onSubmit={submit} className="mx-auto max-w-md space-y-7">
        <h1 className="mb-8 text-xl font-semibold">Update Product</h1>

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

        {isFeatured && !isValidImageSrc(banner) && (
          <FormField
            control={form.control}
            name="banner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Banner</FormLabel>
                <FormControl>
                  <ImageUploadField
                    value={field.value ?? ''}
                    onChange={(urls) => field.onChange(urls[0] ?? null)}
                    onSetUploading={setIsUploading}
                    isUploading={isUploading}
                    onError={(msg: string) =>
                      form.setError('banner', { message: msg })
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {isFeatured && isValidImageSrc(banner) && (
          <div className="group relative overflow-hidden rounded">
            <Image
              src={banner}
              width={600}
              height={300}
              alt="product banner"
              className="h-48 w-full rounded object-cover"
            />

            <Button
              variant="destructive"
              size="sm"
              className="absolute -top-9 -right-9 rounded-full opacity-60 group-hover:top-1 group-hover:right-4"
              onClick={(e) => {
                e.preventDefault();
                form.setValue('banner', '', {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            >
              X
            </Button>
          </div>
        )}

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                <ImageUploadField
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  onSetUploading={setIsUploading}
                  isUploading={isUploading}
                  onError={(msg: string) =>
                    form.setError('images', { message: msg })
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-3">
          {images?.map((img, i) => (
            <div
              key={`uploading-product-image${i}`}
              className="group relative overflow-hidden"
            >
              <Image
                src={img}
                width={300}
                height={300}
                alt="product image"
                className="h-32 w-32 rounded object-cover"
              />

              <Button
                variant="destructive"
                size="sm"
                className="absolute -top-9 -right-9 rounded-full opacity-60 group-hover:top-1 group-hover:right-4"
                onClick={(e) => {
                  e.preventDefault();
                  const next =
                    form.getValues('images') ??
                    [].filter((_, idx) => idx !== i);
                  form.setValue('images', next, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                X
              </Button>
            </div>
          ))}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={updateProductMutation.isPending || isUploading}
        >
          Continue
          {updateProductMutation.isPending ? <LoadingSpinner /> : <MoveRight />}
        </Button>
      </form>
    </Form>
  );
};
