import {
  type WalletMetadata,
  type WalletAddress,
} from '@siafoundation/walletd-types'
import { Walletd } from '@siafoundation/walletd-js'
import { to } from '@siafoundation/request'
import { ClusterNodeWalletd } from '@siafoundation/clusterd'

export async function createLedgerWalletWithApi({
  walletdNode,
  name,
  address0,
  publicKey0,
}: {
  walletdNode: ClusterNodeWalletd
  name: string
  address0: string
  publicKey0: string
}) {
  const walletd = Walletd({
    api: walletdNode.apiAddress + '/api',
    password: walletdNode.password,
  })

  // Create the wallet.
  const metadata: WalletMetadata = {
    type: 'ledger',
    address0,
    publicKey0,
  }
  const [wallet, walletError] = await to(
    walletd.walletAdd({
      data: {
        name,
        description: '',
        metadata,
      },
    })
  )
  if (walletError) {
    throw new Error(`Failed to create wallet: ${walletError}`)
  }

  // Add the address.
  const addressData: WalletAddress = {
    address: address0,
    description: '',
    spendPolicy: {
      type: 'uc',
      policy: {
        timelock: 0,
        publicKeys: [publicKey0],
        signaturesRequired: 1,
      },
    },
    metadata: {
      index: 0,
    },
  }
  const [address, addressError] = await to(
    walletd.walletAddressAdd({
      params: {
        id: wallet.id,
      },
      data: addressData,
    })
  )
  if (addressError) {
    throw new Error(`Failed to add address: ${addressError}`)
  }

  return { wallet, address }
}
