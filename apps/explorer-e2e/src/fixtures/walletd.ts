import { Walletd } from '@siafoundation/walletd-js'
import { blake2bHex } from 'blakejs'
import { WalletAddressMetadata } from '@siafoundation/walletd-types'
import { to } from '@siafoundation/request'
import {
  mine,
  waitUntilRenterdWalletBalanceIsSpendable,
} from '@siafoundation/clusterd'
import { humanSiacoin } from '@siafoundation/units'
import { Cluster } from './cluster'
import { initSDK, getSDK } from '@siafoundation/sdk'

export async function addWalletToWalletd(walletd: ReturnType<typeof Walletd>) {
  await initSDK()
  const sdk = getSDK()
  const { phrase: mnemonic } = sdk.wallet.generateSeedPhrase()
  const mnemonicHash = blake2bHex(mnemonic)
  const [wallet, walletError] = await to(
    walletd.walletAdd({
      data: {
        name: 'test',
        description: 'test',
        metadata: {
          type: 'seed',
          mnemonicHash,
        },
      },
    })
  )
  if (!wallet || walletError) {
    throw new Error(`Failed to add wallet: ${walletError}`)
  }
  const kp = sdk.wallet.keyPairFromSeedPhrase(mnemonic, 0)
  const suh = sdk.wallet.standardUnlockHash(kp.publicKey)
  const uc = sdk.wallet.standardUnlockConditions(kp.publicKey)
  const metadata: WalletAddressMetadata = {
    index: 0,
  }
  const [, addressError] = await to(
    walletd.walletAddressAdd({
      params: {
        id: wallet.id,
      },
      data: {
        address: suh.address,
        description: '',
        spendPolicy: {
          type: 'uc',
          policy: uc.unlockConditions,
        },
        metadata,
      },
    })
  )
  if (addressError) {
    throw new Error(`Failed to add address: ${addressError}`)
  }
  return { wallet, address: suh.address }
}

// renterd cluster nodes have siacoins we can use to fund other wallets.
export async function sendSiacoinFromRenterd(
  renterd: Cluster['daemons']['renterds'][number],
  address: string,
  amount: string
) {
  console.log(`Sending ${humanSiacoin(amount)} from renterd to:`, address)
  try {
    // For some reason the balance never becomes spendable unless we first mine
    // a block. It does not matter what maturity delay we use.
    await mine(1)
    await waitUntilRenterdWalletBalanceIsSpendable(renterd.api)
    // Send some funds to the wallet.
    await renterd.api.walletSend({
      data: {
        address,
        amount,
        subtractMinerFee: false,
      },
    })
    await mine(1)
  } catch (e) {
    console.log('error sending siacoin', e)
  }
}
