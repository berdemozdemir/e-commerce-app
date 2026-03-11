import { useMutation } from '@tanstack/react-query';
import { updateUserAddress } from '../actions/user/update-user-address';
import { ShippingAddressSchema } from '../schemas/shipping-address';
import { unwrapAsync } from '../result';
import { updatePaymentMethods } from '../actions/user/update-payment-methods';
import { PaymentMethod } from '../types/payment-methods';
import { updateUserProfile } from '../actions/user/update-user-profile';
import { UpdateUserProfileSchema } from '../schemas/update-user-profile';

export const useUpdateUserAddressMutation = () =>
  useMutation({
    mutationFn: (address: ShippingAddressSchema) =>
      unwrapAsync(updateUserAddress(address)),
  });

export const useUpdateUserPaymentMethodMutation = () =>
  useMutation({
    mutationFn: (paymentMethod: { paymentMethod: PaymentMethod }) =>
      unwrapAsync(updatePaymentMethods(paymentMethod)),
  });

export const useUpdateUserProfileMutation = () =>
  useMutation({
    mutationFn: (payload: UpdateUserProfileSchema) =>
      unwrapAsync(updateUserProfile(payload)),
  });
