type WalletType = 'hot' | 'cold' | 'hw'

type Wallet = {
  id: string
  name: string
  sc: string
  sf?: string
  type: WalletType
}

export const fakeWallets: Wallet[] = [
  {
    id: '0f95',
    name: '0f95',
    sc: '15 KS',
    sf: '1 SF',
    type: 'hot',
  },
  {
    id: '034m',
    name: '034m',
    sc: '353 MS',
    sf: '14 SF',
    type: 'hw',
  },
  {
    id: '0bc1',
    name: '0bc1',
    sc: '353 SC',
    type: 'cold',
  },
]
