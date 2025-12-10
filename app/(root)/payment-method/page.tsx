import { PaymentMethodForm } from '@/components/PaymentMethodForm';

export async function generateMetadata() {
  return {
    title: 'Payment Method',
    description: 'Select your preferred payment method for the order.',
  };
}

export const PaymentMethodPage = () => {
  return (
    <div>
      <PaymentMethodForm />
    </div>
  );
};

export default PaymentMethodPage;
