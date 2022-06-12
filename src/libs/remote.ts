import { ReactNode } from 'react';

export function UnreachableCaseError(_x: never): never {
  throw new Error("Didn't expect to get here");
}

export type RemoteDataContents<T> = T extends RemoteData<infer Data, any> ? Data : never;

export enum RemoteDataStatus {
  Initialized = 'Initialized',
  Pending = 'Pending',
  PendingHasData = 'PendingHasData',
  Failure = 'Failure',
  FailureHasData = 'FailureHasData',
  Success = 'Success',
}

/**
 * Еще не начинался процесс загрузки
 */
export type Initialized = { readonly status: RemoteDataStatus.Initialized };

/**
 * Данные загружаются в первый раз, нет старых данных
 */
export type Pending = {
  readonly status: RemoteDataStatus.Pending;
};

/**
 * Данные обновляются, есть устаревшие данные, которые можно показать
 */
export type PendingHasData<Data> = {
  readonly status: RemoteDataStatus.PendingHasData;
  readonly data: Data;
};

/**
 * Произошла ошибка
 */
export type Failure<Error> = {
  readonly status: RemoteDataStatus.Failure;
  readonly error: Error;
};
/**
 * Произошла ошибка
 */
export type FailureHasData<Data, Error> = {
  readonly status: RemoteDataStatus.FailureHasData;
  readonly data: Data;
  readonly error: Error;
};

/**
 * Успешно загрузили данные
 */
export type Success<Data> = {
  readonly status: RemoteDataStatus.Success;
  readonly data: Data;
};

/**
 * Главный тип-контейнер для любых данных, которые могут загружаться из бэкенда и для которых нужно
 * отслеживать состояние загрузки
 */
export type RemoteData<Data, Error = any> =
  | Initialized
  | Pending
  | PendingHasData<Data>
  | Failure<Error>
  | FailureHasData<Data, Error>
  | Success<Data>;

/**
 * Начальное состяние, использовать, к примеру, в reducer'ах типа
 *  reducer(state = initialized(), action)
 */
export function initialized(): Initialized {
  return { status: RemoteDataStatus.Initialized };
}
/**
 * Состояние загрузки данных, возможно передать старое состояние, при этом во всех местах, где используется
 * remote data можно будет получить старое состояние и показывать его плюс спиннер
 *
 * @param data устаревшие данные, при наличии (Передаётся именно RemoteData)
 */
export function pending<Data, Error = any>(data?: RemoteData<Data, Error>): Pending | PendingHasData<Data> {
  if (data != null && hasData(data)) {
    return { status: RemoteDataStatus.PendingHasData, data: data.data };
  } else {
    return { status: RemoteDataStatus.Pending };
  }
}
/**
 * Состояние загрузки данных
 * @param data устаревшие данные, сами данные, без обёртки RemoteData. @seealso #pending()
 */
export function pendingHasData<Data>(data: Data): PendingHasData<Data> {
  return { status: RemoteDataStatus.PendingHasData, data };
}
/**
 * Произошла ошибка
 * @param error объект ошибки
 * @param data
 */
export function failure<Data, Error = any>(
  error: Error,
  data?: RemoteData<Data, any>
): Failure<Error> | FailureHasData<Data, Error>;

export function failure<Data, Error = any>(error: Error, data?: Data): Failure<Error> | FailureHasData<Data, Error>;

export function failure<Data, Error = any>(
  error: Error,
  data?: RemoteData<Data, any>
): Failure<Error> | FailureHasData<Data, Error> {
  return data != null
    ? typeof data === 'object' && data.status != null
      ? hasData(data)
        ? { status: RemoteDataStatus.FailureHasData, error, data: data.data as any }
        : { status: RemoteDataStatus.Failure, error }
      : { status: RemoteDataStatus.FailureHasData, error, data }
    : { status: RemoteDataStatus.Failure, error };
}

/**
 * Произошла ошибка, есть загруженные данные
 * @param data
 * @param error объект ошибки, по умолчанию строка
 */
export function failureHasData<Data, Error = any>(data: Data, error: Error): FailureHasData<Data, Error> {
  return { status: RemoteDataStatus.FailureHasData, data, error };
}

/**
 * Успешно полученные данные
 * @param data данные
 */
export function success<Data>(data: Data): Success<Data> {
  return { status: RemoteDataStatus.Success, data };
}
/**
 * Главная функция-трансформер для показа всех возможных вариантов событий с RemoteData.
 *
 * Принимает на вход четыре функции, которые вызывает при том или ином состоянии данных.
 *
 * @param success успешное выполнение либо загрузка с доступными устаревшими данными, передаются данные и флаг — индикатор загрузки
 * @param initialized
 * @param pending
 * @param failure
 */
