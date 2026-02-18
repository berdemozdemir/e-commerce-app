'use client';

import { paths } from '@/lib/constants/paths';
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
import { TUser } from '@/lib/types/admin/user';
import { Roles } from '@/lib/types/role';
import { Badge } from '../ui/Badge';
import { useRouter } from 'next/navigation';
import { DeleteUserDialog } from './DeleteUserDialog';

type Props = {
  users: TUser[];
};

export const UsersList: FC<Props> = ({ users }) => {
  const router = useRouter();

  return (
    <Table className="mb-4">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>NAME</TableHead>
          <TableHead>EMAIL</TableHead>
          <TableHead>ROLE</TableHead>
          <TableHead>ACTIONS</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="cursor-pointer">
              {user.id.slice(0, 7)}..
            </TableCell>

            <TableCell>{user.name}</TableCell>

            <TableCell>{user.email}</TableCell>

            <TableCell>
              {user.role === Roles.User && (
                <Badge variant="outline">User</Badge>
              )}

              {user.role === Roles.Admin && <Badge>Admin</Badge>}
            </TableCell>

            <TableCell className="space-x-2">
              <Button
                onClick={() => router.push(paths.admin.users.detail(user.id))}
              >
                Details
              </Button>

              <DeleteUserDialog userId={user.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
