import { paths } from '@/lib/constants/paths';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { TAddress } from '@/lib/types/address';
import { FC } from 'react';

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
