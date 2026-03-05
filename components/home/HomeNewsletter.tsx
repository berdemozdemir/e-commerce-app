'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FadeIn } from '@/components/motion/FadeIn';
import { Send } from 'lucide-react';

export const HomeNewsletter = () => {
  return (
    <div className="py-24">
      <FadeIn>
        <div className="bg-primary text-primary-foreground relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12 md:py-24">
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Stay in the loop
            </h2>
            <p className="text-primary-foreground/80 mx-auto mt-4 max-w-xl md:text-lg">
              Subscribe to our newsletter to get the latest updates, exclusive
              offers, and early access to new collections.
            </p>

            <form
              className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Coming soon.."
                className="border-secondary h-12 border"
                disabled
              />

              <Button
                size="lg"
                variant="secondary"
                className="h-12 w-full sm:w-auto"
              >
                Subscribe
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <p className="text-primary-foreground/60 mt-4 text-xs">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>

          {/* Decorative background elements */}
          <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </div>
      </FadeIn>
    </div>
  );
};
