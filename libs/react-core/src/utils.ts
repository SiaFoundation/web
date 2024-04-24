'use client'

import { mutate } from 'swr'

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'
export function getKey<Payload>(
  method: Method,
  route: string,
  args?: {
    payload?: Payload
  }
): [Method, string] {
  return [
    method,
    `${route}${args?.payload ? JSON.stringify(args.payload) : ''}`,
  ]
}

export function keyOrNull(name: string[] | null, disabled?: boolean) {
  if (!name || disabled) {
    return null
  }

  return name
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function clearAllSwrKeys() {
  mutate(() => true, undefined, { revalidate: false })
}
