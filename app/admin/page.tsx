import { redirect } from 'next/navigation';
import { paths } from '@/lib/constants/paths';

export default function Admin_Page() {
  return redirect(paths.admin.overview);
}
