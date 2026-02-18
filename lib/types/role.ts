export const Role = {
  User: 'User',
  Admin: 'Admin',
} as const;

export type TRole = (typeof Role)[keyof typeof Role];

export function getRoles(): readonly TRole[] {
  return Object.values(Role) as TRole[];
}

export function isValidRole(role: string): role is TRole {
  return Object.values(Role).includes(role as TRole);
}
