import { Account } from '@siafoundation/indexd-types'
import { AccountData } from './types'
import { humanBytes } from '@siafoundation/units'

export function transformAccount(account: Account): AccountData {
  const datum: AccountData = {
    id: account.accountKey,
    publicKey: account.accountKey,
    serviceAccount: account.serviceAccount,
    maxPinnedData: account.maxPinnedData,
    displayFields: {
      maxPinnedData: humanBytes(account.maxPinnedData),
    },
  }
  return datum
}
