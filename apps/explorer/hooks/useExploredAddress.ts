'use client'

import useSWR from 'swr'
import { exploredCustomApiSwrKey } from '../config/explored'

export function useExploredAddress(): string {
  const response = useSWR(exploredCustomApiSwrKey)
  return `${response.data}/api`
}
