import { useMutation } from '@tanstack/react-query';
import { signInWithCredentials, signUpUser } from '../actions/user.action';
import { toast } from 'react-toastify';
import { TSignupFormSchemaRequest } from '../schemas/auth/sign-up.schema';

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (formData: FormData) => {
      return signInWithCredentials(formData).then((res) => {
        if (res.error) throw res.error;
        return res.data;
      });
    },
    onError: (error) => {
      console.error('Login error:', error);
      toast.error(error.message);
    },
  });

export const useSignupMutation = () =>
  useMutation({
    mutationFn: (data: TSignupFormSchemaRequest) => {
      return signUpUser(data).then((res) => {
        if (res.error) throw res.error;
        return res.data;
      });
    },
    onError: (error) => {
      console.error('Signup error:', error);
      toast.error(error.message);
    },
  });
