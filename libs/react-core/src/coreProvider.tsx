'use client'

import { Cache, SWRConfig as BaseSWRConfig } from 'swr'
import { WorkflowsProvider } from './workflows'

type Props = {
  fallback?: Record<string, unknown>
  cacheProvider?: (cache: Cache) => Cache
  children: React.ReactNode
}

/**
 * The core provider includes the workflows provider and the swr config provider.
 */
export function CoreProvider({ fallback, cacheProvider, children }: Props) {
  return (
    <WorkflowsProvider>
      <BaseSWRConfig
        value={{
          fallback: fallback || {},
          provider: cacheProvider,
        }}
      >
        {children}
      </BaseSWRConfig>
    </WorkflowsProvider>
  )
}
