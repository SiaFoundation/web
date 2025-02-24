// Properly typed version of Object.keys.
export function keys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof T>
}
