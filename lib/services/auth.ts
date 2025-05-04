import { useMutation } from '@tanstack/react-query';
import { signInWithCredentials, signUpUser } from '../actions/user.action';
import { toast } from 'react-toastify';

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (formData: FormData) => {
      return signInWithCredentials(null, formData).then((res) => {
        if (res.error) throw res.error;
        return res.data;
      });
    },
    onError: (error) => {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      toast.error(error.message);
    },
  });

export const useSignupMutation = () =>
  useMutation({
    mutationFn: (formData: FormData) => {
      return signUpUser(null, formData).then((res) => {
        if (res.error) throw res.error;
        return res.data;
      });
    },
    onError: (error) => {
      console.error('Signup error:', error);
      const msg = error instanceof Error ? error.message : 'Signup failed.';
      toast.error(msg);
    },
  });
