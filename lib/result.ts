type Success<T> = {
  data: T;
  error?: undefined;
};

type Failure = {
  data?: undefined;
  error: string;
};

export type Result<T> = Success<T> | Failure;

export const ok = <T>(data: T): Success<T> => {
  return {
    data,
    error: undefined,
  };
};

export const isOk = <T>(result: Result<T>): result is Success<T> => {
  return 'data' in result && result.error !== undefined;
};

export const failure = (error: string): Failure => {
  return {
    data: undefined,
    error,
  };
};

export const isFailure = <T>(result: Result<T>): result is Failure => {
  return 'error' in result && !result.data;
};

export const okOrThrow = <T>(result: Result<T>): T => {
  if (isFailure(result)) {
    throw new Error(result.error);
  }

  return result.data;
};

export const tryCatch = async <T>(promise: Promise<T>): Promise<Result<T>> => {
  try {
    const result = await promise;
    return ok(result);
  } catch (error) {
    if (error instanceof Error) {
      return failure(error.message);
    }

    return failure(`An unknown error ocurred. ${error}`);
  }
};
