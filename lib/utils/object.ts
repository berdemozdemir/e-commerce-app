export const convertToPlainObject = <T>(value: T): T =>
  JSON.parse(JSON.stringify(value));
