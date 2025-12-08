'use client'

import { Explored } from '@siafoundation/explored-js'
import { createContext, useContext, useMemo } from 'react'

/**
 * This context provides the API address and the explored SDK instance.
 */

type State = {
  api: string
  explored: ReturnType<typeof Explored>
}

const ApiContext = createContext<State>({} as State)

export function ApiProvider({
  children,
  exploredAddress,
}: {
  children: React.ReactNode
  exploredAddress: string
}) {
  const api = exploredAddress
  const explored = useMemo(() => Explored({ api }), [api])
  return (
    <ApiContext.Provider value={{ api, explored }}>
      {children}
    </ApiContext.Provider>
  )
}

export function useApi(): State {
  const context = useContext(ApiContext)
  if (context === undefined) {
    throw new Error('useApi must be used within ApiProvider')
  }
  return context
}
