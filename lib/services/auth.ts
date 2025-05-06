import { useMutation } from '@tanstack/react-query';
import { signInWithCredentials, signUpUser } from '../actions/user.action';
import { toast } from 'react-toastify';
import { TSignupFormSchemaRequest } from '../schemas/auth/sign-up.schema';
import { TSignInFormSchemaRequest } from '../schemas/auth/sign-in.schema';

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (data: TSignInFormSchemaRequest) =>
      signInWithCredentials(data).then((res) => {
        if (res.error) throw res.error;
        return res.data;
      }),
    onError: (error) => {
      console.error('Login error:', error);
      toast.error(error.message);
    },
  });

export const useSignupMutation = () =>
  useMutation({
    mutationFn: (data: TSignupFormSchemaRequest) =>
      signUpUser(data).then((res) => {
        if (res.error) throw res.error;
        return res.data;
      }),
    onError: (error) => {
      console.error('Signup error:', error);
      toast.error(error.message);
    },
  });
