export const Roles = {
  User: 'User',
  Admin: 'Admin',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export function getRoles(): readonly Role[] {
  return Object.values(Roles) as Role[];
}

export function isValidRole(role: string): role is Role {
  return Object.values(Roles).includes(role as Role);
}
