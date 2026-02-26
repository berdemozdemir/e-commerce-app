import { paths } from '@/lib/constants/paths';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/Table';
import { TCartItem } from '@/lib/schemas/cart/cart-item.schema';
import { FC } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

type Props = {
  items: TCartItem[];
};

export const OrderedItems: FC<Props> = ({ items }) => (
  <div className="rounded-md border p-3">
    <Table className="mb-4">
      <TableHeader>
        <TableRow>
          <TableHead className="flex-1 text-lg">Item</TableHead>
          <TableHead className="text-center text-lg">Quantity</TableHead>
          <TableHead className="text-right text-lg">Price</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item) => (
          <TableRow key={item.productId}>
            <TableCell>
              <Link
                href={paths.productDetail(item.slug)}
                className="flex items-center gap-2 font-medium"
              >
                <div className="overflow-hidden rounded-sm">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                  />
                </div>

                <span>{item.name}</span>
              </Link>
            </TableCell>

            <TableCell className="text-center">{item.quantity}</TableCell>

            <TableCell className="text-right">
              ${(Number(item.price) * item.quantity).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <Link href={paths.home}>
      <Button>Go to Shopping</Button>
    </Link>
  </div>
);
