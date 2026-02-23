'use client';

import { FC } from 'react';
import { Button } from '../ui/Button';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '../ui/table';
import { TAdminProduct } from '@/lib/types/product';
import { DeleteProductDialog } from './DeleteProductDialog';
import Link from 'next/link';
import { paths } from '@/lib/constants/paths';
import { useRouter } from 'next/dist/client/components/navigation';

type Props = { products: TAdminProduct[]; query?: string };

export const AdminProductListPage: FC<Props> = (props) => {
  const router = useRouter();

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl">
            Product List{' '}
            {props.query && <span> ({props.products.length}) </span>}
          </h1>

          {props.query && (
            <span className="text-lg text-gray-500">
              for &apos;<span className="italic">{props.query}</span>&apos;
              filter
            </span>
          )}

          {props.query && (
            <Link href={paths.admin.product.list}>
              <Button variant="link" className="p-0 text-gray-500 underline">
                Clear Filter
              </Button>
            </Link>
          )}
        </div>

        <Link href={paths.admin.product.create}>
          <Button>Create Product</Button>
        </Link>
      </div>

      {props.products.length === 0 && (
        <div className="flex items-center justify-center">
          <p className="text-gray-500">No products found</p>
        </div>
      )}

      {props.products.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>PRICE</TableHead>
              <TableHead>CATEGORY</TableHead>
              <TableHead>STOCK</TableHead>
              <TableHead>RATING</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {props.products.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="cursor-pointer">
                  {item.id.slice(0, 7)}..
                </TableCell>

                <TableCell>{item.name}</TableCell>

                <TableCell>${item.price}</TableCell>

                <TableCell>{item.category}</TableCell>

                <TableCell className="text-center">{item.stock}</TableCell>

                <TableCell className="text-center">{item.rating}</TableCell>

                <TableCell className="space-x-2">
                  <Button
                    onClick={() =>
                      router.push(paths.admin.product.update(item.slug))
                    }
                  >
                    Edit
                  </Button>

                  <DeleteProductDialog productId={item.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
