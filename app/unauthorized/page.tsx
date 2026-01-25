import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { paths } from '@/lib/constants/paths';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

export default function UnauthorizedPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="mx-2 flex flex-col items-center justify-center gap-4 rounded-2xl p-5 text-center shadow-2xl">
        <Image
          src="/images/logo.svg"
          alt={`${APP_NAME} logo`}
          height={48}
          width={48}
          priority
        />

        <h1 className="text-3xl font-bold">Unauthorized</h1>

        <p className="text-lg">
          You do not have permission to access this page. <br /> Please log in
          with the appropriate credentials.
        </p>

        <Button asChild variant="ghost" className="border">
          <Link href={paths.home}>Home Page</Link>
        </Button>
      </div>
    </div>
  );
}
