import { WalletAddress } from '@siafoundation/react-walletd'

export const seed =
  'ridge business wish transfer home glove office salt wealth baby journey diary'

export const newWallet = {
  id: '100',
  name: 'test send wallet',
  description: 'wallet description',
  dateCreated: new Date().toISOString(),
  lastUpdated: new Date().toISOString(),
  metadata: {
    type: 'seed',
    mnemonicHash:
      '251cc9d01333287e9c9f39fc4749095a28a3970348a6106244848d2c414a908bc81ae4982911435a045a407fb305b69e51d05ce6f9b47ef1750c1e74ca299a48',
  },
}

export const mockWalletAddressesResponse: WalletAddress[] = []
