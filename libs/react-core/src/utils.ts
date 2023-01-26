export function getKey(name: string | null, disabled?: boolean) {
  if (!name || disabled) {
    return null
  }

  return name
}
