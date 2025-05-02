import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertNumberToDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split('.');

  return decimal ? `${int}.${decimal}` : `${int}.00`;
};

export const getTwoLetterInitials = (name: string): string => {
  const names = name.split(' ');

  if (names.length < 2) return names[0].charAt(0).toUpperCase();

  return `${names[0].charAt(0).toUpperCase()}${names[1].charAt(0).toUpperCase()}`;
};