export function fold<Data, Error = any, Result = ReactNode>(
  success: (data: Data, pending: boolean) => Result,
  initialized: () => Result,
  pending: () => Result,
  failure: (error: Error, data?: Data | undefined) => Result
) {
  return (data: RemoteData<Data, Error>): Result => {
    switch (data.status) {
      case RemoteDataStatus.Initialized:
        return initialized();
      case RemoteDataStatus.Pending:
        return pending();
      case RemoteDataStatus.PendingHasData:
        return success(data.data, true);
      case RemoteDataStatus.Failure:
        return failure(data.error);
      case RemoteDataStatus.FailureHasData:
        return failure(data.error, data.data);
      case RemoteDataStatus.Success:
        return success(data.data, false);
      default:
        throw UnreachableCaseError(data);
    }
  };
}
/**
 * Функция для обработки данных, наподобие Array.map. Принимает на вход функцию обработчик, которую вызывает в тех случаях, к
 * когда в RemoteData есть данные.
 *
 * для использования в selector'ах и других местах, где необходимо предобразовать данные, но сохранить все состояния загрузки
 *
 * export const selectPlusOne = state => remoteMap(state=>state + 1, state)
 * для Pending останется Pending, для Success(1) будет Success(2)
 *
 * @param func функция обработчик
 * @param data RemoteData
 */
export function remoteMap<Result, Data, Error>(
  func: (data: Data) => Result,
  data: RemoteData<Data, Error>
): RemoteData<Result, Error> {
  if (data.status === RemoteDataStatus.Success) {
    return success(func(data.data));
  } else if (data.status === RemoteDataStatus.PendingHasData) {
    return pendingHasData(func(data.data));
  } else if (data.status === RemoteDataStatus.FailureHasData) {
    return failureHasData(func(data.data), data.error);
  } else {
    return data;
  }
}

/**
 * Похожа на remoteMap, с тем отличием, что в remoteMap функция возвращает данные, а здесь — RemoteData с данными.
 *
 * Полезна для сливания двух RemoteData
 *
 * @param func
 * @param data
 */
export function remoteBind<Result, Data, Error1, Error2>(
  func: (data: Data, error?: Error1 | undefined) => RemoteData<Result, Error2>,
  data: RemoteData<Data, Error1>
): RemoteData<Result, Error1 | Error2> {
  if (data.status === RemoteDataStatus.Success) {
    return func(data.data);
  } else if (data.status === RemoteDataStatus.PendingHasData) {
    return func(data.data);
  } else if (data.status === RemoteDataStatus.FailureHasData) {
    return func(data.data, data.error);
  } else {
    return data;
  }
}

/**
 * Аналог maybeData или remoteMap Для использования преимущественно в reducer'ах или selector'ах, где нужно сохранить обёртку RemoteData, но
 * иметь возможность выставить значение по умолчанию.
 *
 * @param func
 * @param initialValue
 * @param data
 */
export function updateRemote<Data, Result, Error = any>(
  func: (data: Data) => Result,
  initialValue: Data,
  data: RemoteData<Data, Error>
): RemoteData<Result, Error> {
  if (data.status === RemoteDataStatus.Initialized || data.status === RemoteDataStatus.Pending) {
    return pendingHasData(func(initialValue));
  } else if (data.status === RemoteDataStatus.PendingHasData) {
    return pendingHasData(func(data.data));
  } else if (data.status === RemoteDataStatus.Success) {
    return success(func(data.data));
  } else if (data.status === RemoteDataStatus.FailureHasData) {
    return failureHasData(func(data.data), data.error);
  } else {
    return data;
  }
}

/**
 * Вторая функция для показа данных, в случае, когда нам не нужно обрабатывать pending/failure состояния, а вместо этого можно показать
 * значение по-умолчанию
 *
 * @param selector
 * @param defaultValue
 * @param data
 */
export function maybeData<Result, Data, Error>(
  selector: (data: Data) => Result,
  defaultValue: Result,
  data: RemoteData<Data, Error> | null | undefined
): Result {
  if (
    data != null &&
    (data.status === RemoteDataStatus.Success ||
      data.status === RemoteDataStatus.PendingHasData ||
      data.status === RemoteDataStatus.FailureHasData)
  ) {
    return selector(data.data);
  } else {
    return defaultValue;
  }
}

/**
 * Функция проверки RemoteData на то, что внутри есть data, одновременно является type guard,
 * говорящей typescript'у что у объекта теперь точно есть поле .data
 *
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 * @param data
 */
export function hasData<Data, Error = any>(
  data: RemoteData<Data, Error> | null | undefined
): data is PendingHasData<Data> | Success<Data> {
  return (
    data != null &&
    (data.status === RemoteDataStatus.PendingHasData ||
      data.status === RemoteDataStatus.FailureHasData ||
      data.status === RemoteDataStatus.Success)
  );
}

/**
 * Функция проверки RemoteData на то, что данные находятся в процессе загрузки
 *
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 * @param data
 */
export function isPending<Data, Error = any>(
  data: RemoteData<Data, Error> | null | undefined
): data is Initialized | Pending | PendingHasData<Data> {
  return data == null || data.status === RemoteDataStatus.Pending || data.status === RemoteDataStatus.PendingHasData;
}

/**
 * Функция проверки RemoteData на то, произошла ошибка
 *
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 * @param data
 */
export function isFailure<Data, Error = any>(
  data: RemoteData<Data, Error> | null | undefined
): data is Failure<Error> | FailureHasData<Data, Error> {
  return data == null || data.status === RemoteDataStatus.Failure || data.status === RemoteDataStatus.FailureHasData;
}
