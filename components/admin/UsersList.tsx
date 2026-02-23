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
import Link from 'next/link';

type Props = {
  users: TUser[];
  query?: string;
};

export const UsersList: FC<Props> = ({ users, query }) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center gap-4">
        <h1 className="text-2xl">
          Users List {query && <span> ({users.length}) </span>}
        </h1>

        {query && (
          <span className="text-lg text-gray-500">
            for &apos;<span className="italic">{query}</span>&apos; filter
          </span>
        )}

        {query && (
          <Link href={paths.admin.users.list}>
            <Button variant="link" className="p-0 text-gray-500 underline">
              Clear Filter
            </Button>
          </Link>
        )}
      </div>

      {users.length === 0 && (
        <div className="flex items-center justify-center">
          <p className="text-gray-500">No users found</p>
        </div>
      )}

      {users.length > 0 && (
        <div>
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
                      onClick={() =>
                        router.push(paths.admin.users.detail(user.id))
                      }
                    >
                      Details
                    </Button>

                    <DeleteUserDialog userId={user.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
