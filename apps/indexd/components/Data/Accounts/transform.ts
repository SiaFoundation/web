import { AccountData } from './types'
import { PublicKey } from '@siafoundation/types'

export function transformAccount(account: PublicKey): AccountData {
  const datum: AccountData = {
    id: account,
    publicKey: account,
  }
  return datum
}
