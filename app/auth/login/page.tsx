import { auth } from '@/lib/auth';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import { LoginForm } from '../component/LoginForm';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Login',
  description: 'Login to your account',
};

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
};

const LoginPage = async ({ searchParams }: LoginPageProps) => {
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

      <h1 className="mb-1 text-center text-xl font-bold">Login Page</h1>

      <p className="mb-2 text-sm text-gray-500">
        Please enter your credentials to login.
      </p>

      <LoginForm />
    </div>
  );
};

export default LoginPage;
