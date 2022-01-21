import { dev } from '@siafoundation/env'

export function getHref(url: string) {
  if (dev) {
    return `http://${url}`
  }
  return `https://${url}`
}
