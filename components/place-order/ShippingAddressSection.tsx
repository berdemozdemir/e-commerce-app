import Link from 'next/link';
import { FC } from 'react';
import { Button } from '../ui/Button';
import { paths } from '@/lib/constants/paths';
import { TAddress } from '@/lib/types/address';

type Props = {
  address: TAddress;
};

export const ShippingAddressSection: FC<Props> = ({ address }) => (
  <section className="mb-8 rounded-md border p-4">
    <h1 className="text-lg font-semibold">Shipping Address</h1>

    <h1>{address.addressName}</h1>

    <h1>{address.address}</h1>

    <p className="mb-4">
      {address.city}, {address.country} {address.postalCode}
    </p>

    <Link href={paths.shippingAddress}>
      <Button>Edit</Button>
    </Link>
  </section>
);
