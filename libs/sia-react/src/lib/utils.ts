import { SWROptions } from './types'

export function keyOrNull<T>(name: string, options?: SWROptions<T>) {
  if (options?.disabled) {
    return null
  }

  return `sia/${name}`
}

export const defaultApi = ''
