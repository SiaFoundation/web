import { Explored } from '@siafoundation/explored-js'
import { randomBytes } from 'crypto'
import { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { exploredApi, exploredInternalApi } from '../config'
import { cookies } from 'next/headers'
import {
  exploredCustomApiCookieName,
  exploredTimeout,
} from '../config/explored'
import { logger } from './logger'

export function generateTraceId(): string {
  return randomBytes(8).toString('hex')
}

interface RequestMetadata {
  startTime: number
}

// WeakMap so entries are cleaned up when the request config is garbage collected.
const metadataMap = new WeakMap<InternalAxiosRequestConfig, RequestMetadata>()

function addLoggingInterceptors(axios: AxiosInstance, traceId: string) {
  axios.interceptors.request.use((config) => {
    metadataMap.set(config, { startTime: Date.now() })
    return config
  })
  axios.interceptors.response.use(
    (response) => {
      const meta = metadataMap.get(response.config)
      const duration_ms = meta ? Date.now() - meta.startTime : undefined
      logger.info('request', 'request_completed', {
        trace_id: traceId,
        method: response.config.method?.toUpperCase(),
        url: response.config.url,
        status: response.status,
        duration_ms,
      })
      return response
    },
    (error) => {
      const config = error.config
      const meta = config ? metadataMap.get(config) : undefined
      const duration_ms = meta ? Date.now() - meta.startTime : undefined
      logger.error('request', 'request_failed', {
        trace_id: traceId,
        method: config?.method?.toUpperCase(),
        url: config?.url,
        status: error.response?.status,
        code: error.code,
        duration_ms,
        error: error.message,
      })
      return Promise.reject(error)
    },
  )
}

// Allow passing a custom explored address via a cookie for testing purposes.
async function getExploredAddressCookie() {
  const cookieStore = await cookies()
  const customExploredAddress = cookieStore.get(
    exploredCustomApiCookieName,
  )?.value
  return customExploredAddress
}

// The public explored address. This is passed through to the browser, so it
// must always be the publicly reachable address.
export async function getExploredAddress() {
  if (process.env.NODE_ENV === 'development') {
    return (await getExploredAddressCookie()) || exploredApi
  }
  return exploredApi
}

// The address server-side requests should use. This prefers the internal
// address when one is configured, so requests do not route back out over the
// public internet. Never pass the result to a client component.
export async function getExploredInternalAddress() {
  if (process.env.NODE_ENV === 'development') {
    return (await getExploredAddressCookie()) || exploredInternalApi
  }
  return exploredInternalApi
}

export async function getExplored(
  explicitAddress?: string,
  traceId?: string,
) {
  let explored
  if (explicitAddress) {
    explored = Explored({ api: explicitAddress, timeout: exploredTimeout })
  } else {
    const exploredAddress = await getExploredInternalAddress()
    explored = Explored({ api: exploredAddress, timeout: exploredTimeout })
  }
  addLoggingInterceptors(explored.axios, traceId ?? generateTraceId())
  return explored
}
