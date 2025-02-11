import BigNumber from 'bignumber.js'

export type SendStep = 'compose' | 'send' | 'done'

export type SendParamsV1 = {
  mode: 'siacoin' | 'siafund'
  receiveAddress: string
  changeAddress: string
  claimAddress: string
  siafund: number
  siacoin: BigNumber
  fee: BigNumber
}

export const emptySendParamsV1: SendParamsV1 = {
  mode: 'siacoin',
  receiveAddress: '',
  changeAddress: '',
  claimAddress: '',
  siacoin: new BigNumber(0),
  siafund: 0,
  fee: new BigNumber(0),
}
