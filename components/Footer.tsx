import { APP_NAME } from '@/lib/constants';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t">
      <div className="flex items-center justify-center p-5">
        {currentYear} © {APP_NAME}. All rights reserved.
      </div>
    </div>
  );
};
