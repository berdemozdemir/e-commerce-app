export const PaymentMethods = {
  Paypal: 'PayPal',
  Stripe: 'Stripe',
  CashOnDelivery: 'Cash on Delivery',
} as const;

export type PaymentMethod =
  (typeof PaymentMethods)[keyof typeof PaymentMethods];

export function getPaymentMethods(): readonly [PaymentMethod] {
  return Object.values(PaymentMethods) as [PaymentMethod];
}

export function isValidPaymentMethod(method: string): method is PaymentMethod {
  return Object.values(PaymentMethods).includes(method as PaymentMethod);
}
