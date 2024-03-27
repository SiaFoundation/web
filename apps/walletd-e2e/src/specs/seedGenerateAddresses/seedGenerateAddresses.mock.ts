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
    seedHash:
      'd4ad57da37936a053b0587fcc4964e9de89da8fbd610f7de190c32e22e6acd2a1c8f9f88bf219ffac04801b709712f3a2e64cc4f0271c402a6c4659573024440',
  },
}

export const mockWalletAddressesResponse: WalletAddress[] = [
  {
    address:
      'addr:f2dbf56b5b0c698d7fbf43f646c76169d84e597e8b37fada97348beeecaa812d400ac4ce7981',
    description: '',
    metadata: {
      index: 0,
      publicKey:
        'ed25519:ee122b2169bdae5776b55609e384e0c58372cd5c529d4edc9b9918b26f8e5535',
    },
  },
  {
    address:
      'addr:90c6057cdd2463eca61f83796e83152dbba28b6cb9a74831a043833051ec9f422726bfff2ee8',
    description: '',
    metadata: {
      index: 1,
      publicKey:
        'ed25519:624d6d477a8f4ceac873e6dd9138740f9322cb34a24246f96f9d64c021172f43',
    },
  },
  {
    address:
      'addr:170173c40ca0f39f9618da30af14c390c7ce70248a3662a7a5d3d5a8a31c9fbfa2071e9f6518',
    description: '',
    metadata: {
      index: 2,
      publicKey:
        'ed25519:65cac661a4acf36847c0aa67cbc6956e3449fd82a7430cfd673ea7fedbfcf5fa',
    },
  },
]
