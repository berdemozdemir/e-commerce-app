'use client';

import { useForm } from 'react-hook-form';
import { Form, FormField } from '../ui/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const SearchForm = () => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      category: 'All',
      query: '',
    },
  });

  const submit = form.handleSubmit((data) => {
    router.push(`/search?category=${data.category}&query=${data.query}`);
  });

  return (
    <Form {...form}>
      <form onSubmit={submit} className="relative flex items-center gap-2">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-24 md:w-45" value="All">
                <SelectValue placeholder="All" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Books">Books</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <FormField
          control={form.control}
          name="query"
          render={({ field }) => <Input {...field} placeholder="Search..." />}
        />

        <Button
          type="submit"
          variant="ghost"
          className="absolute right-0"
          disabled={!form.formState.isDirty}
        >
          <Search />
        </Button>
      </form>
    </Form>
  );
};
