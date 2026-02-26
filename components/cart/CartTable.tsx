'use client';

import { paths } from '@/lib/constants/paths';
import Image from 'next/image';
import { FC } from 'react';
import { CartItemCounter } from '../product/CartItemCounter';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '../ui/Table';
import { TCartItem } from '@/lib/schemas/cart/cart-item.schema';
import Link from 'next/link';

// TODO: fix the responsive design
// TODO: fix items reorder issue when quantity is updated
// TODO: fix the issue of when user add items cart without session and login after that, cart is empty

type Props = {
  items: TCartItem[];
};

export const CartTable: FC<Props> = ({ items }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="flex-1">Item</TableHead>
        <TableHead className="text-center">Quantity</TableHead>
        <TableHead className="text-right">Price</TableHead>
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

          <TableCell className="text-center">
            <CartItemCounter item={item} quantity={item.quantity} />
          </TableCell>

          <TableCell className="text-right">
            ${(Number(item.price) * item.quantity).toFixed(2)}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
