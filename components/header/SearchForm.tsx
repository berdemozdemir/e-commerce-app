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
import { useProductFilters } from '@/lib/hooks/useProductFilters';

export const SearchForm = () => {
  const { createUrl, searchParams } = useProductFilters();

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      query: searchParams.get('query') || '',
    },
  });

  const submit = form.handleSubmit((data) => {
    const newUrl = createUrl('query', data.query);
    router.push(newUrl);
  });

  return (
    <Form {...form}>
      <form onSubmit={submit} className="relative flex items-center gap-2">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <Input {...field} placeholder="Search..." className="w-62" />
          )}
        />

        <Button
          type="submit"
          variant="ghost"
          className="absolute right-0"
        >
          <Search />
        </Button>
      </form>
    </Form>
  );
};
