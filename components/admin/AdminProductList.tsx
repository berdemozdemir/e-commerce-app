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

type Props = { products: TAdminProduct[] };

export const AdminProductListPage: FC<Props> = (props) => {
  return (
    <div>
      <h1 className="mb-4 text-2xl">Product List</h1>

      <Table className="mb-4">
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
                <Button>Edit</Button>

                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
