import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { HeaderItems } from './HeaderItems';
import { paths } from '@/lib/constants/paths';

export const Header = () => (
  <div className="w-full border-b">
    <div className="flex w-full max-w-7xl items-center justify-between p-5 md:px-10 lg:mx-auto">
      <div className="flex items-center justify-start">
        <Link
          href={paths.home}
          className="flex items-center justify-start gap-2"
        >
          <Image
            src="/images/logo.svg"
            alt={`${APP_NAME} logo`}
            height={48}
            width={48}
            priority
          />

          <span className="hidden text-2xl font-bold lg:block">{APP_NAME}</span>
        </Link>
      </div>

      <HeaderItems />
    </div>
  </div>
);
