import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { signInWithCredentials, signUpUser } from '../actions/auth';
import { SignupFormSchemaRequest } from '../schemas/auth/sign-up.schema';
import { SignInFormSchemaRequest } from '../schemas/auth/sign-in.schema';

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (data: SignInFormSchemaRequest) =>
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
    mutationFn: (data: SignupFormSchemaRequest) =>
      signUpUser(data).then((res) => {
        if (res.error) throw res.error;
        return res.data;
      }),
    onError: (error) => {
      console.error('Signup error:', error);
      toast.error(error.message);
    },
  });
