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

// Reuse a single Explored instance in production to avoid creating a new
// Axios instance on every server-side render.
let _explored: ReturnType<typeof Explored> | null = null

export async function getExplored(explicitAddress?: string) {
  if (explicitAddress) {
    return Explored({ api: explicitAddress, timeout: exploredTimeout })
  }
  if (process.env.NODE_ENV === 'development') {
    const exploredAddress = await getExploredAddress()
    return Explored({ api: exploredAddress, timeout: exploredTimeout })
  }
  if (!_explored) {
    _explored = Explored({ api: exploredApi, timeout: exploredTimeout })
  }
  return _explored
}
