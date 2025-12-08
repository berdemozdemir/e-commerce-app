import { useMutation } from '@tanstack/react-query';
import { updateUserAddress } from '../actions/user/update-user-address';
import { TShippingAddressSchema } from '../schemas/shipping-address';
import { okOrThrow } from '../result';

export const useUpdateUserAddressMutation = () =>
  useMutation({
    mutationFn: (address: TShippingAddressSchema) =>
      updateUserAddress(address).then(okOrThrow),
  });
