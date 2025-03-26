import { Explored } from '@siafoundation/explored-js'
import { exploredApi } from '../config'
import { cookies } from 'next/headers'
import {
  exploredCustomApiCookieName,
  exploredCustomApiSwrKey,
} from '../config/explored'

// Allow passing a custom explored address via a cookie for testing purposes.
function getExploredAddressCookie() {
  const cookieStore = cookies()
  const customExploredAddress = cookieStore.get(
    exploredCustomApiCookieName
  )?.value
  return customExploredAddress
}

export function buildFallbackDataExploredAddress() {
  if (process.env.NODE_ENV === 'development') {
    return {
      [exploredCustomApiSwrKey]: getExploredAddressCookie() || exploredApi,
    }
  }
  return {
    [exploredCustomApiSwrKey]: exploredApi,
  }
}

export function getExploredAddress() {
  if (process.env.NODE_ENV === 'development') {
    return getExploredAddressCookie() || exploredApi
  }
  return exploredApi
}

export function getExplored(explicitAddress?: string) {
  if (explicitAddress) {
    return Explored({ api: explicitAddress })
  }
  if (process.env.NODE_ENV === 'development') {
    const exploredAddress = getExploredAddress()
    return Explored({ api: exploredAddress })
  }
  return Explored({ api: exploredApi })
}
