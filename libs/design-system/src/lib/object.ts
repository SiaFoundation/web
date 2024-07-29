type ObjectEntries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

export function objectEntries<T extends object>(obj: T): ObjectEntries<T> {
  return Object.entries(obj) as ObjectEntries<T>
}
