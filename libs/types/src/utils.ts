export type Maybe<T> = T | undefined
export type Nullable<T> = T | null
export type Nullish<T> = T | null | undefined

export type NoUndefined<T> = {
  [K in keyof T]: Exclude<T[K], undefined>
}
