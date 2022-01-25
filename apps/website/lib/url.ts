import { isDev } from '@siafoundation/env'

export function getHref(url: string) {
  if (isDev()) {
    return `http://${url}`
  }
  return `https://${url}`
}
