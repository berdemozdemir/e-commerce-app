import { queryOptions, useQuery } from '@tanstack/react-query';
import { auth } from '../auth';

export const authQueryOptions = queryOptions({
  queryKey: ['session'],
  queryFn: async () => {
    const session = await auth();

    const user = session?.user;
    const isLoggedIn = !!user;
    const isAdmin = user?.role === 'admin';

    return {
      isLoggedIn,
      user: user
        ? {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        : null,
      isAdmin,
    };
  },
  staleTime: 1000 * 60 * 5, // 5 minutes
});

export const useAuthQuery = () => useQuery(authQueryOptions);
