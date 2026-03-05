import { Truck, Headset, CreditCard, RefreshCw } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/motion/FadeIn';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On all orders over $100',
  },
  {
    icon: Headset,
    title: '24/7 Support',
    description: 'Dedicated support team',
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    description: '100% secure payment',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30 days return policy',
  },
];

export const HomeFeatures = () => {
  return (
    <StaggerContainer className="my-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
      {features.map((feature) => (
        <StaggerItem
          key={feature.title}
          className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
        >
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <feature.icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
};
