import { TAddress } from './address';
import { TPaymentMethod } from './payment-methods';
import { TRole } from './role';

export type TUser = {
  id: string;
  name: string;
  email: string;
  image?: string;
  profileImageUrl?: string;
  address?: TAddress;
  paymentMethod?: TPaymentMethod;
  role?: TRole;
};

export type TEditableUser = Pick<TUser, 'id' | 'name' | 'email'> & {
  role: TRole;
};
