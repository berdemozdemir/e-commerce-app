import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star } from 'lucide-react';
import { toast } from 'react-toastify';
import { Button } from '../ui/Button';
import {
  Dialog,
  DialogContent,
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
  FormMessage,
} from '../ui/Form';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';
import { LoadingSpinner } from '../LoadingSpinner';
import { useUpdateRatingMutation } from '@/lib/services/rating';
import { updateRatingSchema } from '@/lib/schemas/rating/update-rating';
import { UpdateRatingSchema } from '@/lib/types/rating';

type Props = {
  ratingId: string;
  productId: string;
  title: string;
  comment?: string;
  rating: number;

  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const UpdateRatingFormDialog: FC<Props> = (props) => {
  const updateRatingMutation = useUpdateRatingMutation();

  const form = useForm<UpdateRatingSchema>({
    resolver: zodResolver(updateRatingSchema),
    defaultValues: {
      ratingId: props.ratingId,
      productId: props.productId,
      title: props.title,
      comment: props.comment,
      rating: props.rating,
    },
  });

  const submit = form.handleSubmit(async (data) => {
    await updateRatingMutation.mutateAsync(data);

    toast.success('Rating updated successfully');

    props.onOpenChange(false);

    form.reset();
  });

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogTitle>Update Rating</DialogTitle>

        <DialogDescription>
          Update your rating for this product.
        </DialogDescription>

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
                    <Select
                      value={field.value.toString()}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
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
                  updateRatingMutation.isPending || !form.formState.isDirty
                }
              >
                Submit Review{' '}
                {updateRatingMutation.isPending ? <LoadingSpinner /> : null}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
