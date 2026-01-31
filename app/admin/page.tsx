import { paths } from '@/lib/constants/paths';
import { redirect } from 'next/navigation';

export default function Admin_Page() {
  return redirect(paths.admin.overview);
}
