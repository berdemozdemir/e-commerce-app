import { FC } from 'react';
import type { LucideIcon } from 'lucide-react';

type Props = {
  title: string;
  value: number | string;
  icon: LucideIcon;
};

export const InforCard: FC<Props> = ({ title, value, icon: Icon }) => (
  <div className="w-full rounded-md border p-4">
    <div className="mb-4 flex items-center justify-between">
      <p>{title}</p>

      <Icon />
    </div>

    <p>{value}</p>
  </div>
);
