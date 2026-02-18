export const Roles = {
  User: 'User',
  Admin: 'Admin',
} as const;

export type TRole = (typeof Roles)[keyof typeof Roles];

export function getRoles(): readonly TRole[] {
  return Object.values(Roles) as TRole[];
}

export function isValidRole(role: string): role is TRole {
  return Object.values(Roles).includes(role as TRole);
}
