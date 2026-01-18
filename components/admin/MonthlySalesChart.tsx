'use client';

import { MonthlySalesRow } from '@/lib/types/admin/monthly-sales';
import { FC } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Props = { monthlySales: MonthlySalesRow[] };

export const MonthlySalesChart: FC<Props> = (props) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={props.monthlySales}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis dataKey="totalSales" tickFormatter={(value) => `$${value}`} />
      <Tooltip />
      <Bar dataKey="totalSales" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);
