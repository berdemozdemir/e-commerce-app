import { Address } from './address';
import { PaymentMethod } from './payment-methods';
import { Role } from './role';

export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  profileImageUrl?: string;
  address?: Address;
  paymentMethod?: PaymentMethod;
  role?: Role;
};

export type EditableUser = Pick<User, 'id' | 'name' | 'email'> & {
  role: Role;
};
