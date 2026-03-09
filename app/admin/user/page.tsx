import { redirect } from 'next/navigation';
import { paths } from '@/lib/constants/paths';

export default function UserPage() {
  return redirect(paths.admin.users.list);
}
