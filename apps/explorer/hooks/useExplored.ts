'use client'

import { Explored } from '@siafoundation/explored-js'
import { useMemo } from 'react'
import { useExploredAddress } from './useExploredAddress'

export function useExplored(): ReturnType<typeof Explored> {
  const api = useExploredAddress()
  const explored = useMemo(() => Explored({ api }), [api])
  return explored
}
