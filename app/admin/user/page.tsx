import { paths } from '@/lib/constants/paths';
import { redirect } from 'next/navigation';

export default function UserPage() {
  return redirect(paths.admin.users.list);
}
