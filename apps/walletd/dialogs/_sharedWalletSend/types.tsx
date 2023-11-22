import BigNumber from 'bignumber.js'

export type SendStep = 'compose' | 'send' | 'done'

export type SendParams = {
  address: string
  mode: 'siacoin' | 'siafund'
  siafund: number
  siacoin: BigNumber
  fee: BigNumber
}

export const emptySendParams: SendParams = {
  address: '',
  mode: 'siacoin',
  siacoin: new BigNumber(0),
  siafund: 0,
  fee: new BigNumber(0),
}
