import { ConnectKey } from '@siafoundation/indexd-types'
import { KeyData } from './types'
import { humanBytes } from '@siafoundation/units'

export function transformKey(key: ConnectKey): KeyData {
  const datum: KeyData = {
    id: key.key,
    key: key.key,
    description: key.description,
    maxPinnedData: key.maxPinnedData,
    totalUses: key.totalUses,
    remainingUses: key.remainingUses,
    dateCreated: key.dateCreated,
    lastUpdated: key.lastUpdated,
    lastUsed: key.lastUsed,
    displayFields: {
      maxPinnedData: humanBytes(key.maxPinnedData),
      dateCreated: Intl.DateTimeFormat('en-US', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date(key.dateCreated)),
      lastUpdated: Intl.DateTimeFormat('en-US', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date(key.lastUpdated)),
      lastUsed: key.lastUsed
        ? Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
          }).format(new Date(key.lastUsed))
        : undefined,
    },
  }
  return datum
}
