export type Flatten<T> =
  T extends object ? (
    (
      {
        [K in keyof T]: K extends string ? (
          T[K] extends object ? (
            T[K] extends Date ? Pick<T, K> : (
              // Exclude arrays from flattening
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              T[K] extends readonly any[] ? Pick<T, K> : (
                Flatten<T[K]> extends infer F ? {
                  [P in keyof F as `${K}.${Extract<P, string>}`]: F[P];
                } : never
              )
            )
          ) : Pick<T, K>
        ) : Pick<T, K>;
      }[keyof T]
    ) extends infer U ? Combine<U> : never
  ) : T;

export type _Combine<T, K extends PropertyKey = T extends unknown ? keyof T : never> =
  T extends unknown ? T & Partial<Record<Exclude<K, keyof T>, never>> : never;

export type Combine<T> = {
  [P in keyof _Combine<T>]: _Combine<T>[P];
};
