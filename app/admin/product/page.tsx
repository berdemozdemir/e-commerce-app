import { redirect } from 'next/navigation';
import { paths } from '@/lib/constants/paths';

export default function ProductPage() {
  return redirect(paths.admin.product.list);
}
