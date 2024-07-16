'use client'

import { SWRConfig as BaseSWRConfig, type Cache } from 'swr'
import { WorkflowsProvider } from './workflows'

type Props = {
  fallback?: Record<string, unknown>
  cacheProvider?: (cache: Cache) => Cache
  children: React.ReactNode
}

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
