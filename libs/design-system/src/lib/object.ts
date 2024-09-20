type ObjectEntries<T extends object> = Array<[keyof T, T[keyof T]]>

export function objectEntries<T extends object>(obj: T): ObjectEntries<T> {
  return Object.entries(obj) as ObjectEntries<T>
}
