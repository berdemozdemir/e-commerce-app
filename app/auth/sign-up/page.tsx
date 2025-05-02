import { auth } from '@/lib/auth';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { SignUpForm } from '../component/SignUpFrom';

export const metadata = {
  title: 'Sign Up',
  description: 'Sign up to your account',
};

type SignUpPageProps = {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
};

const SignUpPage = async ({ searchParams }: SignUpPageProps) => {
  const { callbackUrl } = await searchParams;

  const session = await auth();

  if (session) {
    redirect(callbackUrl || '/');
  }

  return (
    <div className="mx-auto max-w-md rounded-md border p-4 shadow-md">
      <Image
        src="/images/logo.svg"
        alt={`${APP_NAME} logo`}
        width={100}
        height={100}
        priority
        className="mx-auto mb-4"
      />
      <h1 className="mb-1 text-center text-xl font-bold">Sign Up Page</h1>
      <p className="mb-2 text-sm text-gray-500">
        Please enter your credentials to Sign Up.
      </p>

      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
