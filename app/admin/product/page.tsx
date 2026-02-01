import { paths } from '@/lib/constants/paths';
import { redirect } from 'next/navigation';

export default function ProductPage() {
  return redirect(paths.admin.product.list);
}
