import { TAddress } from './address';
import { TPaymentMethod } from './payment-methods';

export type TUser = {
  id: string;
  name: string;
  email: string;
  image?: string;
  address?: TAddress;
  paymentMethod?: TPaymentMethod;
};
