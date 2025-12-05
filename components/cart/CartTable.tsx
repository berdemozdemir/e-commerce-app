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
} from '../ui/table';
import { TCart } from '@/lib/schemas/cart/cart-item.schema';
import Link from 'next/link';

type Props = {
  cart: TCart;
};

export const CartTable: FC<Props> = ({ cart }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="flex-1">Item</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {cart.items.map((item) => (
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
};
