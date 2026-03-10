import { useMutation } from '@tanstack/react-query';
import { updateUserAddress } from '../actions/user/update-user-address';
import { TShippingAddressSchema } from '../schemas/shipping-address';
import { unwrapAsync } from '../result';
import { updatePaymentMethods } from '../actions/user/update-payment-methods';
import { TPaymentMethod } from '../types/payment-methods';
import { updateUserProfile } from '../actions/user/update-user-profile';
import { TUpdateUserProfileSchema } from '../schemas/update-user-profile';

export const useUpdateUserAddressMutation = () =>
  useMutation({
    mutationFn: (address: TShippingAddressSchema) =>
      unwrapAsync(updateUserAddress(address)),
  });

export const useUpdateUserPaymentMethodMutation = () =>
  useMutation({
    mutationFn: (paymentMethod: { paymentMethod: TPaymentMethod }) =>
      unwrapAsync(updatePaymentMethods(paymentMethod)),
  });

export const useUpdateUserProfileMutation = () =>
  useMutation({
    mutationFn: (payload: TUpdateUserProfileSchema) =>
      unwrapAsync(updateUserProfile(payload)),
  });
