export const convertNumberToDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split('.');

  return decimal ? `${int}.${decimal}` : `${int}.00`;
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
