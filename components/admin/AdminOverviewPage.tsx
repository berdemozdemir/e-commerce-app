import { FC } from 'react';
import { InforCard } from './InfoCard';
import { BadgeDollarSign, Barcode, Users, Wallet } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '../ui/table';
import { formatDate } from '@/lib/utils/date';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { paths } from '@/lib/constants/paths';
import { MonthlySalesRow } from '@/lib/types/admin/monthly-sales';
import { RecentOrder } from '@/lib/types/admin/recent-orders';
import { MonthlySalesChart } from './MonthlySalesChart';

type Props = {
  totalCustomer: number;
  totalProducts: number;
  totalRevenue: number;
  totalSales: number;
  recentOrders: RecentOrder[];
  monthlySales: MonthlySalesRow[];
};

// TODO: create a card componnent and use it here
export const AdminOverViewPage: FC<Props> = (props) => (
  <div className="space-y-4">
    <section className="flex w-full flex-col gap-4 md:flex-row">
      <InforCard
        title="Total Revenue"
        value={`$${props.totalRevenue}`}
        icon={BadgeDollarSign}
      />

      <InforCard title="Sales" value={props.totalSales} icon={Wallet} />

      <InforCard title="Customers" value={props.totalCustomer} icon={Users} />

      <InforCard title="Products" value={props.totalProducts} icon={Barcode} />
    </section>

    <section className="grid grid-cols-7 gap-4">
      <div className="col-span-7 h-66 rounded-md border p-4 md:col-span-4 md:h-100">
        <h1 className="mb-4 text-xl font-medium">Monthly Sales</h1>

        <MonthlySalesChart monthlySales={props.monthlySales} />
      </div>

      <div className="col-span-7 rounded-md border p-4 md:col-span-3">
        <h1 className="mb-4 text-xl font-medium">Recent Sales</h1>

        <Table>
          <TableRow>
            <TableHead className="text-md flex-1">Buyer</TableHead>
            <TableHead className="text-md text-center">Date</TableHead>
            <TableHead className="text-md text-right">Total</TableHead>
            <TableHead className="text-md text-right">Actions</TableHead>
          </TableRow>

          <TableBody>
            {props.recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="flex-1">{order.name}</TableCell>

                <TableCell className="text-center">
                  {formatDate(order.date)}
                </TableCell>

                <TableCell className="text-right">
                  ${order.totalPrice}
                </TableCell>

                <TableCell className="text-right">
                  {/* TODO: fix link */}
                  <Link href={paths.orderDetails(order.id)}>
                    <Button>View</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  </div>
);
