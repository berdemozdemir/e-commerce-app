import { FC } from 'react';

type Props = {
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
};

export const PriceSummary: FC<Props> = (props) => (
  <section className="mb-4 h-fit space-y-1 rounded-md border p-4 font-semibold">
    <div className="flex justify-between">
      <h1>items:</h1>

      <span>${props.itemsPrice.toFixed(2)}</span>
    </div>

    <div className="flex justify-between">
      <h1>Tax: </h1>

      <span>${props.taxPrice.toFixed(2)}</span>
    </div>

    <div className="flex justify-between">
      <h1>Shipping:</h1>

      <span> ${props.shippingPrice.toFixed(2)}</span>
    </div>

    <div className="flex justify-between">
      <h1>Total:</h1>

      <span>${props.totalPrice.toFixed(2)}</span>
    </div>
  </section>
);
