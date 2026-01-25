'use client';

import { TMyOrders } from '@/lib/types/myOrders';
import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { formatDate } from '@/lib/utils/date';
import { Button } from '../ui/Button';
import { DeleteOrderDialog } from './DeleteOrderDialog';
import { useRouter } from 'next/navigation';
import { paths } from '@/lib/constants/paths';

type Props = {
  orders: TMyOrders[];
};

export const AdminOrdersPage: FC<Props> = ({ orders }) => {
  const router = useRouter();

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
            {orders.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="cursor-pointer">
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

                <TableCell className="space-x-2">
                  <Button
                    onClick={() => router.push(paths.orderDetails(item.id))}
                  >
                    Details
                  </Button>

                  <DeleteOrderDialog orderId={item.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
