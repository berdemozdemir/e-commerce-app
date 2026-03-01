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
      query: '',
    },
  });

  const submit = form.handleSubmit((data) => {
    // TODO: this should add to existing search params
    router.push(`/search?query=${data.query}`);
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
          disabled={!form.formState.isDirty}
        >
          <Search />
        </Button>
      </form>
    </Form>
  );
};
