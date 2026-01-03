import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TCartItem } from './schemas/cart/cart-item.schema';

// TODO: move this file into lib/utils
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertNumberToDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split('.');

  return decimal ? `${int}.${decimal}` : `${int}.00`;
};

export const convertToPlainObject = <T>(value: T): T =>
  JSON.parse(JSON.stringify(value));

export const getTwoLetterInitials = (name: string): string => {
  const names = name.split(' ');

  if (names.length < 2) return names[0].charAt(0).toUpperCase();

  return `${names[0].charAt(0).toUpperCase()}${names[1].charAt(0).toUpperCase()}`;
};

export const roundTwo = (value: string | number) => {
  if (typeof value === 'string') {
    return Math.round(Number(value) * 100) / 100;
  } else if (typeof value === 'number') {
    return Math.round(value * 100) / 100;
  } else {
    throw new Error('Value must be a string or number');
  }
};

export const calculatePrice = (items: TCartItem[]) => {
  const itemsPrice = roundTwo(
    items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0),
  );

  const taxPrice = roundTwo(itemsPrice * 0.15);
  const shippingPrice = roundTwo(itemsPrice > 100 ? 0 : 10);
  const totalPrice = roundTwo(itemsPrice + shippingPrice + taxPrice);

  return {
    taxPrice: taxPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    itemsPrice: itemsPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};
