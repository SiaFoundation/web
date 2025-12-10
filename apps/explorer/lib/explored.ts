import { Explored } from '@siafoundation/explored-js'
import { exploredApi } from '../config'
import { cookies } from 'next/headers'
import {
  exploredCustomApiCookieName,
  exploredTimeout,
} from '../config/explored'

// Allow passing a custom explored address via a cookie for testing purposes.
async function getExploredAddressCookie() {
  const cookieStore = await cookies()
  const customExploredAddress = cookieStore.get(
    exploredCustomApiCookieName,
  )?.value
  return customExploredAddress
}

export async function getExploredAddress() {
  if (process.env.NODE_ENV === 'development') {
    return (await getExploredAddressCookie()) || exploredApi
  }
  return exploredApi
}

export async function getExplored(explicitAddress?: string) {
  if (explicitAddress) {
    return Explored({ api: explicitAddress, timeout: exploredTimeout })
  }
  if (process.env.NODE_ENV === 'development') {
    const exploredAddress = await getExploredAddress()
    return Explored({ api: exploredAddress, timeout: exploredTimeout })
  }
  return Explored({ api: exploredApi, timeout: exploredTimeout })
}
