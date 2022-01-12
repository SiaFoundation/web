import { dev } from '../config/env'

export function getUrl(url: string) {
  if (dev) {
    return `http://${url}`
  }
  return `https://${url}`
}
