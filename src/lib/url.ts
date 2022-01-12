import { dev } from '../config/env'

export function getHref(url: string) {
  if (dev) {
    return `http://${url}`
  }
  return `https://${url}`
}
