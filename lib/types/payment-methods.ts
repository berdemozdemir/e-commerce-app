export const PaymentMethods = {
  Paypal: 'PayPal',
  Stripe: 'Stripe',
  CashOnDelivery: 'Cash on Delivery',
} as const;

// TODO: take a look at this, make this one practise
export type TPaymentMethod =
  (typeof PaymentMethods)[keyof typeof PaymentMethods];

export function getPaymentMethods(): readonly [TPaymentMethod] {
  return Object.values(PaymentMethods) as [TPaymentMethod];
}

export function isValidPaymentMethod(method: string): method is TPaymentMethod {
  return Object.values(PaymentMethods).includes(method as TPaymentMethod);
}
