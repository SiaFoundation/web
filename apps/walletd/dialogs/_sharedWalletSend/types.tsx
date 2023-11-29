import BigNumber from 'bignumber.js'

export type SendStep = 'compose' | 'send' | 'done'

export type SendParams = {
  receiveAddress: string
  changeAddress: string
  claimAddress: string
  mode: 'siacoin' | 'siafund'
  siafund: number
  siacoin: BigNumber
  fee: BigNumber
}

export const emptySendParams: SendParams = {
  receiveAddress: '',
  changeAddress: '',
  claimAddress: '',
  mode: 'siacoin',
  siacoin: new BigNumber(0),
  siafund: 0,
  fee: new BigNumber(0),
}
