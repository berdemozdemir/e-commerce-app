import { FC, useState } from 'react';
import { Button } from '../ui/Button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from '../ui/Dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '../ui/Form';
import { useForm } from 'react-hook-form';
import { TCreateRatingSchema } from '@/lib/types/create-rating-schema';
import { createRatingSchema } from '@/lib/schemas/rating/create-rating';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';
import { Star } from 'lucide-react';
import { useCreateRatingMutation } from '@/lib/services/rating';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../LoadingSpinner';

export const CreateRatingDialog: FC<{ productId: string }> = ({
  productId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const createRatingMutation = useCreateRatingMutation();

  const form = useForm<TCreateRatingSchema>({
    resolver: zodResolver(createRatingSchema),
    defaultValues: {
      productId,
      title: undefined,
      rating: undefined,
      comment: undefined,
    },
  });

  const submit = form.handleSubmit(async (data) => {
    await createRatingMutation.mutateAsync(data);

    toast.success('Rating created successfully');

    setIsOpen(false);

    form.reset();
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Rate Product</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate Product</DialogTitle>

          <DialogDescription>
            Your review helps other customers make informed decisions.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={submit}>
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>

                  <FormControl>
                    <Input placeholder="Great product.." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>

                  <FormControl>
                    <Textarea placeholder="I love this product..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>

                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a rating" />
                      </SelectTrigger>

                      <SelectContent className="mt-10">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <SelectItem key={rating} value={rating.toString()}>
                            {Array.from({ length: rating }).map((_, i) => (
                              <Star
                                key={i}
                                className="size-4 fill-yellow-500 text-yellow-500"
                              />
                            ))}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={
                  createRatingMutation.isPending || !form.formState.isDirty
                }
              >
                Submit Review{' '}
                {createRatingMutation.isPending ? <LoadingSpinner /> : null}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
