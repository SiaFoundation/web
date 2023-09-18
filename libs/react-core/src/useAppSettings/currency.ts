export type CurrencyId =
  | 'usd'
  | 'cad'
  | 'eur'
  | 'gbp'
  | 'jpy'
  | 'aud'
  | 'cny'
  | 'rub'
  | 'btc'
  | 'eth'

export type CurrencyOption = {
  id: CurrencyId
  label: string
  prefix: string
  fixed: number
}

export const currencyOptions: CurrencyOption[] = [
  {
    id: 'usd',
    label: 'USD',
    prefix: '$',
    fixed: 2,
  },
  {
    id: 'cad',
    label: 'CAD',
    prefix: '$',
    fixed: 2,
  },
  {
    id: 'eur',
    label: 'EUR',
    prefix: '€',
    fixed: 2,
  },
  {
    id: 'gbp',
    label: 'GBP',
    prefix: '£',
    fixed: 2,
  },
  {
    id: 'jpy',
    label: 'JPY',
    prefix: '¥',
    fixed: 2,
  },
  {
    id: 'aud',
    label: 'AUD',
    prefix: '$',
    fixed: 2,
  },
  {
    id: 'rub',
    label: 'RUB',
    prefix: '₽',
    fixed: 2,
  },
  {
    id: 'cny',
    label: 'CNY',
    prefix: '¥',
    fixed: 2,
  },
  {
    id: 'btc',
    label: 'BTC',
    prefix: '₿',
    fixed: 6,
  },
  {
    id: 'eth',
    label: 'ETH',
    prefix: 'Ξ',
    fixed: 6,
  },
]
