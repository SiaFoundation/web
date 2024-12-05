export type Maybe<T> = T | undefined

export type NoUndefined<T> = {
  [K in keyof T]: Exclude<T[K], undefined>
}
