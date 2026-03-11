export const isValidImageSrc = (
  src: string | null | undefined,
): src is string => {
  if (!src) return false;
  return src.startsWith('/') || src.startsWith('http');
};
