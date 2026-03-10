/**
 * Go-style [err, data] tuple.
 * - Success: [null, T]
 * - Failure: [string, null]
 * Serializable (string error) so safe for server action return.
 */
export type TryTuple<T> = [err: null, data: T] | [err: string, data: null];

export const tryCatch = async <T>(
  promise: Promise<T>,
): Promise<TryTuple<T>> => {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    const message =
      error instanceof Error ? error.message : `Unknown error: ${error}`;
    return [message, null];
  }
};

/** Sync success: use in actions when returning success. */
export const ok = <T>(data: T): TryTuple<T> => [null, data];

/** Sync failure: use in actions when returning error. */
export const fail = (message: string): TryTuple<never> => [message, null];

export const isErr = <T>(t: TryTuple<T>): t is [string, null] => t[0] !== null;
export const isOk = <T>(t: TryTuple<T>): t is [null, T] => t[0] === null;

/** Get error message or null. */
export const getErr = <T>(t: TryTuple<T>): string | null =>
  t[0] === null ? null : t[0];

/** Get data or null. */
export const getData = <T>(t: TryTuple<T>): T | null =>
  t[0] === null ? t[1] : null;

/**
 * Unwrap tuple to data; throws if err. Use in client (e.g. React Query) where
 * you want promise rejection instead of tuple.
 */
export const unwrap = <T>(t: TryTuple<T>): T => {
  if (t[0] !== null) throw new Error(t[0]);
  return t[1];
};

/**
 * Convert TryTuple-returning promise to promise that resolves data or rejects.
 * Use: createOrder().then(unwrapAsync) in mutationFn.
 */
export const unwrapAsync = <T>(p: Promise<TryTuple<T>>): Promise<T> =>
  p.then(unwrap);
