export function keyOrNull(name: string | null, disabled?: boolean) {
  if (!name || disabled) {
    return null
  }

  return name
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
