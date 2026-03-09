import { Github } from 'lucide-react';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t p-5">
      <div className="flex items-center justify-center">
        {currentYear} © {APP_NAME}. All rights reserved.
      </div>

      <Link
        href="https://github.com/berdemozdemir"
        target="_blank"
        className="flex items-center justify-center"
      >
        <Github className="mr-2" />
        <span>berdemozdemir</span>
      </Link>
    </div>
  );
};
