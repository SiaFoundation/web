import { truncate } from '@siafoundation/design-system'

export type AccountFilterConnectKey = {
  id: 'connectkey'
  value: string
}

export type AccountFilter = AccountFilterConnectKey
export type AccountFilters = AccountFilter[]

export function getFilterLabel(filter: AccountFilter): string {
  if (filter.id === 'connectkey') {
    return `Connect key is ${truncate(filter.value, 10)}`
  }
  return ''
}

export type AccountData = {
  id: string
  publicKey: string
  description: string
  serviceAccount: boolean
  maxPinnedData: number
  pinnedData: number
  lastUsed: string
  logoURL: string
  serviceURL: string
  displayFields: {
    maxPinnedData: string
    pinnedData: string
    lastUsed?: string
  }
}
