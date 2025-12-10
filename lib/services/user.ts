import { useMutation } from '@tanstack/react-query';
import { updateUserAddress } from '../actions/user/update-user-address';
import { TShippingAddressSchema } from '../schemas/shipping-address';
import { okOrThrow } from '../result';
import { updatePaymentMethods } from '../actions/user/update-payment-methods';

export const useUpdateUserAddressMutation = () =>
  useMutation({
    mutationFn: (address: TShippingAddressSchema) =>
      updateUserAddress(address).then(okOrThrow),
  });

export const useUpdateUserPaymentMethodMutation = () =>
  useMutation({
    mutationFn: (paymentMethod: { paymentMethod: string }) =>
      updatePaymentMethods(paymentMethod).then(okOrThrow),
  });
