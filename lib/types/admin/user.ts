import { TRole } from '../role';

export type TUser = {
  id: string;
  name: string;
  email: string;
  role: TRole;
};
