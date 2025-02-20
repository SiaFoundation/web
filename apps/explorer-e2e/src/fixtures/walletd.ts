import { Walletd } from '@siafoundation/walletd-js'
import { blake2bHex } from 'blakejs'
import { WalletAddressMetadata } from '@siafoundation/walletd-types'
import { to } from '@siafoundation/request'
import { clusterd, mine } from '@siafoundation/clusterd'
import { Bus } from '@siafoundation/renterd-js'
import { humanSiacoin } from '@siafoundation/units'

export async function addWalletToWalletd(walletd: ReturnType<typeof Walletd>) {
  // For some reason when this code runs on GitHub Actions it throws an ESM
  // import error for the SDK. Running locally it works fine.
  // Error: require() of ES Module sdk/index.esm.js from /fixtures/walletd.ts not supported.
  // This dynamic import is a workaround.
  const { initSDK, getSDK } = await import('@siafoundation/sdk')
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

// The renterd node receives all the initial funds so we can use it to fund
// other wallets.
export async function sendSiacoinFromRenterd(address: string, amount: string) {
  console.log(`Sending ${humanSiacoin(amount)} from renterd to:`, address)
  const renterdNode = clusterd.nodes.find((n) => n.type === 'renterd')
  if (!renterdNode) {
    throw new Error('Renterd node not found')
  }
  const bus = Bus({
    api: renterdNode.apiAddress + '/api',
    password: renterdNode.password,
  })

  try {
    // Send some funds to the wallet.
    await bus.walletSend({
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

export async function getRenterdAddress() {
  const renterdNode = clusterd.nodes.find((n) => n.type === 'renterd')
  if (!renterdNode) {
    throw new Error('Renterd node not found')
  }
  return renterdNode.walletAddress
}
