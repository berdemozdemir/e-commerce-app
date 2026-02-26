'use client';

import { paths } from '@/lib/constants/paths';
import { FC } from 'react';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '../ui/Table';
import { formatDate } from '@/lib/utils/date';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { TMyOrders } from '@/lib/types/myOrders';

type Props = {
  items: TMyOrders[];
};

export const MyOrdersPage: FC<Props> = (props) => {
  const copyfullId = (id: string) => {
    navigator.clipboard.writeText(id);

    toast.success('ID has been copied');
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-medium">My Previous Orders</h1>
      <div className="rounded-md border p-3">
        <Table className="mb-4">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {props.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell
                  className="cursor-pointer"
                  onClick={() => copyfullId(item.id)}
                >
                  {item.id.slice(0, 7)}..
                </TableCell>

                <TableCell>{formatDate(item.createdAt)}</TableCell>

                <TableCell>${item.totalPrice}</TableCell>

                <TableCell>
                  {item.isPaid && item.paidAt
                    ? formatDate(item.paidAt)
                    : 'Not Paid'}
                </TableCell>

                <TableCell>
                  {item.isDelivered && item.deliveredAt
                    ? formatDate(item.deliveredAt)
                    : 'Not Delivered'}
                </TableCell>

                <TableCell>
                  <Link href={paths.orderDetails(item.id)}>Go to Details</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
