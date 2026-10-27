import { Account } from '@siafoundation/indexd-types'
import { AccountData } from './types'
import { humanBytes } from '@siafoundation/units'

export function transformAccount(account: Account): AccountData {
  const datum: AccountData = {
    id: account.accountKey,
    publicKey: account.accountKey,
    name: account.app.name,
    description: account.app.description,
    maxPinnedData: account.maxPinnedData,
    pinnedData: account.pinnedData,
    lastUsed: account.lastUsed,
    logoURL: account.app.logoURL,
    serviceURL: account.app.serviceURL,
    displayFields: {
      maxPinnedData: humanBytes(account.maxPinnedData),
      pinnedData: humanBytes(account.pinnedData),
      lastUsed: account.lastUsed
        ? Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
          }).format(new Date(account.lastUsed))
        : undefined,
    },
  }
  return datum
}
